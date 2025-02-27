console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects, getProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Load and render projects
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Loading projects...");

    try {
        const projectsData = await fetchJSON("../lib/projects.json");
        const container = document.querySelector(".projects");

        if (projectsData && Array.isArray(projectsData)) {
            renderProjects(projectsData, container, "h2");
            renderPieChart(projectsData); // Initial pie chart
        } else {
            console.error("Error: projectsData is not an array.");
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
});

// Function to render the Pie Chart
function renderPieChart(projectsGiven) {
    console.log("Rendering Pie Chart...");

    const svg = d3.select("#projects-plot");
    
    // Clear old chart before rendering a new one
    svg.selectAll("*").remove();
    let legend = d3.select(".legend");
    legend.selectAll("*").remove();

    // Re-calculate rolled data
    let rolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year
    );

    let data = rolledData.map(([year, count]) => ({
        value: count,
        label: year
    }));

    console.log("Pie Chart Data:", data);

    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(80)
        .padAngle(0.02)
        .cornerRadius(5);

    let arcData = sliceGenerator(data);

    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("transform", "translate(0, 0)");

    // Generate legend dynamically
    legend.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .attr("class", "legend-item")
        .html(d => `<span class="swatch" style="background-color:${colorScale(d.label)};"></span> ${d.label} <em>(${d.value})</em>`);
}

// Search functionality with reactive pie chart
let query = '';
let searchInput = document.querySelector('.searchBar');
let projectsContainer = document.querySelector(".projects");

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        query = event.target.value.toLowerCase();
        let filteredProjects = getProjects().filter((project) => {
            let values = Object.values(project).join('\n').toLowerCase();
            return values.includes(query);
        });

        renderProjects(filteredProjects, projectsContainer, 'h2');
        renderPieChart(filteredProjects); // Re-render pie chart dynamically
    });
}
