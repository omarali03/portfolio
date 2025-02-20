import { fetchJSON, renderProjects } from './global.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("index.js is running.");

        // Fetch all projects from projects.json
        const projects = await fetchJSON('./lib/projects.json');

        // Debugging: Log the fetched projects
        console.log("Fetched projects:", projects);

        if (!projects || projects.length === 0) {
            console.error("No projects found. Check if projects.json is accessible.");
            return;
        }

        // Select the container where projects should appear
        const projectsContainer = document.querySelector('.projects');
        console.log("Projects container:", projectsContainer);

        if (!projectsContainer) {
            console.error("Error: No .projects container found in HTML.");
            return;
        }

        // Render the projects
        renderProjects(projects, projectsContainer, 'h2');
        console.log("Projects successfully rendered!");

    } catch (error) {
        console.error("Error fetching and displaying projects:", error);
    }
});


// GitHub API Fetching
async function displayGitHubProfile() {
    try {
        const username = "omarali03";  
        const githubData = await fetchGitHubData(username);

        if (githubData) {
            document.getElementById("github-avatar").src = githubData.avatar_url;
            document.getElementById("github-username").textContent = githubData.login;
            document.getElementById("github-followers").textContent = githubData.followers;
            document.getElementById("github-repos").textContent = githubData.public_repos;
        }
    } catch (error) {
        console.error("Error fetching GitHub profile:", error);
    }
}

displayGitHubProfile();

import { fetchGitHubData } from './global.js';

async function displayGitHubStats() {
    try {
        const username = "omarali03"; 
        const githubData = await fetchGitHubData(username);

        if (githubData) {
            document.getElementById("github-followers").textContent = githubData.followers;
            document.getElementById("github-following").textContent = githubData.following;
            document.getElementById("github-repos").textContent = githubData.public_repos;
            document.getElementById("github-gists").textContent = githubData.public_gists;
        }
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
    }
}

displayGitHubStats();
