/**
 * Advanced Scroll Animations System
 * Vanilla JS implementation with Intersection Observer
 * GPU-accelerated transforms for 60 FPS performance
 */

class ScrollAnimationController {
  constructor() {
    this.observers = new Map();
    this.animations = [];
    this.scrollY = 0;
    this.ticking = false;
    
    this.init();
  }

  init() {
    // Setup scroll listener with RAF throttling
    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset;
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.onScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });

    // Initialize all animations
    this.setupFadeInAnimations();
    this.setupSlideAnimations();
    this.setupParallaxEffects();
    this.setupCounterAnimations();
    this.setupRevealAnimations();
    this.setupStaggerAnimations();
  }

  onScroll() {
    // Update parallax elements
    this.updateParallax();
    
    // Update progress bars
    this.updateProgressIndicators();
  }

  /**
   * Fade In Animations
   * Elements fade in when entering viewport
   */
  setupFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      fadeObserver.observe(el);
    });

    this.observers.set('fade', fadeObserver);
  }

  /**
   * Slide Animations
   * Elements slide in from left/right
   */
  setupSlideAnimations() {
    const slideLeftElements = document.querySelectorAll('.slide-left');
    const slideRightElements = document.querySelectorAll('.slide-right');

    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    });

    slideLeftElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50px)';
      el.style.transition = 'opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1), transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
      slideObserver.observe(el);
    });

    slideRightElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(50px)';
      el.style.transition = 'opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1), transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)';
      slideObserver.observe(el);
    });

    this.observers.set('slide', slideObserver);
  }

  /**
   * Parallax Effects
   * Elements move at different speeds on scroll
   */
  setupParallaxEffects() {
    this.parallaxElements = Array.from(document.querySelectorAll('.parallax')).map(el => ({
      element: el,
      speed: parseFloat(el.dataset.speed || '0.5'),
      initialY: 0
    }));
  }

  updateParallax() {
    this.parallaxElements?.forEach(item => {
      const rect = item.element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inView) {
        const yPos = -(this.scrollY * item.speed);
        item.element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }

  /**
   * Counter Animations
   * Numbers count up when visible
   */
  setupCounterAnimations() {
    const counterElements = document.querySelectorAll('.counter-animate');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          this.animateCounter(entry.target);
          entry.target.dataset.counted = 'true';
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
    this.observers.set('counter', counterObserver);
  }

  animateCounter(element) {
    const target = parseFloat(element.dataset.target || element.textContent);
    const duration = parseInt(element.dataset.duration || '2000');
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const decimals = element.dataset.decimals || 0;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = prefix + target.toFixed(decimals) + suffix;
        clearInterval(timer);
      } else {
        element.textContent = prefix + start.toFixed(decimals) + suffix;
      }
    }, 16);
  }

  /**
   * Reveal Animations
   * Text/content reveals with mask effect
   */
  setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.3 });

    revealElements.forEach(el => revealObserver.observe(el));
    this.observers.set('reveal', revealObserver);
  }

  /**
   * Stagger Animations
   * Child elements animate in sequence
   */
  setupStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 200); // 200ms stagger delay (slower)
          });
        }
      });
    }, { threshold: 0.2 });

    staggerContainers.forEach(container => {
      const children = container.querySelectorAll('.stagger-item');
      children.forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      });
      staggerObserver.observe(container);
    });

    this.observers.set('stagger', staggerObserver);
  }

  /**
   * Progress Indicators
   * Show scroll progress bars
   */
  updateProgressIndicators() {
    const indicators = document.querySelectorAll('.scroll-progress');
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (this.scrollY / docHeight) * 100;

    indicators.forEach(indicator => {
      indicator.style.width = `${progress}%`;
    });
  }

  /**
   * Cleanup
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

/**
 * Smooth Scroll Navigation
 */
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          this.scrollToElement(target);
        }
      });
    });
  }

  scrollToElement(element, offset = 80) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Magnetic Button Effect
 */
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.magnetic-btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => this.handleMouseMove(e, button));
      button.addEventListener('mouseleave', () => this.handleMouseLeave(button));
    });
  }

  handleMouseMove(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  handleMouseLeave(button) {
    button.style.transform = 'translate(0, 0)';
  }
}

/**
 * Cursor Follower
 */
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorFollower = null;
    this.init();
  }

  init() {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'custom-cursor-follower';
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);

    // Track mouse movement
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      this.cursor.style.left = mouseX + 'px';
      this.cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      this.cursorFollower.style.left = followerX + 'px';
      this.cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .clickable');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
        this.cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
        this.cursorFollower.classList.remove('hover');
      });
    });
  }
}

/**
 * Initialize all animation systems
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  window.scrollController = new ScrollAnimationController();
  
  // Initialize smooth scroll
  window.smoothScroll = new SmoothScroll();
  
  // Initialize magnetic buttons
  window.magneticButtons = new MagneticButtons();
  
  // Initialize custom cursor (desktop only)
  if (window.innerWidth > 1024) {
    window.customCursor = new CustomCursor();
  }

  console.log('🎨 Advanced scroll animations initialized');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ScrollAnimationController,
    SmoothScroll,
    MagneticButtons,
    CustomCursor
  };
}
