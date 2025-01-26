console.log("IT’S ALIVE!");

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// Get all navigation links
const navLinks = $$("nav a");

// Get the current page's URL path
const currentPath = window.location.pathname;

// Add the "active" class to the current page link
navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
    }
});
