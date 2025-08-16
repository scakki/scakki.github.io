// Page Loader for Dynamic Content Loading
class PageLoader {
    constructor() {
        this.pageContainer = document.getElementById('page-container');
        this.currentPage = null;
        this.pageCache = new Map();
        this.isLocalFile = window.location.protocol === 'file:';
        this.initializePageLoader();
    }

    async loadPage(pageId) {
        try {
            // Check if page is already cached
            if (this.pageCache.has(pageId)) {
                this.renderPage(this.pageCache.get(pageId));
                return;
            }

            // For local development, show a message about using a local server
            if (this.isLocalFile) {
                this.renderLocalFileMessage(pageId);
                return;
            }

            // Load page from file
            const response = await fetch(`pages/${pageId}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load page: ${pageId} (${response.status})`);
            }

            const pageContent = await response.text();
            
            // Cache the page content
            this.pageCache.set(pageId, pageContent);
            
            // Render the page
            this.renderPage(pageContent);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.renderErrorPage(pageId, error.message);
        }
    }

    renderPage(content) {
        this.pageContainer.innerHTML = content;
        this.currentPage = content;
        
        // Trigger any page-specific initialization if needed
        this.initializePageFeatures();
    }

    renderLocalFileMessage(pageId) {
        this.pageContainer.innerHTML = `
            <div class="page active">
                <div class="page-content">
                    <h1>Local Development Notice</h1>
                    <p>You're viewing this from a local file (file:// protocol). For the modular page loading to work properly, you need to serve this through a local web server.</p>
                    
                    <h3>Quick Solutions:</h3>
                    <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p><strong>Option 1 - Python:</strong></p>
                        <code style="background: var(--bg-primary); padding: 0.5rem; display: block; margin: 0.5rem 0;">python -m http.server 8000</code>
                        <p>Then visit: <a href="http://localhost:8000" target="_blank">http://localhost:8000</a></p>
                    </div>
                    
                    <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p><strong>Option 2 - VS Code Live Server:</strong></p>
                        <p>Install "Live Server" extension, right-click index.html → "Open with Live Server"</p>
                    </div>

                    <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p><strong>Option 3 - Node.js:</strong></p>
                        <code style="background: var(--bg-primary); padding: 0.5rem; display: block; margin: 0.5rem 0;">npx serve .</code>
                    </div>

                    <p>Currently trying to load: <strong>${pageId}.html</strong></p>
                    <p><a href="#" onclick="location.reload()">Refresh page</a> after starting a local server.</p>
                </div>
            </div>
        `;
    }

    renderErrorPage(pageId, errorMessage) {
        this.pageContainer.innerHTML = `
            <div class="page active">
                <div class="page-content">
                    <h1>Page Load Error</h1>
                    <p>Sorry, the page "${pageId}" could not be loaded.</p>
                    <p><strong>Error:</strong> ${errorMessage}</p>
                    <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p><strong>Troubleshooting:</strong></p>
                        <ul>
                            <li>Make sure you're serving this through a web server (not file://)</li>
                            <li>Check that pages/${pageId}.html exists</li>
                            <li>Verify there are no CORS restrictions</li>
                        </ul>
                    </div>
                    <p><a href="#" data-page="home" class="nav-link" onclick="window.showPage('home')">Return to Home</a></p>
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
