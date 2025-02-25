console.log("project.js is loaded and running!");

import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

document.addEventListener("DOMContentLoaded", function () {
    // Select the SVG element for the pie chart
    const svg = d3.select("#projects-plot");

    // Define the data with labels
    let data = [
        { value: 1, label: "apples" },
        { value: 2, label: "oranges" },
        { value: 3, label: "mangos" },
        { value: 4, label: "pears" },
        { value: 5, label: "limes" },
        { value: 5, label: "cherries" }
    ];

    // Define color scale
    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    // Generate pie slices
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);

    // Define arc generator
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    // Append paths for pie chart
    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("transform", "translate(50,50)"); // Centering the pie chart

    let legend = d3.select(".legend");

    data.forEach((d, i) => {
        legend.append("li")
            .attr("style", `--color:${colorScale(i)}`)
            .html(`<span class="swatch" style="background-color:${colorScale(i)}"></span> ${d.label} <em>(${d.value})</em>`);
});

});

// Function to load and render projects
async function loadProjects() {
    try {
        const projects = await fetchJSON("../lib/projects.json"); // Corrected path
        const projectsContainer = document.querySelector(".projects");

        if (!projectsContainer) {
            console.error("Error: .projects container not found!");
            return;
        }

        renderProjects(projects, projectsContainer, "h2");

        const projectsTitle = document.querySelector(".projects-title");
        if (projectsTitle) {
            projectsTitle.textContent = `${projects.length} Projects`;
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Call the function to load projects on page load
loadProjects();





