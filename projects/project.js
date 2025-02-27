console.log("project.js is loaded and running!");

import { fetchJSON, renderProjects, getProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

let projects = [];
let selectedYear = null;  // Stores the currently selected year

// Load and render projects
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Loading projects...");

    try {
        projects = await fetchJSON("../lib/projects.json");
        const container = document.querySelector(".projects");

        if (projects && Array.isArray(projects)) {
            renderProjects(projects, container, "h2");
            renderPieChart(projects);
        } else {
            console.error("Error: projectsData is not an array.");
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
});

// Search functionality
let query = '';
const searchInput = document.querySelector('.searchBar');
const projectsContainer = document.querySelector(".projects");

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        query = event.target.value.toLowerCase();
        let filteredProjects = projects.filter((project) => {
            let values = Object.values(project).join('\n').toLowerCase();
            return values.includes(query);
        });

        renderProjects(filteredProjects, projectsContainer, 'h2');
        renderPieChart(filteredProjects);  // Update chart with filtered projects
    });
}

// Function to render Pie Chart
function renderPieChart(projectsData) {
    console.log("Drawing pie chart...");

    const svg = d3.select("#projects-plot");
    svg.selectAll("*").remove(); // Clear previous chart

    let rolledData = d3.rollups(
        projectsData,
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

    // Render Pie Chart Wedges
    let slices = svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("transform", "translate(0, 0)")
        .attr("class", "clickable")
        .on("click", (event, d) => {
            handleYearFilter(d.data.label);
        });

    // Clear old legend items before appending new ones
    let legend = d3.select(".legend");
    legend.selectAll("*").remove();

    // Generate Legend
    legend.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .attr("class", "legend-item")
        .html(d => `<span class="swatch" style="background-color:${colorScale(d.label)};"></span> ${d.label} <em>(${d.value})</em>`)
        .on("click", (event, d) => {
            handleYearFilter(d.label);
        });
}

// Function to filter projects by year when clicking a wedge or legend
function handleYearFilter(year) {
    if (selectedYear === year) {
        selectedYear = null;  // Reset filter if already selected
        renderProjects(projects, projectsContainer, "h2");
        renderPieChart(projects);
    } else {
        selectedYear = year;
        let filteredProjects = projects.filter(project => project.year === year);
        renderProjects(filteredProjects, projectsContainer, "h2");
        renderPieChart(filteredProjects);
    }
}
