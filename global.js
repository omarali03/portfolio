console.log("IT’S ALIVE!");

// Check if we're on the home page
const ARE_WE_HOME = document.documentElement.classList.contains("home");

// Pages for navigation
const pages = [
  { url: "", title: "Home" },
  { url: "contact/", title: "Contact" },
  { url: "projects/", title: "Projects" },
  { url: "resume/", title: "Resume" },
  { url: "https://github.com/omarali03", title: "Github" }
];

// Create and insert navigation dynamically
const nav = document.createElement("nav");
pages.forEach(({ url, title }) => {
  const adjustedUrl = !ARE_WE_HOME && !url.startsWith("http") ? `../${url}` : url;

  const a = document.createElement("a");
  a.href = adjustedUrl;
  a.textContent = title;
  a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);

  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.appendChild(a);
});
document.body.prepend(nav);

// Theme Selection UI
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <label class="color-scheme">
    Theme:
    <select id="color-scheme-select">
      <option value="light dark" selected>Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

const colorSchemeSelect = document.getElementById("color-scheme-select");

colorSchemeSelect.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  document.documentElement.style.colorScheme = selectedValue;
  localStorage.setItem("color-scheme", selectedValue);
});

// Load user's theme preference
const savedColorScheme = localStorage.getItem("color-scheme");
if (savedColorScheme) {
  console.log(`Loaded saved theme: ${savedColorScheme}`);
  colorSchemeSelect.value = savedColorScheme;
  document.documentElement.style.colorScheme = savedColorScheme;
} else {
  console.log("No saved theme found, defaulting to Automatic");
}

// ========= ✅ FIXED PROJECT STATE HANDLING =========

// Store and retrieve projects properly
let projects = [];

export function setProjects(data) {
  projects = data;
}

export function getProjects() {
  return projects;
}

// ========= ✅ FIXED fetchJSON FUNCTION =========

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.statusText}`);
    }
    const data = await response.json();
    setProjects(data); // Store projects globally
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

// ========= ✅ FIXED renderProjects FUNCTION =========

export function renderProjects(containerElement, headingLevel = "h2") {
  if (!containerElement) {
    console.error("Error: Container element is not valid.");
    return;
  }

  containerElement.innerHTML = ""; // Clear previous content

  const projects = getProjects(); // Fetch stored projects

  if (!projects || projects.length === 0) {
    console.warn("No projects found.");
    return;
  }

  projects.forEach((project) => {
    const article = document.createElement("article");

    // Default values for missing properties
    const title = project.title || "Untitled Project";
    const image = project.image || "https://via.placeholder.com/150";
    const description = project.description || "No description available.";
    const year = project.year || "Unknown Year";

    // Create elements
    const heading = document.createElement(headingLevel);
    heading.textContent = title;

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    const yearParagraph = document.createElement("p");
    yearParagraph.textContent = `c. ${year}`;
    yearParagraph.style.fontStyle = "italic";
    yearParagraph.style.fontVariantNumeric = "oldstyle-nums";

    // Wrapper for text
    const textWrapper = document.createElement("div");
    textWrapper.appendChild(paragraph);
    textWrapper.appendChild(yearParagraph);

    // Append everything
    article.appendChild(heading);
    article.appendChild(img);
    article.appendChild(textWrapper);
    containerElement.appendChild(article);
  });
}

// ========= ✅ FIXED fetchGitHubData FUNCTION =========

export async function fetchGitHubData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
}

