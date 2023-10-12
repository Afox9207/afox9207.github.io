//active links

const homeLink = document.getElementById("home-link");
const aboutMeLink = document.getElementById("about-me-link");
const projectsLink = document.getElementById("projects-link");
const contactLink = document.getElementById("contact-link");

homeLink.addEventListener("click", makeHomeLinkActive);
aboutMeLink.addEventListener("click", makeAboutMeLinkActive);
projectsLink.addEventListener("click", makeProjectsLinkActive);
contactLink.addEventListener("click", makeContactLinkActive);

homeLink.className = "navbar__link navbar__link--active";

function resetActiveClass() {
    homeLink.className = "navbar__link";
    aboutMeLink.className = "navbar__link";
    projectsLink.className = "navbar__link";
    contactLink.className = "navbar__link";
}

function makeHomeLinkActive() {
    resetActiveClass();
    homeLink.className += " navbar__link--active";
}

function makeAboutMeLinkActive() {
    resetActiveClass();
    aboutMeLink.className += " navbar__link--active";
}

function makeProjectsLinkActive() {
    resetActiveClass();
    projectsLink.className += " navbar__link--active";
}

function makeContactLinkActive() {
    resetActiveClass();
    contactLink.className += " navbar__link--active";
}

//determine size of navbar
function calculateNavbarDimensions() {
    let navbar = document.getElementById("navbar");
    let navbarStyle = getComputedStyle(navbar);
    let navbarHeight = navbarStyle.getPropertyValue("height");
    let navbarWidth = navbarStyle.getPropertyValue("width");
    
    let root = document.querySelector(":root");
    root.style.setProperty("--navbar-height", navbarHeight);
    root.style.setProperty("--navbar-width", navbarWidth);
}

calculateNavbarDimensions();

window.addEventListener("resize", calculateNavbarDimensions);
