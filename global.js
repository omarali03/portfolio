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

  // Add the link to the navigation
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}

// Add the <nav> to the top of the <body>
document.body.prepend(nav);

// Find the current page link and add the "current" class
let currentLink = Array.from(nav.querySelectorAll('a')).find(
  (a) => a.host === location.host && a.pathname === location.pathname
);
currentLink?.classList.add('current');
