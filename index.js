import { fetchJSON, renderProjects } from './global.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch all projects from projects.json
        const projects = await fetchJSON('./lib/projects.json');

        // Get only the first 3 projects
        const latestProjects = projects.slice(0, 3);

        // Select the container in the home page where projects will be displayed
        const projectsContainer = document.querySelector('.projects');

        // Render the first 3 projects dynamically
        renderProjects(latestProjects, projectsContainer, 'h2');

    } catch (error) {
        console.error("Error fetching and displaying latest projects:", error);
    }
});

<div class="projects"></div>
