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
