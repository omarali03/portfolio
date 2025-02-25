console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("#projects-plot");

    // Define an arc generator
    let arcGenerator = d3.arc()
        .innerRadius(0)  // Full pie, no hole
        .outerRadius(50); // Radius of 50

    // Generate the path for a full circle
    let arcPath = arcGenerator({
        startAngle: 0,
        endAngle: 2 * Math.PI // Full circle (2π radians)
    });

    // Append path to the SVG
    svg.append("path")
        .attr("d", arcPath)
        .attr("fill", "red");
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



