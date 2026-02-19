# Seikira - Deployment Guide

## 🎯 Overview

Seikira is now built as a **pure static site** using standard Cloudflare Pages structure. No worker needed - just HTML, CSS, and JavaScript files.

## 📁 Project Structure

```
webapp/
├── public/                    # Source files
│   ├── index.html            # Main Seikira page
│   └── static/
│       ├── styles.css        # Design system
│       ├── main.js           # Basic interactions
│       └── seikira-advanced.js # Advanced animations
├── dist/                      # Build output (generated)
│   ├── index.html
│   ├── _headers              # Security headers
│   └── static/
├── build-static.sh            # Build script
├── ecosystem.config.cjs       # PM2 config (dev only)
└── package.json              # Simple deps (wrangler only)
```

## 🚀 Quick Start

### Development

```bash
# Build the static site
npm run build

# Start local dev server
npm run dev

# Or use PM2 (recommended)
pm2 start ecosystem.config.cjs

# Test it works
npm run test
# Should return: 200 OK
```

**Local URL**: http://localhost:3000

### Production Deployment

```bash
# Deploy to Cloudflare Pages
npm run deploy:prod

# Or manually:
npm run build
npx wrangler pages deploy dist --project-name webapp
```

## 🔧 Build Process

The `build-static.sh` script does:

1. **Clean** - Remove old dist directory
2. **Copy HTML** - Copy index.html to dist/
3. **Copy Assets** - Copy static/ directory to dist/static/
4. **Add Headers** - Create _headers file for security

```bash
./build-static.sh
```

## 📦 What Gets Deployed

```
dist/
├── index.html                 # Homepage (auto-served as /)
├── _headers                   # HTTP security headers
└── static/
    ├── styles.css            # 9.4KB - Design system
    ├── main.js               # 3.4KB - Basic interactions
    └── seikira-advanced.js   # 14.7KB - Advanced animations
```

**Total Size**: ~60KB (uncompressed)

## 🌐 Cloudflare Pages Configuration

### First-Time Setup

```bash
# 1. Setup Cloudflare API key
setup_cloudflare_api_key

# 2. Verify authentication
npx wrangler whoami

# 3. Create Pages project
npx wrangler pages project create webapp --production-branch main

# 4. Build and deploy
npm run deploy:prod
```

### Deployment Settings

**Build Configuration**:
- Build command: `./build-static.sh`
- Build output directory: `dist`
- Root directory: `/`
- Node version: Not needed (pure static)

**Environment Variables**: None required

### Custom Domain (Optional)

```bash
npx wrangler pages domain add yourdomain.com --project-name webapp
```

## 🔒 Security Headers

The `_headers` file includes:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/static/*
  Cache-Control: public, max-age=31536000, immutable
```

## ⚡ Performance

### Optimizations Applied

1. **Static Assets**: All files served from CDN edge
2. **Cache Headers**: 1-year cache for /static/*
3. **No Worker**: No runtime overhead
4. **Minimal Dependencies**: Only wrangler needed
5. **Inline Critical CSS**: Fast first paint
6. **Font Preconnect**: Google Fonts optimization

### Expected Performance

- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Lighthouse Score**: 95+

## 🔄 Workflow

### Local Development

```bash
# 1. Make changes to public/index.html or public/static/*
# 2. Rebuild
npm run build

# 3. Refresh browser (if server running)
# or restart server
pm2 restart webapp
```

### Git Workflow

```bash
# Stage changes
git add .

# Commit
npm run git:commit "Your message"

# Push to GitHub (if configured)
git push origin main
```

### Deploy to Production

```bash
# Option 1: Quick deploy
npm run deploy:prod

# Option 2: Manual steps
npm run build
npx wrangler pages deploy dist --project-name webapp

# Option 3: Via GitHub integration
# Push to main branch - auto-deploys
git push origin main
```

## 📊 Monitoring

### Check Deployment Status

```bash
# List deployments
npx wrangler pages deployment list --project-name webapp

# View logs
npx wrangler pages deployment tail
```

### Analytics

Cloudflare Web Analytics automatically available at:
https://dash.cloudflare.com/[account-id]/pages/view/webapp/analytics

## 🐛 Troubleshooting

### Build Fails

```bash
# Check file permissions
ls -la build-static.sh
# Should be: -rwxr-xr-x

# Make executable if needed
chmod +x build-static.sh

# Run build manually
./build-static.sh
```

### Deployment Fails

```bash
# Check authentication
npx wrangler whoami

# If not authenticated, setup again
setup_cloudflare_api_key

# Check project exists
npx wrangler pages project list
```

### Assets Not Loading

```bash
# Verify dist structure
ls -la dist/
ls -la dist/static/

# Should see:
# dist/index.html
# dist/_headers
# dist/static/styles.css
# dist/static/main.js
# dist/static/seikira-advanced.js
```

### Local Server Issues

```bash
# Clean port
npm run clean-port

# Restart PM2
pm2 restart webapp

# Or stop and start fresh
pm2 delete webapp
pm2 start ecosystem.config.cjs

# Check PM2 logs
pm2 logs webapp --nostream
```

## 🎨 Adding New Pages

To add additional pages (e.g., Product Couture page):

```bash
# 1. Create HTML file
cat > public/about.html << 'HTML'
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/static/styles.css">
</head>
<body>
  <h1>About Page</h1>
  <script src="/static/main.js"></script>
</body>
</html>
HTML

# 2. Update build script
# Add to build-static.sh:
# cp public/about.html dist/

# 3. Rebuild and deploy
npm run build
npm run deploy:prod
```

New page will be available at: `/about.html` or `/about`

## 📝 Environment-Specific Notes

### Sandbox Development
- PM2 automatically restarts on changes
- Port 3000 is standard
- Public URL via GetServiceUrl

### Production
- Deployed to Cloudflare's global CDN
- HTTPS automatic
- Custom domains supported
- No server management needed

## 🔗 URLs

**Development**: http://localhost:3000  
**Sandbox**: https://3000-i7ff7snylez9snp6bbi28-cc2fbc16.sandbox.novita.ai  
**Production**: https://webapp.pages.dev (or custom domain)

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test locally with `npm run dev`
- [ ] Verify all animations work
- [ ] Check responsive design (mobile/tablet/desktop)
- [ ] Test all links and navigation
- [ ] Review _headers security settings
- [ ] Commit all changes to git
- [ ] Setup Cloudflare API key
- [ ] Create Pages project
- [ ] Deploy with `npm run deploy:prod`
- [ ] Verify production URL works
- [ ] Test all pages in production
- [ ] Check analytics dashboard

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/commands/)
- [Seikira Redesign Docs](./SEIKIRA_REDESIGN.md)
- [Project README](./README.md)

---

**Last Updated**: 2025-02-19  
**Status**: ✅ Fully Functional - Ready for Production
