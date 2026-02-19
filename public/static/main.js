// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
}

// ============================================
// MOBILE NAVIGATION
// ============================================
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const overlay = document.getElementById('overlay');

function openMobileNav() {
  if (mobileNav && overlay) {
    mobileNav.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  if (mobileNav && overlay) {
    mobileNav.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }
}

if (navToggle) navToggle.addEventListener('click', openMobileNav);
if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
if (overlay) overlay.addEventListener('click', closeMobileNav);

// Close on link click
document.querySelectorAll('.mobile-nav__link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Observe stat elements
document.querySelectorAll('.stat[data-animate]').forEach(stat => {
  observer.observe(stat);
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// NODE HOVER INTERACTIONS (if present)
// ============================================
const nodes = document.querySelectorAll('.node');
if (nodes.length > 0) {
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      // Add subtle glow effect to connected nodes
      nodes.forEach(n => {
        if (n !== node && n.classList.contains('node--active')) {
          n.style.borderColor = 'rgba(212, 175, 55, 0.5)';
        }
      });
    });
    node.addEventListener('mouseleave', () => {
      nodes.forEach(n => {
        if (n.classList.contains('node--active')) {
          n.style.borderColor = '';
        }
      });
    });
  });
}
