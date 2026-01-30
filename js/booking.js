
/**
 * ANA'S BEAUTY LAB - Booking System
 * Floating Pill & Slide-up Drawer
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // BOOKING DRAWER FUNCTIONALITY
    // ============================================
    
    const bookingPill = document.getElementById('bookingPill');
    const bookingDrawer = document.getElementById('bookingDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerClose = document.getElementById('drawerClose');
    const drawerContent = bookingDrawer?.querySelector('.drawer-content');
    const serviceButtons = document.querySelectorAll('.book-service-btn');
    const navCta = document.querySelector('.nav-cta');
    
    let isDrawerOpen = false;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    
    function openDrawer() {
        if (!bookingDrawer || isDrawerOpen) return;
        
        isDrawerOpen = true;
        bookingDrawer.classList.add('active');
        
        // Pause smooth scroll
        if (window.pauseScroll) {
            window.pauseScroll();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        setTimeout(() => {
            drawerClose?.focus();
        }, 100);
        
        // Analytics tracking (placeholder)
        if (window.gtag) {
            window.gtag('event', 'open_booking_drawer', {
                event_category: 'engagement',
                event_label: 'booking_cta'
            });
        }
    }
    
    function closeDrawer() {
        if (!bookingDrawer || !isDrawerOpen) return;
        
        isDrawerOpen = false;
        bookingDrawer.classList.remove('active');
        
        // Resume smooth scroll
        if (window.resumeScroll) {
            window.resumeScroll();
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to trigger
        setTimeout(() => {
            bookingPill?.focus();
        }, 100);
    }
    
    // Open drawer events
    bookingPill?.addEventListener('click', openDrawer);
    navCta?.addEventListener('click', openDrawer);
    
    // Service-specific booking
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            openDrawer();
            
            // Track which service was selected
            const serviceStrip = button.closest('.service-strip');
            const serviceName = serviceStrip?.dataset.service;
            
            if (window.gtag && serviceName) {
                window.gtag('event', 'select_service', {
                    event_category: 'conversion',
                    event_label: serviceName
                });
            }
        });
    });
    
    // Close drawer events
    drawerBackdrop?.addEventListener('click', closeDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isDrawerOpen) {
            closeDrawer();
        }
    });
    
    // ============================================
    // SWIPE TO DISMISS (Mobile)
    // ============================================
    
    if (drawerContent) {
        // Touch events for swipe
        drawerContent.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            drawerContent.style.transition = 'none';
        }, { passive: true });
        
        drawerContent.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            // Only allow downward swipes
            if (diff > 0) {
                const translateY = Math.min(diff * 0.5, 200);
                drawerContent.style.transform = `translateY(${translateY}px)`;
            }
        }, { passive: true });
        
        drawerContent.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            isDragging = false;
            const diff = currentY - startY;
            
            drawerContent.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Close if swiped down more than 100px
            if (diff > 100) {
                closeDrawer();
            } else {
                drawerContent.style.transform = 'translateY(0)';
            }
        });
    }
    
    // ============================================
    // BOOKING PILL BEHAVIOR
    // ============================================
    
    // Hide pill when drawer is open
    function updatePillVisibility() {
        if (isDrawerOpen) {
            gsap.to(bookingPill, {
                y: 100,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        } else {
            gsap.to(bookingPill, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.3,
                ease: 'power3.out'
            });
        }
    }
    
    // Hook into drawer functions
    const originalOpenDrawer = openDrawer;
    const originalCloseDrawer = closeDrawer;
    
    bookingPill?.addEventListener('click', updatePillVisibility);
    drawerClose?.addEventListener('click', () => {
        setTimeout(updatePillVisibility, 100);
    });
    drawerBackdrop?.addEventListener('click', () => {
        setTimeout(updatePillVisibility, 100);
    });
    
    // ============================================
    // SCROLL-BASED PILL VISIBILITY
    // ============================================
    
    let pillVisible = true;
    let lastScrollY = 0;
    const heroSection = document.getElementById('hero');
    
    if (bookingPill && heroSection) {
        // Use IntersectionObserver to detect when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hide pill when in hero (show scroll indicator instead)
                    gsap.to(bookingPill, {
                        y: 100,
                        opacity: 0,
                        duration: 0.3
                    });
                } else {
                    // Show pill when scrolled past hero
                    if (!isDrawerOpen) {
                        gsap.to(bookingPill, {
                            y: 0,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'power3.out'
                        });
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50% 0px'
        });
        
        heroObserver.observe(heroSection);
    }
    
    // ============================================
    // NAVIGATION CTA SMOOTH SCROLL TO BOOKING
    // ============================================
    
    navCta?.addEventListener('click', (e) => {
        // If on a page without the full layout, just open drawer
        if (!document.getElementById('services')) {
            openDrawer();
            return;
        }
        
        // Otherwise, scroll to services and highlight
        e.preventDefault();
        
        const servicesSection = document.getElementById('services');
        if (servicesSection && window.smoothScrollTo) {
            window.smoothScrollTo(servicesSection, { offset: -100 });
            
            // Highlight services briefly
            setTimeout(() => {
                servicesSection.style.background = 'rgba(245, 230, 211, 0.5)';
                setTimeout(() => {
                    servicesSection.style.background = '';
                    servicesSection.style.transition = 'background 0.5s ease';
                }, 500);
            }, 1000);
        }
    });
    
    // ============================================
    // BOOKING REMINDER (After 30 seconds)
    // ============================================
    
    let reminderShown = false;
    
    setTimeout(() => {
        if (!reminderShown && !isDrawerOpen) {
            // Gentle pulse animation on the pill
            gsap.to(bookingPill, {
                scale: 1.1,
                duration: 0.3,
                yoyo: true,
                repeat: 3,
                ease: 'power2.inOut'
            });
            
            reminderShown = true;
        }
    }, 30000);
    
    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    
    // Trap focus within drawer when open
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    }
    
    if (bookingDrawer) {
        trapFocus(bookingDrawer);
    }
    
    // ============================================
    // EXTERNAL BOOKING LINK FALLBACK
    // ============================================
    
    // If the iframe fails to load, redirect to external booking
    const bookingIframe = document.querySelector('.booking-iframe');
    
    if (bookingIframe) {
        bookingIframe.addEventListener('error', () => {
            console.warn('Booking iframe failed to load, redirecting...');
            window.open('https://squareup.com/appointments/book/anasbeautylab', '_blank');
            closeDrawer();
        });
    }
    
    // ============================================
    // SERVICE STRIP INTERACTION
    // ============================================
    
    const serviceStrips = document.querySelectorAll('.service-strip');
    
    serviceStrips.forEach(strip => {
        const preview = strip.querySelector('.strip-preview');
        
        // Click to expand/collapse
        preview?.addEventListener('click', () => {
            const isActive = strip.classList.contains('active');
            
            // Close all other strips
            serviceStrips.forEach(s => {
                if (s !== strip) {
                    s.classList.remove('active');
                }
            });
            
            // Toggle current strip
            strip.classList.toggle('active');
            
            // Animate height with GSAP for smoothness
            const expanded = strip.querySelector('.strip-expanded');
            
            if (strip.classList.contains('active')) {
                gsap.fromTo(expanded, 
                    { height: 0, opacity: 0 },
                    { 
                        height: 'auto', 
                        opacity: 1, 
                        duration: 0.6,
                        ease: 'power3.out'
                    }
                );
            } else {
                gsap.to(expanded, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.in'
                });
            }
        });
    });
    
    // ============================================
    // NAVIGATE BUTTON ONE-TAP
    // ============================================
    
    const navigateBtn = document.querySelector('.navigate-btn');
    
    navigateBtn?.addEventListener('click', (e) => {
        // Detect platform and open appropriate map app
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const href = navigateBtn.getAttribute('href');
        
        if (isIOS && !href.includes('maps.apple.com')) {
            e.preventDefault();
            // Convert to Apple Maps format
            window.location.href = 'https://maps.apple.com/?q=Ana%27s+Beauty+Lab&ll=29.7604,-95.3698';
        }
        
        // Analytics
        if (window.gtag) {
            window.gtag('event', 'get_directions', {
                event_category: 'engagement',
                event_label: isIOS ? 'apple_maps' : 'google_maps'
            });
        }
    });
    
    console.log('✨ Booking system initialized');
});
