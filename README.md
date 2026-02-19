# Seikira | The Operating System for Economic Mobility

A bold and visionary web presence for Seikira, Product Couture's enterprise workforce intelligence platform. Built with Hono framework and designed for Cloudflare Pages deployment.

## Project Overview

- **Name**: Seikira Webapp
- **Goal**: Showcase Seikira as workforce intelligence infrastructure connecting the entire economic mobility lifecycle
- **Tech Stack**: Hono + TypeScript + Cloudflare Pages + Vite

## URLs

- **Development**: https://3000-i7ff7snylez9snp6bbi28-cc2fbc16.sandbox.novita.ai
- **Production**: (To be deployed)

## Features Completed

### Homepage (Seikira-focused - Option C)
- ✅ Bold hero section with "Operating System for Economic Mobility" messaging
- ✅ Problem section highlighting workforce system fragmentation
- ✅ Shift section positioning workforce mobility as predictive intelligence
- ✅ Features section showcasing Seikira Kinect's 5 core capabilities
- ✅ Audience section targeting nonprofits, employers, and workforce boards
- ✅ Differentiation section comparing Seikira to platforms like Coursera, Indeed, Guild
- ✅ Outcomes section demonstrating measurable results
- ✅ Vision section with powerful closing statement
- ✅ Trust bar with partner logos
- ✅ Comprehensive CTAs throughout

### Design System
- ✅ Comprehensive CSS design tokens (colors, typography, spacing, transitions)
- ✅ Responsive mobile-first design
- ✅ Smooth scroll animations with Intersection Observer
- ✅ Mobile navigation with off-canvas menu
- ✅ Sticky header with scroll effects
- ✅ Professional typography with Playfair Display + Inter

### Technical Implementation
- ✅ Hono backend with static file serving
- ✅ Vite build system for Cloudflare Pages
- ✅ PM2 daemon process management
- ✅ Git version control with comprehensive .gitignore
- ✅ Shared JavaScript for interactive elements

## Features Not Yet Implemented

- [ ] Product Couture secondary page (/product-couture)
- [ ] Services page (/services)
- [ ] Certifications page (/certifications)
- [ ] About page (/about)
- [ ] Contact form functionality
- [ ] Blog/Insights section
- [ ] CMS integration for content management
- [ ] Advanced animations and micro-interactions
- [ ] SEO meta tags optimization
- [ ] Analytics integration

## Data Architecture

- **Static Files**: Served from `public/static/` directory
- **Styles**: `public/static/styles.css` - Complete design system
- **JavaScript**: `public/static/main.js` - Shared interactive functionality
- **Backend**: Hono app in `src/index.tsx` - SSR rendering

## Development Workflow

### Local Development

```bash
# Install dependencies (already done)
npm install

# Build the project
npm run build

# Start development server with PM2
pm2 start ecosystem.config.cjs

# Test the server
curl http://localhost:3000

# Check PM2 logs
pm2 logs webapp --nostream

# Restart server
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart webapp
```

### Git Commands

```bash
# Check status
npm run git:status

# Commit changes
npm run git:commit "Your commit message"

# View commit history
npm run git:log
```

### Clean Port (if needed)

```bash
npm run clean-port
```

## Deployment to Cloudflare Pages

### Prerequisites
1. Call `setup_cloudflare_api_key` to configure authentication
2. Ensure `cloudflare_project_name` is set in meta_info

### Deploy

```bash
# Build and deploy
npm run deploy:prod
```

## Recommended Next Steps

1. **Add Additional Pages**: Create /product-couture, /services, /certifications, /about routes
2. **Contact Form**: Implement form handling with Cloudflare Workers
3. **Content Management**: Add CMS integration for easier content updates
4. **SEO Optimization**: Add meta tags, OpenGraph, structured data
5. **Analytics**: Integrate Cloudflare Web Analytics or Google Analytics
6. **Performance**: Optimize images, add lazy loading
7. **Accessibility**: Add ARIA labels, keyboard navigation improvements
8. **Testing**: Add E2E tests with Playwright

## Design Philosophy

- **Bold & Visionary**: Strong, authoritative messaging positioning Seikira as infrastructure
- **Barrier-Aware**: Emphasizes understanding of systemic challenges
- **Intelligence-First**: Focuses on predictive analytics and data-driven outcomes
- **Enterprise-Grade**: Professional aesthetic suitable for B2B enterprise sales
- **Teal + Gold**: Brand colors representing innovation (teal) and premium quality (gold)

## Project Structure

```
webapp/
├── src/
│   ├── index.tsx          # Main Hono app with Seikira homepage
│   └── renderer.tsx       # JSX renderer (not currently used)
├── public/
│   └── static/
│       ├── styles.css     # Complete design system
│       ├── style.css      # (Auto-generated, can be removed)
│       └── main.js        # Shared JavaScript
├── dist/                  # Build output (generated)
├── ecosystem.config.cjs   # PM2 configuration
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── wrangler.jsonc         # Cloudflare configuration
└── README.md              # This file
```

## Tech Stack Details

- **Framework**: Hono 4.12.0
- **Runtime**: Cloudflare Workers
- **Build**: Vite 6.3.5
- **Deployment**: Wrangler 4.4.0
- **Process Manager**: PM2
- **Fonts**: Google Fonts (Playfair Display, Inter)

## Status

- **Platform**: Cloudflare Pages
- **Status**: ✅ Active (Development)
- **Last Updated**: 2025-02-19

## Support

For questions or issues, contact the Product Couture development team.

---

**Seikira by Product Couture** | © 2025 All rights reserved.
