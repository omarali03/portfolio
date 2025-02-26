console.log("project.js is loaded and running!");
import { fetchJSON, renderProjects, getProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

async function loadProjects() {
    console.log("📢 Loading projects...");
    try {
        const projectsData = await fetchJSON("../lib/projects.json");

        if (!Array.isArray(projectsData)) {
            throw new Error("❌ projectsData is not an array!");
        }

        const container = document.querySelector(".projects");
        renderProjects(container, projectsData, "h2");
    } catch (error) {
        console.error("❌ Error loading projects:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadProjects();

    console.log("📊 Drawing pie chart...");
    const projects = getProjects();

    if (!projects || projects.length === 0) {
        console.warn("⚠️ No projects available for pie chart.");
        return;
    }

    let rolledData = d3.rollups(
        projects,
        (v) => v.length,
        (d) => d.year
    );

    let data = rolledData.map(([year, count]) => ({ value: count, label: year }));

    console.log("📊 Pie Chart Data:", data);

    const svg = d3.select("#projects-plot");
    let colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(80)
        .padAngle(0.02)
        .cornerRadius(5);

    let arcData = sliceGenerator(data);

    svg.selectAll("path")
        .data(arcData)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d, i) => colorScale(i))
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("transform", "translate(0, 0)");

    let legend = d3.select(".legend");
    legend.selectAll("*").remove();

    legend.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .attr("class", "legend-item")
        .html((d) => `<span class="swatch" style="background-color:${colorScale(d.label)};"></span> ${d.label} <em>(${d.value})</em>`);
});

let query = ""; // Stores search input

function filterProjects() {
    const searchInput = document.querySelector(".searchBar");
    if (!searchInput) return;

    query = searchInput.value.toLowerCase(); // Get lowercase search input
    console.log("🔍 Searching for:", query);

    const allProjects = getProjects();
    const filteredProjects = allProjects.filter(project =>
        project.title.toLowerCase().includes(query)
    );

    console.log("✅ Filtered Projects:", filteredProjects);

    // Re-render filtered projects
    renderProjects(document.querySelector(".projects"), filteredProjects, "h2");
}

document.addEventListener("DOMContentLoaded", async function () {
    await loadProjects(); // Load projects first

    const searchInput = document.querySelector(".searchBar");
    if (searchInput) {
        searchInput.addEventListener("input", filterProjects); // Listen to input changes
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Loading projects...");
  
    try {
      const projectsData = await fetchJSON("../lib/projects.json");
      const container = document.querySelector(".projects");
  
      // Initial rendering
      renderProjects(container, projectsData);
  
      // Setup search functionality
      const searchInput = document.querySelector(".searchBar");
  
      if (searchInput) {
        searchInput.addEventListener("input", (event) => {
          const query = event.target.value;
          renderProjects(container, projectsData, query);
        });
      }
  
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  });