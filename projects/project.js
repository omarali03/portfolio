console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from '../global.js';

document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("#projects-plot");

    svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .attr("fill", "blue"); // Change color for visibility
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



