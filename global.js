console.log("IT’S ALIVE!");

// Check if we're on the home page
const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Define the pages for navigation
let pages = [
  { url: '', title: 'Home' },
  { url: 'contact/', title: 'Contact' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'https://github.com/omarali03', title: 'Github' }
];

// Create a <nav> element
let nav = document.createElement('nav');

// Dynamically generate navigation links
for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Adjust relative URLs for non-home pages
  url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

  // Create a <a> element
  let a = document.createElement('a');
  a.href = url; // Set the href attribute
  a.textContent = title; // Set the text content

  // Highlight the current page
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = '_blank'; // Set target="_blank"
  }

  // Append the link to the navigation menu
  nav.append(a);
}

// Add the <nav> to the top of the <body>
document.body.prepend(nav);

  // Insert the dark mode switch at the start of the <body>
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
  
  // Detect the current OS color scheme and adjust the dropdown label
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.querySelector("option[value='light dark']").textContent = "Automatic (Dark)";
  } else {
    document.querySelector("option[value='light dark']").textContent = "Automatic (Light)";
  }
  
  // Add event listener to handle dropdown changes
  const colorSchemeSelect = document.getElementById("color-scheme-select");
  
  colorSchemeSelect.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
  
    // Apply the selected color scheme to the <html> element
    document.documentElement.style.colorScheme = selectedValue;
  
    // Optionally save the user’s choice in localStorage
    localStorage.setItem("color-scheme", selectedValue);
  });
  
  // Load the user’s preferred color scheme from localStorage on page load
  const savedColorScheme = localStorage.getItem("color-scheme");
  if (savedColorScheme) {
    colorSchemeSelect.value = savedColorScheme;
    document.documentElement.style.colorScheme = savedColorScheme;
  }
  