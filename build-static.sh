#!/bin/bash
# Build script for standard Cloudflare Pages structure

echo "🔨 Building static site for Cloudflare Pages..."

# Clean dist directory
rm -rf dist
mkdir -p dist

# Copy HTML files
echo "📄 Copying HTML files..."
cp public/index.html dist/

# Copy static assets
echo "📦 Copying static assets..."
cp -r public/static dist/

# Create _headers file for security and caching
echo "🔒 Creating _headers file..."
cat > dist/_headers << 'HEADERS'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/static/*
  Cache-Control: public, max-age=31536000, immutable
HEADERS

echo "✅ Build complete! Output in dist/"
ls -lah dist/
