// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Page Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (window.showPage) {
                window.showPage(pageId);
            }
        });
    });
}

// Enhanced showPage function that works with embedded pages
function showPage(pageId) {
    console.log('showPage called with:', pageId); // Debug log
    
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Found pages:', pages.length); // Debug log
    console.log('Found nav links:', navLinks.length); // Debug log
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        console.log('Activated page:', pageId); // Debug log
    } else {
        console.error('Page not found:', pageId); // Debug log
    }
    
    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate the clicked link
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        console.log('Activated nav link for:', pageId); // Debug log
    } else {
        console.error('Nav link not found for:', pageId); // Debug log
    }
}

// Make showPage globally available
window.showPage = showPage;

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing navigation...'); // Debug log
    initializeNavigation();
    // Show home page by default
    showPage('home');
    console.log('Navigation initialized and home page shown'); // Debug log
});

// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
