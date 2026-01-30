# Ana's Beauty Lab - Ultra-Luxury Website

An ultra-luxury, scrollytelling web experience for Ana's Beauty Lab, a Houston-based premium esthetician. Features physics-based animations, iOS glassmorphism aesthetic, and high-conversion business logic.

## Features

### Animation Engine ("Jet" Concept)
- **Physics-Based Scroll**: Lenis smooth scroll with weightless motion
- **Expanding Portal Hero**: Organic lens that scales on scroll
- **Magnetic Parallax**: Layered depth with text/images moving at different speeds
- **Horizontal Service Strips**: Spring-physics expand on hover/tap

### Visual Architecture ("Editorial Luxury")
- **BL Monogram Logo**: Elegant B|L monogram with vertical divider
- **iOS Glassmorphism**: Frosted glass navigation and modals
- **Gyroscope Backgrounds**: Gradient mesh responding to device movement
- **Monochrome Editorial Palette**: Clean black, white & gray with sophisticated gold accents
- **Luxury Typography**: Cormorant Garamond display with Montserrat body text

### High-Conversion Features
- **One-Tap Navigation**: Apple/Google Maps integration
- **Floating Booking Pill**: Native app-style booking drawer
- **Cinemagraphs**: Lightweight video elements for fast load speeds

### SEO/AEO/GEO Optimization
- **Schema.org**: LocalBusiness and BeautySalon structured data
- **AEO Content**: Beauty Intelligence FAQ for AI search engines
- **GEO-Tagged Images**: All alt-text includes "Houston TX"

## Project Structure

```
anasbeautylab/
├── index.html              # Main HTML with Schema.org markup
├── css/
│   ├── main.css           # Core styles, glassmorphism, iOS aesthetic
│   └── animations.css     # GSAP animation initial states
├── js/
│   ├── lenis-init.js      # Physics-based smooth scroll engine
│   ├── animations.js      # GSAP ScrollTrigger animations
│   ├── booking.js         # Floating pill & booking drawer
│   └── gyroscope.js       # Device motion responsive backgrounds
└── assets/
    ├── images/            # Place for image assets
    └── videos/            # Place for cinemagraphs
```

## Setup Instructions

1. **Add Assets**: Place your images in `assets/images/` and cinemagraphs in `assets/videos/`
   - Recommended image sizes: 1920x1080 (hero), 800x1000 (about), 600x400 (services)
   - Cinemagraphs: 1080p MP4, under 2MB each

2. **Update Content**:
   - Studio address in `index.html` (lines 533-534)
   - Phone number in `index.html` (line 28)
   - Email in `index.html` (line 29)
   - Social media links in footer (lines 574-581)
   - Booking URL in drawer (line 616)

3. **Customize Colors**:
   - Edit CSS variables in `css/main.css` (lines 11-35)
   - Default: Champagne (#f5e6d3), Blush (#e8d5c4), Rose Gold (#d4a574)

4. **SEO Customization**:
   - Update meta descriptions (lines 8-9)
   - Modify FAQ content in Beauty Intelligence section (lines 558-592)
   - Adjust Schema.org data (lines 30-66)

## Image Requirements

### Required Images
Place these in `assets/images/`:

- `hero-poster.jpg` - Portal video poster (1920x1080)
- `ana-portrait.jpg` - About section portrait (800x1000)
- `facial-service.jpg` - Signature facial (600x400)
- `lash-service.jpg` - Lash lift service (600x400)
- `peel-service.jpg` - Chemical peel service (600x400)
- `micro-service.jpg` - Microdermabrasion service (600x400)
- `gallery-1.jpg` through `gallery-3.jpg` - Gallery images (various sizes)
- `og-image.jpg` - Open Graph social image (1200x630)

### Required Videos
Place these in `assets/videos/`:

- `serum-cinemagraph.mp4` - Serum/texture footage for hero (1080p, looped)
- `steam-cinemagraph.mp4` - Rising steam for gallery (1080p, looped)

## Technical Details

### Dependencies (CDN)
- GSAP 3.12.2 + ScrollTrigger + Flip
- Lenis 1.1.13 (Smooth scroll)
- Lucide Icons (Latest)
- Google Fonts: Cormorant Garamond + Montserrat

### Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### Performance Optimizations
- Lazy loading on images
- Passive event listeners
- Reduced motion support
- Mobile-optimized animations
- Intersection Observer for scroll triggers

## Customization Guide

### Changing the Color Palette

Edit CSS variables in `css/main.css`:

```css
:root {
    /* Monochrome Editorial Palette */
    --color-pure-white: #ffffff;   /* Primary background */
    --color-off-white: #fafafa;    /* Secondary background */
    --color-light-gray: #f5f5f5;   /* Tertiary background */
    --color-text-primary: #1a1a1a; /* Headings/CTAs */
    --color-text-secondary: #333333; /* Body text */
    --color-text-muted: #666666;   /* Secondary text */
    
    /* Luxury Accent - Matches BL Monogram */
    --color-gold: #c9a962;         /* Primary accent */
    --color-gold-light: #d4b978;   /* Hover accent */
}
```

### Modifying Services

Edit in `index.html`, service strips (lines 208-344):

```html
<article class="service-strip" data-service="your-service-name">
    <div class="strip-preview">
        <span class="strip-number">05</span>
        <h3 class="strip-title">Your Service Name</h3>
        <span class="strip-duration">60 min</span>
    </div>
    <!-- Expanded content -->
</article>
```

### Adjusting Animation Speed

Edit in `js/lenis-init.js`:

```javascript
const lenis = new Lenis({
    duration: 1.2,        // Lower = faster (default: 1.2)
    easing: (t) => ...   // Custom easing function
});
```

## SEO Checklist

- [ ] Update business name in Schema.org (line 33)
- [ ] Add correct address (lines 38-44)
- [ ] Update phone number (line 37)
- [ ] Add business hours (lines 46-57)
- [ ] Update social media URLs (lines 63-65)
- [ ] Customize FAQ content for local keywords
- [ ] Add real client testimonials
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Business Profile

## Analytics Setup

Add Google Analytics 4 tracking code before closing `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## License

This project is created for Ana's Beauty Lab. All rights reserved.

## Support

For technical support or customizations, contact your web developer.

---

**Live Preview**: Open `index.html` in a modern web browser
**Hosting**: Upload all files to your web server or static hosting (Netlify, Vercel, etc.)
