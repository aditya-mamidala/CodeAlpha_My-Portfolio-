const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Keep the navigation state in sync with the section currently on screen.
const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

// Reveal content gently as it enters the viewport.
const revealTargets = document.querySelectorAll(".about-grid, .principles article, .project-card, .skill-row, .contact-card");
revealTargets.forEach(item => item.classList.add("reveal"));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(item => revealObserver.observe(item));

document.querySelector("#year").textContent = new Date().getFullYear();

// IMPORTANT: Update these placeholders before publishing your portfolio.
const portfolioEmail = "your.email@example.com";
document.querySelector("#email-link").href = `mailto:${portfolioEmail}`;
