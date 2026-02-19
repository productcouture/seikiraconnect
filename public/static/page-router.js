/**
 * Page Router & Navigation System
 * Smooth transitions between pages with lazy loading
 */

class PageRouter {
  constructor() {
    this.currentPage = 'home';
    this.pages = new Map();
    this.transitionDuration = 600;
    this.init();
  }

  init() {
    // Register available pages
    this.registerPage('home', '/');
    this.registerPage('product-couture', '/product-couture.html');
    this.registerPage('services', '/services.html');
    this.registerPage('about', '/about.html');
    this.registerPage('contact', '/contact.html');

    // Setup navigation listeners
    this.setupNavigation();
    
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.page) {
        this.navigateToPage(e.state.page, false);
      }
    });

    console.log('🧭 Page router initialized');
  }

  registerPage(name, path) {
    this.pages.set(name, {
      name,
      path,
      loaded: false,
      content: null
    });
  }

  setupNavigation() {
    // Setup all navigation links
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.dataset.page;
        this.navigateToPage(pageName);
      });
    });

    // Setup smooth scroll for hash links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          this.smoothScrollTo(target);
        }
      });
    });
  }

  async navigateToPage(pageName, pushState = true) {
    if (pageName === this.currentPage) return;

    const page = this.pages.get(pageName);
    if (!page) {
      console.error(`Page "${pageName}" not found`);
      return;
    }

    // Show loading state
    this.showPageTransition();

    // Load page content if not cached
    if (!page.loaded) {
      await this.loadPage(page);
    }

    // Update browser history
    if (pushState) {
      history.pushState({ page: pageName }, '', page.path);
    }

    // Render page
    await this.renderPage(page);

    // Hide loading state
    this.hidePageTransition();

    // Update current page
    this.currentPage = pageName;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async loadPage(page) {
    try {
      const response = await fetch(page.path);
      if (!response.ok) throw new Error(`Failed to load page: ${response.status}`);
      
      page.content = await response.text();
      page.loaded = true;
    } catch (error) {
      console.error('Error loading page:', error);
      page.content = '<div class="error">Page not found</div>';
    }
  }

  async renderPage(page) {
    const mainContent = document.querySelector('main') || document.body;
    
    // Fade out current content
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    await this.wait(this.transitionDuration / 2);
    
    // Update content
    if (page.name === 'home') {
      // Reload the page for home
      window.location.href = '/';
    } else {
      mainContent.innerHTML = page.content;
      
      // Re-initialize animations and components
      this.reinitializeComponents();
    }
    
    // Fade in new content
    await this.wait(50);
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'translateY(0)';
  }

  reinitializeComponents() {
    // Reinitialize scroll animations
    if (window.scrollController) {
      window.scrollController.destroy();
      window.scrollController = new ScrollAnimationController();
    }

    // Reinitialize smooth scroll
    if (window.smoothScroll) {
      window.smoothScroll = new SmoothScroll();
    }

    // Reinitialize magnetic buttons
    if (window.magneticButtons) {
      window.magneticButtons = new MagneticButtons();
    }
  }

  showPageTransition() {
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(10, 10, 12, 0.95) 0%, rgba(42, 157, 143, 0.1) 100%);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity ${this.transitionDuration}ms ease;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 50px;
      height: 50px;
      border: 3px solid rgba(42, 157, 143, 0.3);
      border-top-color: #2a9d8f;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    `;

    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    // Add spinner animation
    if (!document.getElementById('spinner-animation')) {
      const style = document.createElement('style');
      style.id = 'spinner-animation';
      style.textContent = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  }

  hidePageTransition() {
    const overlay = document.getElementById('page-transition-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), this.transitionDuration);
    }
  }

  smoothScrollTo(element, offset = 80) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Mobile Navigation Controller
 */
class MobileNavController {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    // Create mobile menu button if it doesn't exist
    this.createMobileButton();
    
    // Setup event listeners
    this.setupListeners();

    console.log('📱 Mobile navigation initialized');
  }

  createMobileButton() {
    // Check if button already exists
    if (document.querySelector('.mobile-nav-toggle')) return;

    const button = document.createElement('button');
    button.className = 'mobile-nav-toggle';
    button.setAttribute('aria-label', 'Toggle navigation');
    button.innerHTML = `
      <span class="hamburger"></span>
      <span class="hamburger"></span>
      <span class="hamburger"></span>
    `;

    // Insert button into header
    const header = document.querySelector('header, .header');
    if (header) {
      header.appendChild(button);
    }
  }

  setupListeners() {
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggle());
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const nav = document.querySelector('.mobile-nav');
      const button = document.querySelector('.mobile-nav-toggle');
      
      if (this.isOpen && nav && !nav.contains(e.target) && !button.contains(e.target)) {
        this.close();
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    const nav = document.querySelector('.mobile-nav');
    const button = document.querySelector('.mobile-nav-toggle');
    
    if (nav) {
      nav.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    if (button) {
      button.classList.add('active');
    }
    
    this.isOpen = true;
  }

  close() {
    const nav = document.querySelector('.mobile-nav');
    const button = document.querySelector('.mobile-nav-toggle');
    
    if (nav) {
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (button) {
      button.classList.remove('active');
    }
    
    this.isOpen = false;
  }
}

// Initialize router and mobile nav when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.pageRouter = new PageRouter();
  window.mobileNav = new MobileNavController();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PageRouter, MobileNavController };
}
