import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files from public/static
app.use('/static/*', serveStatic({ root: './' }))

// Homepage - Seikira focused (Option C)
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seikira | The Operating System for Economic Mobility</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/styles.css">
  
  <style>
    /* Seikira-specific hero styles */
    .seikira-hero {
      min-height: 90vh;
      display: flex;
      align-items: center;
      padding: 160px 0 100px;
      position: relative;
      overflow: hidden;
      background: radial-gradient(ellipse at 50% 0%, rgba(42, 157, 143, 0.1) 0%, transparent 50%);
    }
    
    .seikira-hero__content {
      text-align: center;
      max-width: 960px;
      margin: 0 auto;
    }
    
    .seikira-hero__headline {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 6vw, 5rem);
      font-weight: 500;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 32px;
      color: var(--text-ivory);
    }
    
    .seikira-hero__headline span {
      color: var(--accent-teal);
    }
    
    .seikira-hero__problem {
      font-size: clamp(1rem, 2vw, 1.25rem);
      line-height: 1.6;
      color: var(--text-ivory-muted);
      margin-bottom: 16px;
    }
    
    .seikira-hero__solution {
      font-size: clamp(1.25rem, 2.5vw, 1.75rem);
      font-weight: 500;
      color: var(--accent-gold);
      margin-bottom: 40px;
    }
    
    .seikira-hero__tagline {
      font-size: clamp(1rem, 2vw, 1.375rem);
      font-weight: 500;
      color: var(--text-ivory);
      margin-bottom: 48px;
    }
    
    .seikira-hero__ctas {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 64px;
    }
    
    .trust-logos {
      padding: 48px 0;
      border-top: 1px solid rgba(245, 243, 239, 0.06);
      border-bottom: 1px solid rgba(245, 243, 239, 0.06);
    }
    
    .trust-logos__text {
      text-align: center;
      font-size: 0.875rem;
      color: var(--text-ivory-subtle);
      margin-bottom: 32px;
    }
    
    .trust-logos__grid {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 48px;
      flex-wrap: wrap;
    }
    
    .trust-logo {
      width: 140px;
      height: 60px;
      background: rgba(245, 243, 239, 0.03);
      border: 1px solid rgba(245, 243, 239, 0.06);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      color: var(--text-ivory-subtle);
      text-align: center;
      padding: 12px;
    }
    
    .problem-section {
      padding: var(--section-spacing) 0;
      background: var(--bg-secondary);
    }
    
    .problem-section__header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 64px;
    }
    
    .problem-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      line-height: 1.2;
      margin-bottom: 32px;
    }
    
    .problem-list {
      max-width: 720px;
      margin: 0 auto 48px;
      list-style: none;
    }
    
    .problem-list li {
      font-size: 1.125rem;
      line-height: 2;
      color: var(--text-ivory-muted);
      padding-left: 32px;
      position: relative;
    }
    
    .problem-list li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--accent-gold);
      font-size: 1.5rem;
      line-height: 1.4;
    }
    
    .problem-chain {
      text-align: center;
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--accent-teal);
      margin: 48px 0;
    }
    
    .problem-results {
      max-width: 800px;
      margin: 48px auto 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 24px;
    }
    
    .problem-result {
      background: var(--bg-card);
      border: 1px solid rgba(245, 243, 239, 0.06);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
    }
    
    .problem-result__icon {
      font-size: 2rem;
      margin-bottom: 12px;
    }
    
    .problem-result__text {
      font-size: 0.9375rem;
      color: var(--text-ivory-muted);
    }
    
    .shift-section {
      padding: var(--section-spacing) 0;
    }
    
    .shift-section__header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 48px;
    }
    
    .shift-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      line-height: 1.2;
      margin-bottom: 24px;
    }
    
    .shift-section__subtitle {
      font-size: 1.375rem;
      color: var(--text-ivory-muted);
      margin-bottom: 48px;
    }
    
    .shift-requirements {
      max-width: 720px;
      margin: 0 auto;
      list-style: none;
    }
    
    .shift-requirements li {
      font-size: 1.125rem;
      line-height: 2;
      color: var(--text-ivory-muted);
      padding-left: 32px;
      position: relative;
    }
    
    .shift-requirements li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent-teal);
      font-weight: 700;
    }
    
    .shift-conclusion {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--accent-gold);
      margin-top: 48px;
    }
    
    .features-section {
      padding: var(--section-spacing) 0;
      background: var(--bg-secondary);
    }
    
    .features-section__header {
      text-align: center;
      margin-bottom: 64px;
    }
    
    .features-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      margin-bottom: 16px;
    }
    
    .features-section__subtitle {
      font-size: 1.125rem;
      color: var(--text-ivory-muted);
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .feature-card {
      background: var(--bg-card);
      border: 1px solid rgba(245, 243, 239, 0.06);
      border-radius: 20px;
      padding: 40px;
      transition: all 0.4s ease;
    }
    
    .feature-card:hover {
      border-color: rgba(42, 157, 143, 0.3);
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .feature-card__number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--accent-teal-subtle);
      border-radius: 12px;
      font-weight: 600;
      color: var(--accent-teal);
      margin-bottom: 24px;
    }
    
    .feature-card__title {
      font-family: var(--font-serif);
      font-size: 1.375rem;
      font-weight: 500;
      color: var(--text-ivory);
      margin-bottom: 16px;
    }
    
    .feature-card__description {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: var(--text-ivory-muted);
    }
    
    .audience-section {
      padding: var(--section-spacing) 0;
    }
    
    .audience-section__header {
      text-align: center;
      margin-bottom: 64px;
    }
    
    .audience-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
    }
    
    .audience-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .audience-card {
      background: var(--bg-card);
      border: 1px solid rgba(245, 243, 239, 0.06);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      transition: all 0.4s ease;
    }
    
    .audience-card:hover {
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-8px);
    }
    
    .audience-card__icon {
      font-size: 3rem;
      margin-bottom: 24px;
    }
    
    .audience-card__title {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--text-ivory);
      margin-bottom: 16px;
    }
    
    .audience-card__description {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--text-ivory-muted);
    }
    
    .differentiation-section {
      padding: var(--section-spacing) 0;
      background: var(--bg-secondary);
    }
    
    .differentiation-section__header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 64px;
    }
    
    .differentiation-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      margin-bottom: 32px;
    }
    
    .comparison-grid {
      max-width: 900px;
      margin: 0 auto 48px;
      display: grid;
      gap: 16px;
    }
    
    .comparison-item {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 24px;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid rgba(245, 243, 239, 0.06);
      border-radius: 12px;
      padding: 24px;
    }
    
    .comparison-item__brand {
      font-weight: 600;
      color: var(--text-ivory);
    }
    
    .comparison-item__description {
      color: var(--text-ivory-muted);
    }
    
    .seikira-difference {
      text-align: center;
      padding: 48px;
      background: linear-gradient(135deg, rgba(42, 157, 143, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%);
      border-radius: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .seikira-difference__title {
      font-family: var(--font-serif);
      font-size: 2rem;
      font-weight: 500;
      color: var(--text-ivory);
      margin-bottom: 24px;
    }
    
    .seikira-difference__chain {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--accent-teal);
      margin-bottom: 32px;
    }
    
    .seikira-difference__tags {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .difference-tag {
      padding: 12px 24px;
      background: var(--bg-card);
      border: 1px solid rgba(42, 157, 143, 0.3);
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--text-ivory);
    }
    
    .outcomes-section {
      padding: var(--section-spacing) 0;
    }
    
    .outcomes-section__header {
      text-align: center;
      margin-bottom: 64px;
    }
    
    .outcomes-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      margin-bottom: 24px;
    }
    
    .outcomes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .outcome-card {
      background: var(--bg-card);
      border: 1px solid rgba(245, 243, 239, 0.06);
      border-radius: 16px;
      padding: 32px;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .outcome-card:hover {
      border-color: rgba(212, 175, 55, 0.3);
      transform: translateY(-4px);
    }
    
    .outcome-card__icon {
      font-size: 2rem;
      margin-bottom: 16px;
    }
    
    .outcome-card__text {
      font-size: 0.9375rem;
      color: var(--text-ivory-muted);
    }
    
    .vision-section {
      padding: var(--section-spacing) 0;
      background: linear-gradient(135deg, rgba(42, 157, 143, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%);
    }
    
    .vision-section__content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .vision-section__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      margin-bottom: 40px;
    }
    
    .vision-statements {
      list-style: none;
      margin-bottom: 48px;
    }
    
    .vision-statements li {
      font-size: 1.25rem;
      line-height: 2;
      color: var(--text-ivory-muted);
    }
    
    .vision-tagline {
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--accent-teal);
    }
    
    .final-cta {
      padding: var(--section-spacing) 0;
      text-align: center;
    }
    
    .final-cta__title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 500;
      margin-bottom: 40px;
    }
    
    .final-cta__buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      .seikira-hero {
        padding: 120px 0 60px;
      }
      
      .seikira-hero__ctas {
        flex-direction: column;
        align-items: center;
      }
      
      .seikira-hero__ctas .btn {
        width: 100%;
        max-width: 320px;
      }
      
      .comparison-item {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .final-cta__buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .final-cta__buttons .btn {
        width: 100%;
        max-width: 320px;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header" id="header">
    <div class="container">
      <div class="header__inner">
        <a href="/" class="logo">Seikira</a>
        <nav class="nav">
          <ul class="nav__links">
            <li><a href="/product-couture" class="nav__link">Product Couture</a></li>
            <li><a href="/services" class="nav__link">Services</a></li>
            <li><a href="/certifications" class="nav__link">Certifications</a></li>
            <li><a href="/about" class="nav__link">About</a></li>
            <li><a href="#contact" class="nav__link">Contact</a></li>
          </ul>
          <a href="#contact" class="btn btn--outline">Request Access</a>
          <button class="nav__toggle" id="navToggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation -->
  <div class="overlay" id="overlay"></div>
  <nav class="mobile-nav" id="mobileNav">
    <button class="mobile-nav__close" id="mobileNavClose">&times;</button>
    <ul class="mobile-nav__links">
      <li><a href="/product-couture" class="mobile-nav__link">Product Couture</a></li>
      <li><a href="/services" class="mobile-nav__link">Services</a></li>
      <li><a href="/certifications" class="mobile-nav__link">Certifications</a></li>
      <li><a href="/about" class="mobile-nav__link">About</a></li>
      <li><a href="#contact" class="mobile-nav__link">Contact</a></li>
    </ul>
    <div class="mobile-nav__cta">
      <a href="#contact" class="btn btn--solid">Request Access</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="seikira-hero">
    <div class="container">
      <div class="seikira-hero__content animate-on-scroll">
        <h1 class="seikira-hero__headline">
          The Operating System for<br>
          <span>Economic Mobility</span>
        </h1>
        <p class="seikira-hero__problem">The workforce system is fragmented.</p>
        <p class="seikira-hero__solution">Seikira connects it.</p>
        <p class="seikira-hero__tagline">
          Barrier-aware AI. Employer-aligned pathways. Predictive retention analytics.
        </p>
        <p class="seikira-hero__tagline" style="color: var(--text-ivory-muted);">
          This is workforce intelligence infrastructure.
        </p>
        <div class="seikira-hero__ctas">
          <a href="#contact" class="btn btn--solid btn--lg">Request Enterprise Access</a>
          <a href="#features" class="btn btn--secondary btn--lg">Explore Seikira</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust Bar -->
  <section class="trust-logos">
    <div class="container">
      <p class="trust-logos__text">
        Trusted by nonprofits, employers, and workforce leaders building scalable mobility systems.
      </p>
      <div class="trust-logos__grid">
        <div class="trust-logo">Nonprofit Partner</div>
        <div class="trust-logo">Enterprise Employer</div>
        <div class="trust-logo">Workforce Board</div>
        <div class="trust-logo">Training Provider</div>
        <div class="trust-logo">State Agency</div>
      </div>
    </div>
  </section>

  <!-- Problem Section -->
  <section class="problem-section">
    <div class="container">
      <div class="problem-section__header animate-on-scroll">
        <h2 class="problem-section__title">
          The Workforce System Was Never Built for Intelligence
        </h2>
      </div>
      <ul class="problem-list animate-on-scroll">
        <li>Education platforms teach skills.</li>
        <li>Job boards list openings.</li>
        <li>Nonprofits track case notes.</li>
        <li>Employers hire without predictive insight.</li>
        <li>Workforce boards report outcomes after the fact.</li>
      </ul>
      <p class="problem-chain animate-on-scroll">
        No one connects:<br><br>
        <strong>Stability → Skill → Credential → Match → Retention → Wage Growth</strong>
      </p>
      <div class="problem-results">
        <div class="problem-result animate-on-scroll">
          <div class="problem-result__icon">📉</div>
          <div class="problem-result__text">Low completion rates</div>
        </div>
        <div class="problem-result animate-on-scroll">
          <div class="problem-result__icon">🔄</div>
          <div class="problem-result__text">High job churn</div>
        </div>
        <div class="problem-result animate-on-scroll">
          <div class="problem-result__icon">❓</div>
          <div class="problem-result__text">Weak employer confidence</div>
        </div>
        <div class="problem-result animate-on-scroll">
          <div class="problem-result__icon">📊</div>
          <div class="problem-result__text">Fragmented reporting</div>
        </div>
        <div class="problem-result animate-on-scroll">
          <div class="problem-result__icon">⚠️</div>
          <div class="problem-result__text">Limited long-term mobility</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Shift Section -->
  <section class="shift-section">
    <div class="container">
      <div class="shift-section__header animate-on-scroll">
        <h2 class="shift-section__title">
          Workforce Mobility Is a Predictive Intelligence Problem
        </h2>
        <p class="shift-section__subtitle">Training alone isn't enough.</p>
      </div>
      <div class="animate-on-scroll">
        <p style="text-align: center; font-size: 1.125rem; color: var(--text-ivory-muted); margin-bottom: 32px;">
          Workforce systems must:
        </p>
        <ul class="shift-requirements">
          <li>Account for systemic barriers</li>
          <li>Quantify readiness dynamically</li>
          <li>Align credentials to employer demand</li>
          <li>Predict retention before hiring</li>
          <li>Track wage growth longitudinally</li>
        </ul>
        <p class="shift-conclusion">Seikira builds the missing intelligence layer.</p>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section" id="features">
    <div class="container">
      <div class="features-section__header animate-on-scroll">
        <h2 class="features-section__title">Seikira Kinect</h2>
        <p class="features-section__subtitle">
          A multi-tenant workforce intelligence platform built for scalable economic mobility.
        </p>
      </div>
      <div class="features-grid">
        <div class="feature-card animate-on-scroll">
          <div class="feature-card__number">1</div>
          <h3 class="feature-card__title">Barrier-Aware Readiness Scoring</h3>
          <p class="feature-card__description">
            Structured assessments. Dynamic stabilization tracking. AI-adjusted mobility modeling.
          </p>
        </div>
        <div class="feature-card animate-on-scroll">
          <div class="feature-card__number">2</div>
          <h3 class="feature-card__title">Modular Credential & Pathway Ecosystems</h3>
          <p class="feature-card__description">
            Stackable, employer-aligned pathways with verifiable outcomes.
          </p>
        </div>
        <div class="feature-card animate-on-scroll">
          <div class="feature-card__number">3</div>
          <h3 class="feature-card__title">Employer Risk-Reduction Layer</h3>
          <p class="feature-card__description">
            Readiness scores. Skill alignment indexing. 90-day retention forecasting.
          </p>
        </div>
        <div class="feature-card animate-on-scroll">
          <div class="feature-card__number">4</div>
          <h3 class="feature-card__title">Mobility & Impact Analytics</h3>
          <p class="feature-card__description">
            Cohort dashboards. Retention tracking. Wage progression measurement. Regional rollups.
          </p>
        </div>
        <div class="feature-card animate-on-scroll">
          <div class="feature-card__number">5</div>
          <h3 class="feature-card__title">Enterprise Infrastructure</h3>
          <p class="feature-card__description">
            Hierarchical tenancy. API-first integrations. Secure, SOC 2-aligned architecture.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Audience Section -->
  <section class="audience-section">
    <div class="container">
      <div class="audience-section__header animate-on-scroll">
        <h2 class="audience-section__title">
          Built for the Organizations Powering Economic Mobility
        </h2>
      </div>
      <div class="audience-grid">
        <div class="audience-card animate-on-scroll">
          <div class="audience-card__icon">🟢</div>
          <h3 class="audience-card__title">Nonprofits & Training Providers</h3>
          <p class="audience-card__description">
            Turn programs into measurable mobility pipelines.
          </p>
        </div>
        <div class="audience-card animate-on-scroll">
          <div class="audience-card__icon">🔵</div>
          <h3 class="audience-card__title">Employers</h3>
          <p class="audience-card__description">
            Hire with confidence using predictive workforce intelligence.
          </p>
        </div>
        <div class="audience-card animate-on-scroll">
          <div class="audience-card__icon">🟣</div>
          <h3 class="audience-card__title">Workforce Boards & State Agencies</h3>
          <p class="audience-card__description">
            Modernize regional reporting and build statewide workforce infrastructure.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Differentiation Section -->
  <section class="differentiation-section">
    <div class="container">
      <div class="differentiation-section__header animate-on-scroll">
        <h2 class="differentiation-section__title">Most Platforms Solve One Stage.</h2>
      </div>
      <div class="comparison-grid animate-on-scroll">
        <div class="comparison-item">
          <div class="comparison-item__brand">Coursera</div>
          <div class="comparison-item__description">→ Education</div>
        </div>
        <div class="comparison-item">
          <div class="comparison-item__brand">Indeed</div>
          <div class="comparison-item__description">→ Job listings</div>
        </div>
        <div class="comparison-item">
          <div class="comparison-item__brand">Guild</div>
          <div class="comparison-item__description">→ Employer-sponsored learning</div>
        </div>
      </div>
      <div class="seikira-difference animate-on-scroll">
        <h3 class="seikira-difference__title">
          Seikira connects the entire mobility lifecycle in one intelligence layer.
        </h3>
        <p class="seikira-difference__chain">
          Stability → Skill → Credential → Match → Retention → Growth
        </p>
        <div class="seikira-difference__tags">
          <span class="difference-tag">Defensible</span>
          <span class="difference-tag">Scalable</span>
          <span class="difference-tag">Infrastructure</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Outcomes Section -->
  <section class="outcomes-section">
    <div class="container">
      <div class="outcomes-section__header animate-on-scroll">
        <h2 class="outcomes-section__title">From Placement to Sustained Growth</h2>
        <p style="text-align: center; font-size: 1.125rem; color: var(--text-ivory-muted);">
          With Seikira, organizations achieve:
        </p>
      </div>
      <div class="outcomes-grid">
        <div class="outcome-card animate-on-scroll">
          <div class="outcome-card__icon">✔</div>
          <div class="outcome-card__text">Higher completion rates</div>
        </div>
        <div class="outcome-card animate-on-scroll">
          <div class="outcome-card__icon">✔</div>
          <div class="outcome-card__text">Reduced hiring risk</div>
        </div>
        <div class="outcome-card animate-on-scroll">
          <div class="outcome-card__icon">✔</div>
          <div class="outcome-card__text">Improved 90-day retention</div>
        </div>
        <div class="outcome-card animate-on-scroll">
          <div class="outcome-card__icon">✔</div>
          <div class="outcome-card__text">Measurable wage progression</div>
        </div>
        <div class="outcome-card animate-on-scroll">
          <div class="outcome-card__icon">✔</div>
          <div class="outcome-card__text">Real-time impact reporting</div>
        </div>
        <div class="outcome-card animate-on-scroll">
          <div class="outcome-card__icon">✔</div>
          <div class="outcome-card__text">Compounding workforce intelligence data</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Vision Section -->
  <section class="vision-section">
    <div class="container">
      <div class="vision-section__content animate-on-scroll">
        <h2 class="vision-section__title">We Don't Just Train Talent.</h2>
        <ul class="vision-statements">
          <li>We quantify readiness.</li>
          <li>We reduce hiring risk.</li>
          <li>We predict retention.</li>
          <li>We measure mobility.</li>
        </ul>
        <p class="vision-tagline">
          Seikira is the operating system for economic mobility in underserved communities.
        </p>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="final-cta" id="contact">
    <div class="container">
      <div class="animate-on-scroll">
        <h2 class="final-cta__title">Ready to modernize workforce development?</h2>
        <div class="final-cta__buttons">
          <a href="#" class="btn btn--solid btn--lg">Request Enterprise Access</a>
          <a href="#" class="btn btn--outline btn--lg">Schedule a Strategic Demo</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <span class="footer__logo">Seikira by Product Couture</span>
        <span class="footer__copy">© 2025 Product Couture. All rights reserved.</span>
      </div>
    </div>
  </footer>

  <script src="/static/main.js"></script>
</body>
</html>
  `)
})

export default app
