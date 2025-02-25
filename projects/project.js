console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from '../global.js';

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("#projects-plot");

    let data = [1, 2, 3, 4, 5, 5];

    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    let sliceGenerator = d3.pie();
    let arcData = sliceGenerator(data);

    let arcGenerator = d3.arc()
        .innerRadius(0)  
        .outerRadius(50);

    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i)); // Assign a unique color to each slice
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



