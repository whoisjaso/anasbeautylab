# Deployment Checklist for Ana's Beauty Lab Website

## Pre-Launch Tasks

### Content Review
- [ ] Update business name in all locations
- [ ] Verify address is correct (11718 Teaneck Dr, Houston, TX 77089)
- [ ] Update phone number: (832) 696-3965
- [ ] Update email: hello@anasbeautyylab.com
- [ ] Verify all social media links work
- [ ] Update booking URL in the drawer

### Assets
- [ ] Add hero-poster.jpg to assets/images/
- [ ] Add ana-portrait.jpg to assets/images/
- [ ] Add all service images (4 total)
- [ ] Add gallery images (3-5 total)
- [ ] Add og-image.jpg for social sharing
- [ ] Add cinemagraph videos (2 total)
- [ ] Optimize all images for web (compress)
- [ ] Test all images load correctly

### SEO & Analytics
- [ ] Add Google Analytics 4 tracking code
- [ ] Set up Google Search Console
- [ ] Create XML sitemap
- [ ] Submit sitemap to Google
- [ ] Verify Schema.org markup with Google's Rich Results Test
- [ ] Update meta descriptions for each page
- [ ] Add Open Graph image

### Technical Testing
- [ ] Test on iOS Safari (iPhone)
- [ ] Test on iOS Safari (iPad)
- [ ] Test on Android Chrome
- [ ] Test on Desktop Chrome
- [ ] Test on Desktop Safari
- [ ] Test on Desktop Firefox
- [ ] Verify mobile responsiveness
- [ ] Check loading speed (aim for < 3 seconds)
- [ ] Test all booking CTAs
- [ ] Test map navigation button
- [ ] Verify service strips expand/collapse
- [ ] Check Lenis smooth scroll works
- [ ] Test accessibility (keyboard navigation)
- [ ] Verify reduced motion preference respected

### Performance Optimization
- [ ] Enable gzip compression on server
- [ ] Set up browser caching headers
- [ ] Optimize images (WebP format if possible)
- [ ] Minify CSS and JS (optional for this project)
- [ ] Test with slow 3G connection

### Security
- [ ] Enable HTTPS (SSL certificate)
- [ ] Add security headers
- [ ] Check for mixed content warnings

## Post-Launch Tasks

### Immediate (Day 1)
- [ ] Test live site on mobile device
- [ ] Submit site to Google Search Console
- [ ] Verify Google Analytics is receiving data
- [ ] Test booking flow end-to-end
- [ ] Check all contact forms/links

### Week 1
- [ ] Monitor site performance in Google Analytics
- [ ] Check for 404 errors
- [ ] Verify local SEO (search "esthetician Houston")
- [ ] Test on various devices
- [ ] Get feedback from 3-5 users

### Month 1
- [ ] Review Google Search Console for issues
- [ ] Check page speed insights
- [ ] Monitor Core Web Vitals
- [ ] Update content based on user feedback
- [ ] Add new photos from recent work

## Domain Setup

1. Purchase domain (e.g., anasbeautylab.com)
2. Point domain to hosting
3. Set up SSL certificate
4. Configure www redirect
5. Set up email forwarding

## Hosting Options

### Recommended
- **Netlify**: Free tier, easy deployment, built-in forms
- **Vercel**: Free tier, excellent performance
- **Cloudflare Pages**: Free, fast global CDN

### Upload Instructions
1. Zip all files (excluding node_modules if any)
2. Upload via hosting dashboard
3. Verify all assets load correctly
4. Set custom domain
5. Enable SSL/HTTPS

## Emergency Contacts

- Web Developer: [Your contact]
- Hosting Support: [Hosting provider support]
- Domain Registrar: [Registrar support]

---

## Quick Commands

### If using Netlify CLI
```bash
netlify deploy --prod --dir=.
```

### If using Vercel CLI
```bash
vercel --prod
```

### Manual FTP (if needed)
Upload all files except:
- .git/
- node_modules/
- README.md
- .gitignore
