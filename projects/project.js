console.log("project.js is loaded and running!");

import { fetchJSON, renderProjects, getProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Load and render projects when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Loading projects...");

    try {
        const projectsData = await fetchJSON("../lib/projects.json");
        const container = document.querySelector(".projects");

        if (projectsData && Array.isArray(projectsData)) {
            renderProjects(projectsData, container, "h2");
            drawPieChart(); // Ensure the pie chart updates after data is loaded
        } else {
            console.error("Error: projectsData is not an array.");
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
});

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
    let query = '';
    const searchInput = document.querySelector('.searchBar');
    const projectsContainer = document.querySelector(".projects");

    if (searchInput && projectsContainer) {
        searchInput.addEventListener('input', (event) => {
            query = event.target.value.toLowerCase();
            let filteredProjects = getProjects().filter((project) => {
                let values = Object.values(project).join('\n').toLowerCase();
                return values.includes(query);
            });

            renderProjects(filteredProjects, projectsContainer, 'h2');
            drawPieChart(filteredProjects); // Update pie chart based on filtered data
        });
    } else {
        console.warn("Search bar or project container not found.");
    }
});

// Function to draw Pie Chart
function drawPieChart(filteredData = null) {
    console.log("Drawing pie chart...");

    const svg = d3.select("#projects-plot");
    svg.selectAll("*").remove(); // Clear existing chart

    const projectData = filteredData || getProjects(); // Use filtered data if provided

    if (!projectData || projectData.length === 0) {
        console.warn("No projects available for pie chart.");
        return;
    }

    let rolledData = d3.rollups(
        projectData,
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
