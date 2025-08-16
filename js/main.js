// main.js
// This script enables smooth scrolling for in-page navigation and sets the active
// link based on scroll position. The website uses a single-page layout for
// the home, experience, projects and publications sections.

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight current navigation link on scroll
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function onScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    sections.forEach(section => {
      const offsetTop = section.offsetTop - 100;
      const offsetBottom = offsetTop + section.offsetHeight;
      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});