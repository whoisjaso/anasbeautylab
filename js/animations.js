
/**
 * ANA'S BEAUTY LAB - GSAP Animations
 * Expanding Portal, Magnetic Parallax, Scroll Effects
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, Flip);
    
    // ============================================
    // EXPANDING PORTAL HERO ANIMATION
    // ============================================
    
    const portalLens = document.getElementById('portalLens');
    const heroText = document.getElementById('heroText');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (portalLens) {
        // Initial portal scale animation on load
        gsap.fromTo(portalLens, 
            { scale: 0.3, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 1.8, 
                ease: 'power3.out',
                delay: 0.3
            }
        );
        
        // Portal expansion on scroll
        const portalTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: false
            }
        });
        
        portalTl.to(portalLens, {
            scale: 4,
            borderRadius: '0%',
            ease: 'none'
        });
        
        // Hero text fade in
        gsap.to(heroText, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 1,
            ease: 'power3.out'
        });
        
        // Scroll indicator
        gsap.to(scrollIndicator, {
            opacity: 1,
            duration: 0.8,
            delay: 2,
            ease: 'power2.out'
        });
        
        // Fade out hero text on scroll
        gsap.to(heroText, {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: '#hero',
                start: '20% top',
                end: '50% top',
                scrub: true
            }
        });
    }
    
    // ============================================
    // MAGNETIC PARALLAX - ABOUT SECTION
    // ============================================
    
    const parallaxLayers = document.querySelectorAll('[data-speed]');
    
    parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        
        gsap.to(layer, {
            y: () => window.innerHeight * speed * 0.5,
            ease: 'none',
            scrollTrigger: {
                trigger: layer.closest('section'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // About section reveal animations
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
        // Section title
        gsap.to(aboutSection.querySelector('.section-title'), {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Description
        gsap.to(aboutSection.querySelector('.section-description'), {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Signature block
        gsap.to(aboutSection.querySelector('.signature-block'), {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // About image
        gsap.to('.about-image', {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.image-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Accent shape
        gsap.to('.accent-shape', {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    // ============================================
    // MAGNETIC TEXT EFFECT
    // ============================================
    
    const magneticTexts = document.querySelectorAll('.magnetic-text');
    
    if (!window.matchMedia('(pointer: coarse)').matches) {
        magneticTexts.forEach(text => {
            text.addEventListener('mousemove', (e) => {
                const rect = text.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(text, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            text.addEventListener('mouseleave', () => {
                gsap.to(text, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }
    
    // ============================================
    // SERVICES SECTION ANIMATIONS
    // ============================================
    
    const servicesSection = document.getElementById('services');
    
    if (servicesSection) {
        // Header animations
        gsap.to(servicesSection.querySelector('.section-title'), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: servicesSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.to(servicesSection.querySelector('.section-subtitle'), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: servicesSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Service strips stagger animation
        const serviceStrips = document.querySelectorAll('.service-strip');
        
        serviceStrips.forEach((strip, index) => {
            gsap.to(strip, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: strip,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // ============================================
    // GALLERY SECTION ANIMATIONS
    // ============================================
    
    const gallerySection = document.getElementById('gallery');
    
    if (gallerySection) {
        gsap.to(gallerySection.querySelector('.section-title'), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: gallerySection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Gallery items stagger
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            gsap.to(item, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // Gallery spotlight effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ============================================
    // CONTACT SECTION ANIMATIONS
    // ============================================
    
    const contactSection = document.getElementById('contact');
    
    if (contactSection) {
        const contactElements = contactSection.querySelectorAll('.contact-info > *');
        
        contactElements.forEach((el, index) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactSection,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
        
        // Map container
        gsap.to('.map-container', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    // ============================================
    // BEAUTY INTELLIGENCE (AEO) ANIMATIONS
    // ============================================
    
    const intelligenceSection = document.querySelector('.beauty-intelligence');
    
    if (intelligenceSection) {
        const faqItems = intelligenceSection.querySelectorAll('.faq-item');
        
        faqItems.forEach((item, index) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // ============================================
    // FOOTER ANIMATIONS
    // ============================================
    
    const footer = document.querySelector('.site-footer');
    
    if (footer) {
        gsap.to('.footer-brand', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: footer,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
        
        const footerColumns = footer.querySelectorAll('.footer-column');
        
        footerColumns.forEach((col, index) => {
            gsap.to(col, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
    
    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;
    
    ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const currentScroll = self.scroll();
            
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }
    });
    
    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            gsap.to(progressBar, {
                scaleX: self.progress,
                duration: 0.1,
                ease: 'none'
            });
        }
    });
    
    // ============================================
    // LUXURY SCROLL BEHAVIOR
    // ============================================
    
    // Smooth scroll to top button (if needed later)
    window.scrollToTop = function() {
        if (window.lenis) {
            window.lenis.scrollTo(0, {
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    };
    
    console.log('✨ GSAP animations initialized');
});
