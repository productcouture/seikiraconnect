# Seikira - Workforce Intelligence Infrastructure

**The Operating System for Economic Mobility**

Seikira is a comprehensive workforce intelligence platform connecting underserved talent to sustainable careers through barrier-aware pathways, employer alignment, and real-time retention analytics.

---

## 🌐 Live Sites

- **Development**: https://3000-i7ff7snylez9snp6bbi28-cc2fbc16.sandbox.novita.ai
- **Production**: Coming soon (deploy to Cloudflare Pages)

---

## 📋 Site Structure

### **Complete Pages** (8 Total)

| Page | Path | Description | Size |
|------|------|-------------|------|
| **Homepage** | `/` | Audience split, platform overview, architecture | 52 KB |
| **Kinect** | `/kinect/` | Main enterprise platform page | 28 KB |
| **Spark Youth** | `/kinect/spark-youth` | Youth-focused development pathways | 38 KB |
| **Enterprise** | `/enterprise.html` | Infrastructure, API, integrations | 33 KB |
| **Security** | `/security.html` | Compliance, encryption, audit logging | 38 KB |
| **About** | `/about.html` | Company mission, values, team | 18 KB |
| **Contact** | `/contact.html` | Contact form, FAQ, office hours | 20 KB |
| **Product Couture** | `/product-couture.html` | Design studio showcase | 15 KB |

**Total**: 242 KB of content across 8 pages

---

## 🎨 Design System

### **Colors**
- **Teal** `#2a9d8f` - Primary enterprise color
- **Gold** `#d4af37` - Accent/secondary features
- **Dark** `#0a0a0c` - Background
- **Ivory** `#f5f3ef` - Text

### **Typography**
- **Headings**: JetBrains Mono (tech/stats), Inter (general)
- **Body**: Inter
- **Monospace**: JetBrains Mono (code, metrics)

### **Components**
- Glassmorphism cards
- Custom cursor with bubble follower
- Scroll animations (fade, slide, stagger)
- Magnetic buttons
- Sound effects (with toggle)
- Smooth page transitions

---

## 🏗️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, responsive design
- **Vanilla JavaScript** - No framework dependencies
- **CDN Libraries**:
  - Tailwind CSS
  - Font Awesome Icons
  - Chart.js (for data visualizations)
  - Axios (HTTP client)

### **Deployment**
- **Platform**: Cloudflare Pages (static site)
- **Build Tool**: Custom bash script (`build-static.sh`)
- **Process Manager**: PM2 (development)
- **Static Server**: Wrangler Pages Dev

### **Version Control**
- **Git**: Full commit history
- **GitHub**: productcouture/seikiraconnect
- **Branch**: main

---

## 📁 Project Structure

```
seikira/
├── public/                    # Source files
│   ├── index.html            # Homepage (52 KB)
│   ├── about.html            # About page
│   ├── contact.html          # Contact form
│   ├── enterprise.html       # Enterprise infrastructure
│   ├── security.html         # Security & compliance
│   ├── product-couture.html  # Design studio
│   ├── kinect/               # Kinect pages
│   │   ├── index.html        # Main Kinect page
│   │   └── spark-youth.html  # Youth-focused page
│   └── static/               # Assets
│       ├── styles.css        # Main stylesheet (9.4 KB)
│       ├── scroll-animations.js  # Animation system (11 KB)
│       ├── data-viz.js       # Chart.js visualizations
│       ├── page-router.js    # Page transitions
│       ├── sound-effects.js  # Audio effects
│       └── seikira-advanced.js   # Advanced interactions
├── dist/                     # Build output (generated)
├── build-static.sh           # Build script
├── ecosystem.config.cjs      # PM2 configuration
├── package.json             # Dependencies & scripts
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/productcouture/seikiraconnect.git
cd seikiraconnect

# Install dependencies
npm install

# Build the site
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Test locally
curl http://localhost:3000
```

### **Development Scripts**

```bash
# Build static site
npm run build

# Start dev server (sandbox)
npm run dev:sandbox

# Clean port 3000
npm run clean-port

# Test server
npm run test

# Git shortcuts
npm run git:status
npm run git:log
npm run git:commit "Your message"
```

---

## 🌐 Deployment

### **Deploy to Cloudflare Pages**

1. **Install Wrangler**:
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Build the site**:
```bash
npm run build
```

4. **Deploy**:
```bash
npm run deploy:prod
# Or manually:
wrangler pages deploy dist --project-name seikira
```

Your site will be live at: `https://seikira.pages.dev`

---

## 🎯 Key Features

### **Homepage**
- Audience split (Enterprise vs Youth Programs)
- Platform architecture overview
- 6 core capability cards
- Network visualization
- Comparison table
- Impact metrics (500K+ lives, 90% retention, 113% wage increase)

### **Enterprise Page**
- Multi-tenant architecture
- RESTful API documentation
- 30+ integration partners
- Performance metrics (99.99% uptime, <200ms response)
- Enterprise support offerings

### **Security Page**
- SOC 2 Type II, GDPR, HIPAA compliance
- Bank-level encryption (AES-256, TLS 1.3)
- Zero-trust architecture
- AI anomaly detection
- Business continuity (15min backups, <4hrs RTO)

### **Kinect Platform**
- Barrier-aware readiness scoring
- Modular credential ecosystems
- Employer risk-reduction
- Mobility & impact analytics
- AI-powered matching

### **Spark Youth**
- Youth-focused development pathways
- Barrier-aware intelligence
- Stackable credentials
- Retention tracking

---

## 🎨 Interactive Features

### **Custom Cursor** (Desktop only)
- Small teal dot following mouse
- Larger bubble circle with smooth delay
- Hover animations on interactive elements
- Mix-blend-mode color effects

### **Scroll Animations**
- Fade-in effects
- Slide animations (left/right)
- Stagger containers
- Parallax effects
- Scroll progress bar

### **Sound Effects** (Optional)
- Hover sounds
- Click feedback
- Success/error notifications
- Whoosh transitions
- Toggle on/off with button

### **Magnetic Buttons**
- Buttons attract cursor on hover
- Smooth spring animations
- Enhanced interactivity

---

## 📊 Performance

### **Metrics**
- **Bundle Size**: ~375 KB total (uncompressed)
- **HTML**: 242 KB (8 pages)
- **CSS**: 9.4 KB (styles.css)
- **JavaScript**: ~60 KB (all scripts)
- **Target**: < 1s First Contentful Paint, < 2s Time to Interactive

### **Optimization**
- CDN-hosted libraries
- Minimal dependencies
- Optimized animations (60 FPS)
- Lazy loading ready
- Responsive images ready

---

## 🔧 Configuration

### **PM2 Configuration** (`ecosystem.config.cjs`)
```javascript
module.exports = {
  apps: [{
    name: 'webapp',
    script: 'npx',
    args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
}
```

### **Build Script** (`build-static.sh`)
- Copies HTML files
- Copies static assets
- Creates security headers (`_headers`)
- Generates dist/ directory

---

## 📝 Git History

### **Recent Commits**
```
19c30a8 - Fix custom cursor: add cursor: none to body when custom cursor is active
fad6b48 - Add documentation for Enterprise and Security pages
1b70e9a - Add Enterprise Infrastructure and Security & Compliance pages
d6539b2 - Add implementation completion documentation
f479546 - Reorganize kinect.html to kinect/index.html for proper routing
35b0d95 - Add Platform Architecture section with 6 capability cards
03e80eb - feat: New homepage with audience split and product hero
```

**Total Commits**: 20+ commits with full project history

---

## 🤝 Contributing

This is a private project for Product Couture. For questions or collaboration:
- **GitHub**: https://github.com/productcouture/seikiraconnect
- **Contact**: Use the contact form at `/contact.html`

---

## 📄 License

Proprietary - © 2025 Product Couture. All rights reserved.

---

## 🎉 Status

**Current Status**: ✅ Complete - All 8 pages built and functional

**Next Steps**:
- [ ] Deploy to Cloudflare Pages production
- [ ] Add real partner logos
- [ ] Integrate live Chart.js visualizations
- [ ] Add real team photos
- [ ] Implement analytics tracking
- [ ] SEO optimization (meta tags, sitemap)

---

**Built with care by Product Couture** 🎨
