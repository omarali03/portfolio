console.log("project.js is loaded and running!");
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
import { fetchJSON, renderProjects, getProjects, setProjects } from "../global.js"; // Ensure setProjects is imported

// Fetch project data and set it globally
fetchJSON("../lib/projects.json")
    .then(data => {
        setProjects(data);
        renderProjects(document.querySelector(".projects"), "h2");
        drawPieChart(); // Call pie chart after data loads
    })
    .catch(console.error);

// Function to generate pie chart dynamically from project data
async function drawPieChart() {
    console.log("Drawing pie chart...");
    
    const projects = getProjects();

    if (!projects || projects.length === 0) {
        console.warn("No project data available for the pie chart.");
        return;
    }

    // Group projects by year and count them
    let rolledData = d3.rollups(
        projects,
        (v) => v.length, // Count occurrences
        (d) => d.year // Group by year
    );

    // Convert to correct format for pie chart
    let data = rolledData.map(([year, count]) => ({
        value: count,
        label: year
    }));

    console.log("Pie Chart Data:", data);

    const svg = d3.select("#projects-plot");
    svg.selectAll("*").remove(); // Clear previous chart before rendering new one

    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    let sliceGenerator = d3.pie().value(d => d.value);
    let arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(90) // Adjusted for better visibility
        .padAngle(0.02) // Adds space between slices
        .cornerRadius(5); // Rounded edges

    let arcData = sliceGenerator(data);

    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("transform", "translate(100,100)"); // Adjust position

    // Clear old legend items before appending new ones
    let legend = d3.select(".legend");
    legend.selectAll("*").remove();

    // Generate legend dynamically
    legend.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .attr("class", "legend-item")
        .html(d => `<span class="swatch" style="background-color:${colorScale(d.label)};"></span> ${d.label} <em>(${d.value})</em>`);
}

// Ensure projects render on page load
document.addEventListener("DOMContentLoaded", async function () {
  console.log("Loading projects...");

  try {
    const projectsData = await fetchJSON("../lib/projects.json");
    const container = document.querySelector(".projects");
    renderProjects(container, "h2");
  } catch (error) {
    console.error("Error loading projects:", error);
  }
});
