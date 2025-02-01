import { fetchJSON, renderProjects } from './global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');
import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
    try {
        const projects = await fetchJSON('../lib/projects.json'); // Fetch project data
        const projectsContainer = document.querySelector('.projects'); // Select container
        renderProjects(projects, projectsContainer, 'h2'); // Render projects in the container
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Call the function to load projects when the page loads
loadProjects();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const projectsContainer = document.querySelector(".projects");
        const projectsTitle = document.querySelector(".projects-title");

        // Fetch the project data
        const projects = await fetchJSON("../lib/projects.json");

        // Update the title with the project count
        projectsTitle.textContent = `${projects.length} Projects`;

    } catch (error) {
        console.error("Error updating project count:", error);
    }
});
