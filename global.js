console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Get an array of all nav links
const navLinks = $$("nav a");

// Log the array to the console to verify
console.log(navLinks);
