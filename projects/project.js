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


