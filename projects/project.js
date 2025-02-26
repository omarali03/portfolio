console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

fetchJSON("../lib/projects.json")
    .then(data => {
        setProjects(data);
        renderProjects(getProjects(), document.querySelector(".projects"), "h2");
    })
    .catch(console.error);

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

    const svg = d3.select("#projects-plot");

    let data = [
        { value: 1, label: "apples" },
        { value: 2, label: "oranges" },
        { value: 3, label: "mangos" },
        { value: 4, label: "pears" },
        { value: 5, label: "limes" },
        { value: 5, label: "cherries" }
    ];

    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    let sliceGenerator = d3.pie().value(d => d.value);
    let arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(80) // Adjust for better fit
        .padAngle(0.02)  // Adds space between slices
        .cornerRadius(5); // Rounded edges

    let arcData = sliceGenerator(data);

    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("stroke", "white") // Ensure stroke is visible
        .attr("stroke-width", 2) 
        .attr("transform", "translate(0, 0)"); // Centered now

    // Clear old legend items before appending new ones
    let legend = d3.select(".legend");
    legend.selectAll("*").remove();

    // Generate legend dynamically
    legend.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .attr("class", "legend-item")
        .html(d => `<span class="swatch" style="background-color:${colorScale(d.label)};"></span> ${d.label} <em>(${d.value})</em>`);
});
