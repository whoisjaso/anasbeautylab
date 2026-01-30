/**
 * ANA'S BEAUTY LAB - Video Lightbox & UI Enhancements
 * iOS-compatible video player and image fallbacks
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // VIDEO LIGHTBOX SYSTEM
    // ============================================
    
    const videos = document.querySelectorAll('video');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'video-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-container">
            <button class="lightbox-close" aria-label="Close video">
                <i data-lucide="x"></i>
            </button>
            <div class="lightbox-video-wrapper">
                <video controls playsinline></video>
            </div>
            <div class="lightbox-title"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxVideo = lightbox.querySelector('video');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');
    
    // Open lightbox
    videos.forEach(video => {
        // Add click handler
        video.style.cursor = 'pointer';
        
        video.addEventListener('click', function(e) {
            // Don't open if clicking controls
            if (e.target.paused === false) return;
            
            const source = this.querySelector('source');
            if (!source) return;
            
            // Set video source
            lightboxVideo.src = source.src;
            lightboxVideo.poster = this.poster || '';
            
            // Get caption if available
            const caption = this.closest('.gallery-item, .featured-video-container, .studio-item')?.querySelector('.gallery-caption, .caption-title, .studio-caption')?.textContent || '';
            lightboxTitle.textContent = caption;
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Play video (with iOS compatibility)
            setTimeout(() => {
                lightboxVideo.play().catch(() => {
                    // Autoplay blocked, user must click play
                    console.log('Autoplay blocked, waiting for user interaction');
                });
            }, 300);
            
            // Re-initialize icons
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });
    
    // Close lightbox functions
    const closeLightbox = () => {
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Swipe down to close (mobile)
    let touchStartY = 0;
    let touchEndY = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        if (touchEndY - touchStartY > 100) {
            closeLightbox();
        }
    });
    
    // ============================================
    // IMAGE FALLBACK SYSTEM
    // ============================================
    
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Add placeholder class
            this.classList.add('image-error');
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = `
                <div class="placeholder-icon">
                    <i data-lucide="image"></i>
                </div>
                <span class="placeholder-text">${this.alt || 'Image'}</span>
            `;
            
            // Replace image with placeholder
            this.style.display = 'none';
            this.parentNode.insertBefore(placeholder, this);
            
            // Initialize icons
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });
    
    // ============================================
    // BOOKING DRAWER FIXES
    // ============================================
    
    const bookingPill = document.getElementById('bookingPill');
    const bookingDrawer = document.getElementById('bookingDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerClose = document.getElementById('drawerClose');
    
    if (bookingPill && bookingDrawer) {
        // Ensure smooth animation
        bookingPill.addEventListener('click', () => {
            bookingDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // iOS fix for fixed elements
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        });
        
        const closeDrawer = () => {
            bookingDrawer.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
        
        drawerBackdrop?.addEventListener('click', closeDrawer);
        drawerClose?.addEventListener('click', closeDrawer);
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && bookingDrawer.classList.contains('active')) {
                closeDrawer();
            }
        });
    }
    
    // ============================================
    // iOS SPECIFIC FIXES
    // ============================================
    
    // Fix 100vh issue on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (iOS) {
        // Update CSS variable for viewport height
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        
        // Prevent elastic scrolling on drawer
        const drawerContent = document.querySelector('.drawer-content');
        if (drawerContent) {
            drawerContent.addEventListener('touchmove', (e) => {
                if (e.target === drawerContent) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // Smooth scroll
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✨ Video lightbox & UI enhancements initialized');
});
