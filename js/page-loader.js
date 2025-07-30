// Page Loader for Dynamic Content Loading
class PageLoader {
    constructor() {
        this.pageContainer = document.getElementById('page-container');
        this.currentPage = null;
        this.pageCache = new Map();
        this.initializePageLoader();
    }

    async loadPage(pageId) {
        try {
            // Check if page is already cached
            if (this.pageCache.has(pageId)) {
                this.renderPage(this.pageCache.get(pageId));
                return;
            }

            // Load page from file
            const response = await fetch(`pages/${pageId}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load page: ${pageId}`);
            }

            const pageContent = await response.text();
            
            // Cache the page content
            this.pageCache.set(pageId, pageContent);
            
            // Render the page
            this.renderPage(pageContent);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.renderErrorPage(pageId);
        }
    }

    renderPage(content) {
        this.pageContainer.innerHTML = content;
        this.currentPage = content;
        
        // Trigger any page-specific initialization if needed
        this.initializePageFeatures();
    }

    renderErrorPage(pageId) {
        this.pageContainer.innerHTML = `
            <div class="page active">
                <div class="page-content">
                    <h1>Page Not Found</h1>
                    <p>Sorry, the page "${pageId}" could not be loaded.</p>
                    <p><a href="#" data-page="home" class="nav-link">Return to Home</a></p>
                </div>
            </div>
        `;
    }

    initializePageFeatures() {
        // Add any page-specific JavaScript initialization here
        // For example, animations, interactive elements, etc.
        
        // Smooth scroll for any internal links
        const internalLinks = this.pageContainer.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    initializePageLoader() {
        // Override the showPage function from script.js
        window.originalShowPage = window.showPage;
        window.showPage = (pageId) => {
            // Update navigation state
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`[data-page="${pageId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Load the page content
            this.loadPage(pageId);
        };

        // Load home page by default
        this.loadPage('home');
    }
}

// Initialize the page loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
});
