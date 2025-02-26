console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects, loadProjects } from '../global.js'; 
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM fully loaded and parsed!");

    // Select SVG for pie chart
    const svg = d3.select("#projects-plot");
    let data = [1, 2, 3, 4, 5, 5];
    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);
    
    let sliceGenerator = d3.pie().value(d => d);
    let arcData = sliceGenerator(data);
    
    let arcGenerator = d3.arc()
        .innerRadius(0)  
        .outerRadius(50);
    
    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i)); 

    // Load projects
    try {
        const projectsContainer = document.querySelector(".projects");

        if (!projectsContainer) {
            console.error("Error: .projects container not found!");
            return;
        }

        const projects = await fetchJSON("../lib/projects.json");
        renderProjects(projects, projectsContainer, "h2");

        const projectsTitle = document.querySelector(".projects-title");
        if (projectsTitle) {
            projectsTitle.textContent = `${projects.length} Projects`;
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
});





