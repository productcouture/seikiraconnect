// ============================================
// ADVANCED SEIKIRA ANIMATIONS & INTERACTIONS
// ============================================

// Utility: Easing functions
const easing = {
  easeOutCubic: t => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutElastic: t => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ============================================
// PARTICLE SYSTEM
// ============================================
class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.options = {
      count: options.count || 50,
      color: options.color || 'rgba(42, 157, 143, 0.6)',
      maxRadius: options.maxRadius || 3,
      speed: options.speed || 0.5,
      connectionDistance: options.connectionDistance || 150
    };
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
    this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  init() {
    this.particles = [];
    for (let i = 0; i < this.options.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.offsetWidth,
        y: Math.random() * this.canvas.offsetHeight,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        radius: Math.random() * this.options.maxRadius
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.offsetWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.offsetHeight) particle.vy *= -1;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.color;
      this.ctx.fill();
    });
    
    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.connectionDistance) {
          const opacity = (1 - distance / this.options.connectionDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(42, 157, 143, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// ANIMATED COUNTER
// ============================================
function animateCounter(element, target, duration = 2000, suffix = '') {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easing.easeOutCubic(progress) * (target - start) + start);
    
    element.textContent = value.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================
// TYPING EFFECT
// ============================================
function typingEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ============================================
// 3D CARD TILT EFFECT
// ============================================
function init3DCards() {
  const cards = document.querySelectorAll('.feature-card-3d, .tech-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ============================================
// ANIMATED GRADIENT BACKGROUND
// ============================================
class AnimatedGradient {
  constructor(element) {
    this.element = element;
    this.colors = [
      { h: 180, s: 60, l: 40 },  // Teal
      { h: 200, s: 60, l: 35 },  // Blue-teal
      { h: 160, s: 55, l: 45 }   // Green-teal
    ];
    this.currentIndex = 0;
    this.targetIndex = 1;
    this.progress = 0;
    this.speed = 0.002;
    
    this.animate();
  }
  
  interpolateColor(color1, color2, progress) {
    return {
      h: color1.h + (color2.h - color1.h) * progress,
      s: color1.s + (color2.s - color1.s) * progress,
      l: color1.l + (color2.l - color1.l) * progress
    };
  }
  
  animate() {
    this.progress += this.speed;
    
    if (this.progress >= 1) {
      this.progress = 0;
      this.currentIndex = this.targetIndex;
      this.targetIndex = (this.targetIndex + 1) % this.colors.length;
    }
    
    const current = this.colors[this.currentIndex];
    const target = this.colors[this.targetIndex];
    const interpolated = this.interpolateColor(current, target, easing.easeInOutCubic(this.progress));
    
    this.element.style.background = `
      radial-gradient(ellipse at 30% 20%, 
        hsla(${interpolated.h}, ${interpolated.s}%, ${interpolated.l}%, 0.15) 0%, 
        transparent 50%),
      radial-gradient(ellipse at 70% 80%, 
        hsla(${interpolated.h + 20}, ${interpolated.s}%, ${interpolated.l - 5}%, 0.1) 0%, 
        transparent 50%)
    `;
    
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// NETWORK DIAGRAM ANIMATION
// ============================================
class NetworkDiagram {
  constructor(svg) {
    this.svg = svg;
    this.nodes = [];
    this.connections = [];
    this.init();
  }
  
  init() {
    // Create nodes
    const nodePositions = [
      { x: 50, y: 50, label: 'Stability', active: true },
      { x: 150, y: 50, label: 'Skill', active: true },
      { x: 250, y: 50, label: 'Credential', active: true },
      { x: 150, y: 150, label: 'Match', active: true },
      { x: 250, y: 150, label: 'Retention', active: false },
      { x: 350, y: 100, label: 'Growth', active: false }
    ];
    
    // Create connections with animation
    const connections = [
      [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [4, 5]
    ];
    
    // Animate connections appearing
    connections.forEach((conn, index) => {
      setTimeout(() => {
        const [from, to] = conn;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', nodePositions[from].x);
        line.setAttribute('y1', nodePositions[from].y);
        line.setAttribute('x2', nodePositions[to].x);
        line.setAttribute('y2', nodePositions[to].y);
        line.setAttribute('stroke', 'rgba(42, 157, 143, 0.3)');
        line.setAttribute('stroke-width', '2');
        line.style.strokeDasharray = '1000';
        line.style.strokeDashoffset = '1000';
        line.style.animation = 'drawLine 1s ease-out forwards';
        this.svg.appendChild(line);
      }, index * 200);
    });
    
    // Add nodes
    nodePositions.forEach((pos, index) => {
      setTimeout(() => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', pos.active ? '12' : '8');
        circle.setAttribute('fill', pos.active ? '#2a9d8f' : 'rgba(245, 243, 239, 0.3)');
        circle.style.animation = 'nodeAppear 0.5s ease-out';
        this.svg.appendChild(circle);
      }, index * 200);
    });
  }
}

// ============================================
// METRIC DASHBOARD
// ============================================
class MetricDashboard {
  constructor(container) {
    this.container = container;
    this.metrics = [];
    this.init();
  }
  
  init() {
    const metricElements = this.container.querySelectorAll('[data-metric]');
    
    metricElements.forEach(el => {
      const target = parseInt(el.dataset.metric);
      const suffix = el.dataset.suffix || '';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(el, target, 2000, suffix);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(el);
    });
  }
}

// ============================================
// CODE TERMINAL EFFECT
// ============================================
class CodeTerminal {
  constructor(element, code) {
    this.element = element;
    this.code = code;
    this.currentLine = 0;
    this.currentChar = 0;
    this.speed = 30;
    
    this.type();
  }
  
  type() {
    if (this.currentLine < this.code.length) {
      const line = this.code[this.currentLine];
      
      if (this.currentChar < line.length) {
        this.element.textContent += line.charAt(this.currentChar);
        this.currentChar++;
        setTimeout(() => this.type(), this.speed);
      } else {
        this.element.textContent += '\n';
        this.currentLine++;
        this.currentChar = 0;
        setTimeout(() => this.type(), this.speed * 3);
      }
    }
  }
}

// ============================================
// MORPHING SHAPE
// ============================================
class MorphingShape {
  constructor(svg, shapes) {
    this.svg = svg;
    this.shapes = shapes;
    this.currentIndex = 0;
    this.path = svg.querySelector('path');
    this.morph();
  }
  
  morph() {
    const nextIndex = (this.currentIndex + 1) % this.shapes.length;
    const current = this.shapes[this.currentIndex];
    const next = this.shapes[nextIndex];
    
    this.path.style.transition = 'd 1s ease-in-out';
    this.path.setAttribute('d', next);
    
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.morph();
    }, 3000);
  }
}

// ============================================
// PARALLAX SCROLL
// ============================================
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ============================================
// GLITCH EFFECT
// ============================================
function glitchEffect(element, duration = 100) {
  const original = element.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let iterations = 0;
  
  const interval = setInterval(() => {
    element.textContent = original
      .split('')
      .map((char, index) => {
        if (index < iterations) {
          return original[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    if (iterations >= original.length) {
      clearInterval(interval);
    }
    
    iterations += 1 / 3;
  }, duration / original.length);
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle system
  const particleCanvas = document.getElementById('particle-canvas');
  if (particleCanvas) {
    new ParticleSystem(particleCanvas, {
      count: 60,
      color: 'rgba(42, 157, 143, 0.6)',
      maxRadius: 2.5,
      speed: 0.3,
      connectionDistance: 120
    });
  }
  
  // Initialize 3D cards
  init3DCards();
  
  // Initialize animated gradient
  const gradientHero = document.querySelector('.seikira-hero');
  if (gradientHero) {
    new AnimatedGradient(gradientHero);
  }
  
  // Initialize metric dashboard
  const metricsContainer = document.querySelector('.metrics-dashboard');
  if (metricsContainer) {
    new MetricDashboard(metricsContainer);
  }
  
  // Initialize network diagram
  const networkSvg = document.getElementById('network-diagram');
  if (networkSvg) {
    new NetworkDiagram(networkSvg);
  }
  
  // Initialize parallax
  initParallax();
  
  // Glitch effect on hero headline
  const heroHeadline = document.querySelector('.hero-headline-glitch');
  if (heroHeadline) {
    setTimeout(() => glitchEffect(heroHeadline, 800), 500);
  }
  
  // Code terminal effect
  const terminal = document.getElementById('code-terminal');
  if (terminal) {
    const code = [
      'const workforce = new SeikiraKinect({',
      '  barriers: "auto-detect",',
      '  pathways: "employer-aligned",',
      '  analytics: "predictive",',
      '  retention: "90-day-forecast"',
      '});',
      '',
      'workforce.connect();',
      '// ✓ Intelligence layer initialized'
    ];
    new CodeTerminal(terminal, code);
  }
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes drawLine {
      to {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes nodeAppear {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ParticleSystem,
    animateCounter,
    typingEffect,
    init3DCards,
    AnimatedGradient,
    NetworkDiagram,
    MetricDashboard,
    CodeTerminal,
    glitchEffect
  };
}
