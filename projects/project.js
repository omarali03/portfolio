import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function loadProjects() {
    try {
        const projects = await fetchJSON('../lib/projects.json'); // Fetch project data
        const projectsContainer = document.querySelector('.projects'); // Select container
        renderProjects(projects, projectsContainer, 'h2'); // Render projects in the container

        const projectsTitle = document.querySelector(".projects-title");
        if (projectsTitle) {
            projectsTitle.textContent = `${projects.length} Projects`;
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function createPieChart() {
    const svg = d3.select("#projects-pie-plot")
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100)"); // Centering

    svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .attr("fill", "red");
}

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();   // Load projects dynamically
    createPieChart(); // Create the pie chart
});

