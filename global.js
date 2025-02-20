console.log("IT’S ALIVE!");

// Navigation Logic
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

// Theme Selection
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

// Fetch JSON function (ensuring data loads properly)
export async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  return response.json();
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
      console.error("Container element is not valid.");
      return;
  }
  containerElement.innerHTML = ''; // Clear previous content

  projects.forEach(project => {
      const article = document.createElement('article');

      // Ensure missing properties don't break rendering
      const title = project.title || "Untitled Project";
      const image = project.image || "https://via.placeholder.com/150";
      const description = project.description || "No description available.";
      const year = project.year || "Unknown Year"; 

      // Create title heading
      const heading = document.createElement(headingLevel);
      heading.textContent = title;

      // Create image element
      const img = document.createElement('img');
      img.src = image;
      img.alt = title;

      // Create description paragraph
      const paragraph = document.createElement('p');
      paragraph.textContent = description;

      // Create year element
      const yearParagraph = document.createElement('p');
      yearParagraph.textContent = `c. ${year}`;
      yearParagraph.style.fontStyle = 'italic';
      yearParagraph.style.fontVariantNumeric = 'oldstyle-nums'; // Apply recommended styling

      // Create wrapper for description and year
      const textWrapper = document.createElement('div');
      textWrapper.appendChild(paragraph);
      textWrapper.appendChild(yearParagraph);

      // Append elements to the article
      article.appendChild(heading);
      article.appendChild(img);
      article.appendChild(textWrapper);

      // Append article to the container
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


  