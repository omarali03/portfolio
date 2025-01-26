console.log("IT’S ALIVE!");

// Get all <a> elements in the <nav> as an array
const navLinks = Array.from(document.querySelectorAll("nav a"));

// Find the link that matches the current page
let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// Add the "current" class to the link if it exists
currentLink?.classList.add('current');

