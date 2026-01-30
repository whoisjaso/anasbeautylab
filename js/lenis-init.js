
/**
 * ANA'S BEAUTY LAB - Lenis Smooth Scroll Initialization
 * Physics-based scroll engine for weightless motion
 */

(function() {
    'use strict';
    
    // Initialize Lenis with luxury configuration
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });
    
    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    // Make lenis available globally
    window.lenis = lenis;
    
    // Scroll to function with spring easing
    window.smoothScrollTo = function(target, options = {}) {
        const defaults = {
            offset: 0,
            duration: 1.5,
            easing: (t) => {
                // Spring physics easing
                const c1 = 1.70158;
                const c3 = c1 + 1;
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
            }
        };
        
        const settings = { ...defaults, ...options };
        
        lenis.scrollTo(target, {
            offset: settings.offset,
            duration: settings.duration,
            easing: settings.easing
        });
    };
    
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target, { offset: -100 });
            }
        });
    });
    
    // Pause scroll when modals are open
    window.pauseScroll = function() {
        lenis.stop();
    };
    
    window.resumeScroll = function() {
        lenis.start();
    };
    
    console.log('✨ Lenis smooth scroll initialized');
})();
