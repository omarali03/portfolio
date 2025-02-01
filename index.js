import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch all projects from projects.json
        const projects = await fetchJSON('./lib/projects.json');

        // Get only the first 3 projects for the homepage
        const latestProjects = projects.slice(0, 3);

        // Select the container in the home page where projects will be displayed
        const projectsContainer = document.querySelector('.projects');

        // Render the first 3 projects dynamically
        renderProjects(latestProjects, projectsContainer, 'h2');

        // **Update the Projects Title with Total Projects Count**
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
        const username = "omarali03";  // Change to your GitHub username
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

// Run GitHub function when page loads
displayGitHubProfile();
