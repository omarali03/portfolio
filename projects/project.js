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
    const svg = d3.select("#projects-pie-plot")
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100)"); // Center SVG

    // Pie chart data (e.g., two slices)
    let data = [1, 2]; // 33% and 66% slices
    let total = data.reduce((acc, d) => acc + d, 0);

    let arcGenerator = d3.arc()
        .innerRadius(0) // Full pie (not a donut)
        .outerRadius(50); // Radius of 50

    let arcData = [];
    let angle = 0;

    // Compute start and end angles
    for (let d of data) {
        let endAngle = angle + (d / total) * 2 * Math.PI;
        arcData.push({ startAngle: angle, endAngle });
        angle = endAngle;
    }

    // Assign different colors for each slice
    let colors = ['gold', 'purple'];

    // Draw slices
    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colors[i]); // Assign colors dynamically
}

// Ensure everything loads when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadProjects();   // Load projects dynamically
    createPieChart(); // Create the pie chart
});

