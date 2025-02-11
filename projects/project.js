console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function loadProjects() {
    try {
        const projects = await fetchJSON('/portfolio/lib/projects.json'); // Adjust fetch path if needed
        const projectsContainer = document.querySelector('.projects');
        renderProjects(projects, projectsContainer, 'h2');

        const projectsTitle = document.querySelector(".projects-title");
        if (projectsTitle) {
            projectsTitle.textContent = `${projects.length} Projects`;
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}


function createPieChart() {
    const svg = d3.select("#projects-plot");

    if (!svg.node()) {
        console.error("SVG element with id 'projects-plot' not found.");
        return;
    }

    // Create an arc generator
    let arcGenerator = d3.arc()
        .innerRadius(0)  // Full pie (not a donut)
        .outerRadius(50); // Radius of the pie chart

    // Generate the path for a full circle (2π radians)
    let arc = arcGenerator({
        startAngle: 0,
        endAngle: 2 * Math.PI,
    });

    // Append the generated arc to the SVG
    svg.append("path")
        .attr("d", arc)
        .attr("fill", "red");
}

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();   // Load projects dynamically
    createPieChart(); // Draw the pie chart using D3
});

