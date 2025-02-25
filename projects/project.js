console.log("project.js is loaded and running!");

import { fetchJSON, renderProjects } from '../global.js';

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

document.addEventListener("DOMContentLoaded", function () {
    const svg = d3.select("#projects-plot");

    let data = [
        { value: 1, label: 'Apples' },
        { value: 2, label: 'Oranges' },
        { value: 3, label: 'Mangos' },
        { value: 4, label: 'Pears' },
        { value: 5, label: 'Limes' },
        { value: 5, label: 'Cherries' }
    ];

    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    // Create pie slices
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcData = sliceGenerator(data);

    // Define arc generator
    let arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(50);

    // Append pie slices
    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i));

    // ** Add Labels to Each Slice **
    svg.selectAll("text")
        .data(arcData)
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text(d => d.data.label);

    // ** Generate Legend **
    let legend = d3.select('.legend');
    data.forEach((d, idx) => {
        legend.append('li')
            .attr("style", `--color:${colorScale(idx)}`)
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });
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

loadProjects();




