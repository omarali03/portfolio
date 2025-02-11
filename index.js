import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("index.js loaded and running.");

        const projects = await fetchJSON('./lib/projects.json');

        console.log("Projects JSON:", projects);

        if (!projects || projects.length === 0) {
            console.error("No projects found. Check if projects.json is correctly formatted and accessible.");
            return;
        }

        const latestProjects = projects.slice(0, 3);

        const projectsContainer = document.querySelector('.projects');

        console.log("Projects container found:", projectsContainer);

        if (!projectsContainer) {
            console.error("Error: No .projects container found in index.html.");
            return;
        }

        renderProjects(latestProjects, projectsContainer, 'h2');

        const projectsTitle = document.querySelector('.projects-title');
        if (projectsTitle) {
            projectsTitle.textContent = `${projects.length} Projects`;
        }

    } catch (error) {
        console.error("Error fetching and displaying latest projects:", error);
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
