console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from '../global.js';

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

document.addEventListener("DOMContentLoaded", function () {
    console.log("D3 Pie Chart script is running!");

    const svg = d3.select("#projects-plot");

    // Define pie chart data (33% and 66% slices)
    let data = [1, 2];

    // Calculate total sum of the data
    let total = data.reduce((sum, d) => sum + d, 0);

    // Define arc generator
    let arcGenerator = d3.arc()
        .innerRadius(0)  
        .outerRadius(50);

    // Compute start and end angles
    let angle = 0;
    let arcData = [];

    for (let d of data) {
        let endAngle = angle + (d / total) * 2 * Math.PI;
        arcData.push({ startAngle: angle, endAngle });
        angle = endAngle;
    }

    // Generate paths and append them to the SVG
    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => i === 0 ? "blue" : "orange");
});



async function loadProjects() {
    try {
        const projects = await fetchJSON('../lib/projects.json'); // Corrected path
        const projectsContainer = document.querySelector('.projects');

        if (!projectsContainer) {
            console.error("Error: .projects container not found!");
            return;
        }

        renderProjects(projects, projectsContainer, 'h2');

        const projectsTitle = document.querySelector(".projects-title");
        if (projectsTitle) {
            projectsTitle.textContent = `${projects.length} Projects`;
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Call the function to load projects on page load
loadProjects();



