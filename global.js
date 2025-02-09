console.log("IT’S ALIVE!");

const ARE_WE_HOME = document.documentElement.classList.contains('home');

const pages = [
  { url: '', title: 'Home' },
  { url: 'contact/', title: 'Contact' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'https://github.com/omarali03', title: 'Github' }
];

const nav = document.createElement('nav');
pages.forEach(({ url, title }) => {
  const adjustedUrl = !ARE_WE_HOME && !url.startsWith('http') ? `../${url}` : url;

  const a = document.createElement('a');
  a.href = adjustedUrl;
  a.textContent = title;

  a.classList.toggle('current', a.host === location.host && a.pathname === location.pathname);

  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.appendChild(a);
});

document.body.prepend(nav);

document.body.insertAdjacentHTML(
  'afterbegin',
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

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.querySelector("option[value='light dark']").textContent = "Automatic (Dark)";
} else {
  document.querySelector("option[value='light dark']").textContent = "Automatic (Light)";
}

const colorSchemeSelect = document.getElementById("color-scheme-select");

colorSchemeSelect.addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  document.documentElement.style.colorScheme = selectedValue;

  localStorage.setItem("color-scheme", selectedValue);
});

// Load the user’s saved color scheme preference
const savedColorScheme = localStorage.getItem("color-scheme");
if (savedColorScheme) {
  console.log(`Loaded saved theme: ${savedColorScheme}`);
  colorSchemeSelect.value = savedColorScheme;
  document.documentElement.style.colorScheme = savedColorScheme;
} else {
  console.log("No saved theme found, defaulting to Automatic");
}

export async function fetchJSON(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
      console.error("Container element is not valid.");
      return;
  }

  // Ensure headingLevel is a valid heading tag
  const validHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  if (!validHeadings.includes(headingLevel)) {
      console.warn(`Invalid heading level: ${headingLevel}. Defaulting to 'h2'.`);
      headingLevel = 'h2';
  }

  // Clear existing content before rendering new projects
  containerElement.innerHTML = '';

  // Loop through each project and create elements dynamically
  projects.forEach(project => {
      const article = document.createElement('article');

      // Ensure missing properties don't break rendering
      const title = project.title || "Untitled Project";
      const image = project.image || "https://via.placeholder.com/150";
      const description = project.description || "No description available.";
      const year = project.year || "Unknown Year"; // Fetch project year

      // Create dynamic heading
      const heading = document.createElement(headingLevel);
      heading.textContent = title;

      // Create image element
      const img = document.createElement('img');
      img.src = image;
      img.alt = title;

      // Create paragraph for description
      const paragraph = document.createElement('p');
      paragraph.textContent = description;

      // Create paragraph for year
      const yearParagraph = document.createElement('p');
      yearParagraph.textContent = `c. ${year}`;
      yearParagraph.style.fontStyle = 'italic'; // Style year text

      // Wrap description and year in a div to prevent overlap
      const textWrapper = document.createElement('div');
      textWrapper.appendChild(paragraph);
      textWrapper.appendChild(yearParagraph);

      // Append elements to article
      article.appendChild(heading);
      article.appendChild(img);
      article.appendChild(textWrapper);

      // Append article to container
      containerElement.appendChild(article);
  });
}

export async function fetchGithubData(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
          throw new Error(`Failed to fetch GitHub data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

  } catch (error) {
      console.error("Error fetching GitHub data:", error);
  }
}

export async function fetchGitHubData(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
          throw new Error(`Failed to fetch GitHub data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

  } catch (error) {
      console.error("Error fetching GitHub data:", error);
  }
}



  