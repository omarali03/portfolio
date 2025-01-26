console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
const navLinks = $$("nav a");

// Log the array to the console to verify
console.log(navLinks);