# PosturePro - Deployment Guide

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

**Important:** The app requires HTTPS for camera access. In development, localhost works, but for production deployment you MUST use HTTPS.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the platform created by Next.js developers and offers the best integration.

1. **Push your code to GitHub** (already done!)

2. **Sign up for Vercel**
   - Go to https://vercel.com
   - Sign up with your GitHub account

3. **Import your repository**
   - Click "New Project"
   - Select your PosturePRO repository
   - Vercel will auto-detect Next.js settings

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes for build
   - You'll get a live URL: `posture-pro-xxx.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., posturepro.app)
   - Follow DNS configuration instructions

**Vercel automatically provides:**
- HTTPS/SSL certificates
- CDN for fast global delivery
- Automatic deployments on git push
- Free tier: 100GB bandwidth/month

### Option 2: Netlify

Similar to Vercel, great for static sites and Next.js.

1. **Sign up at https://netlify.com**

2. **Import from GitHub**
   - Click "Add new site" → "Import from Git"
   - Select your repository

3. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js

4. **Deploy**
   - Click "Deploy site"
   - Get URL: `posture-pro-xxx.netlify.app`

### Option 3: Self-Hosted (VPS)

For more control, deploy to your own server.

**Requirements:**
- Ubuntu 22.04+ server
- Node.js 18+
- Nginx
- SSL certificate (Let's Encrypt)

**Steps:**

1. **Prepare server**
```bash
# SSH into your server
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Clone and build**
```bash
git clone https://github.com/YourUsername/PosturePRO.git
cd PosturePRO
npm install
npm run build
```

3. **Start with PM2**
```bash
pm2 start npm --name "posturepro" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name posturepro.app www.posturepro.app;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Get SSL certificate**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d posturepro.app -d www.posturepro.app
```

### Option 4: Docker

**Dockerfile** (create this file):
```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t posturepro .
docker run -p 3000:3000 posturepro
```

## Environment Variables

For production, create a `.env.local` file:

```env
# Analytics (optional - add PostHog or Plausible later)
# NEXT_PUBLIC_POSTHOG_KEY=your_key_here

# Future: Database connection (when adding user accounts)
# DATABASE_URL=postgresql://...

# Future: Email service (for reminders)
# SENDGRID_API_KEY=your_key_here
```

## Performance Optimization

### 1. Enable Static Optimization
The app is already configured for static optimization where possible.

### 2. CDN for AI Models
MediaPipe models are loaded from CDN (jsDelivr) for fast global access.

### 3. Image Optimization
If you add images in the future, use Next.js `<Image>` component.

### 4. Bundle Analysis
```bash
npm install @next/bundle-analyzer
```

Add to `next.config.js`:
```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Run: `ANALYZE=true npm run build`

## Monitoring & Analytics

### Add Privacy-Preserving Analytics (Recommended)

**Option A: Plausible** (GDPR-compliant, no cookies)
1. Sign up at https://plausible.io
2. Add script to `app/layout.tsx`:
```tsx
<Script
  defer
  data-domain="posturepro.app"
  src="https://plausible.io/js/script.js"
/>
```

**Option B: PostHog** (Open-source, privacy-focused)
1. Sign up at https://posthog.com
2. Install: `npm install posthog-js`
3. Add to app (see PostHog docs)

### Error Monitoring

**Sentry** (recommended for production):
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Security Checklist

- [x] HTTPS enabled (required for camera access)
- [x] Content Security Policy headers (add to `next.config.js`)
- [x] Privacy policy and terms of use
- [x] No video data stored on servers
- [ ] Rate limiting (add if API routes are added)
- [ ] DDoS protection (Cloudflare recommended)

### Add Security Headers

Update `next.config.js`:
```js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## Testing Before Launch

1. **Browser Compatibility**
   - Chrome/Edge (Chromium): ✓ Best support
   - Firefox: Test pose detection
   - Safari: Test camera access

2. **Device Testing**
   - Desktop (Windows/Mac)
   - Mobile (iOS Safari, Android Chrome)
   - Different screen sizes

3. **Camera Scenarios**
   - Different lighting conditions
   - Various camera positions
   - Multiple pose angles

4. **Performance Testing**
   - Test on lower-end devices
   - Check frame rate (should be 20-30 FPS)
   - Monitor CPU usage

## Post-Launch Tasks

1. **Set up analytics** (Plausible or PostHog)
2. **Monitor errors** (Sentry)
3. **Collect user feedback** (add feedback form)
4. **A/B testing** (test different posture thresholds)
5. **SEO optimization**
   - Add meta descriptions
   - Create sitemap
   - Submit to Google Search Console

## Scaling Considerations

When you reach 10K+ users:

1. **Add Database** (Supabase or PostgreSQL)
   - User accounts
   - Progress tracking
   - Session history

2. **Add Backend API**
   - Aggregated analytics
   - Premium features
   - Reminder system

3. **CDN Optimization**
   - Cloudflare for additional caching
   - Image optimization

4. **Native Mobile Apps**
   - React Native for code reuse
   - Or native Swift/Kotlin for better performance

## Cost Estimates

### MVP (Free Tier)
- Hosting: Vercel free (100GB bandwidth)
- Domain: $12/year (namecheap.com)
- **Total: ~$1/month**

### Growing (1K users)
- Hosting: Vercel Pro $20/month
- Analytics: Plausible $9/month
- Domain: $12/year
- **Total: ~$30/month**

### Scaling (10K+ users)
- Hosting: Vercel Pro $20/month (or custom)
- Database: Supabase $25/month
- Analytics: Plausible $19/month
- CDN: Cloudflare (free or $20/month)
- Error Monitoring: Sentry $26/month
- **Total: ~$100-150/month**

## Support

For deployment issues:
- Next.js docs: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- MediaPipe issues: https://github.com/google/mediapipe

## Next Steps

See `NEXT_STEPS.md` for feature roadmap and enhancement ideas.
