console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from '../global.js';

document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("#projects-plot");

    const arc = d3.arc()
        .innerRadius(0)  // Full pie, no inner hole
        .outerRadius(50) // Radius of 50
        .startAngle(0)   // Start at 0 radians
        .endAngle(Math.PI * 2); // Full circle (2π radians)

    svg.append("path")
        .attr("d", arc)
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



