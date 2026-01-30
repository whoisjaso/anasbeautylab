/**
 * ANA'S BEAUTY LAB - Enhanced Gallery Functionality
 * Before/After slider and filter system
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // GALLERY FILTER SYSTEM
    // ============================================
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const baCards = document.querySelectorAll('.ba-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            baCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    gsap.fromTo(card, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        y: -20,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // ============================================
    // BEFORE/AFTER SLIDER INTERACTION
    // ============================================
    
    const baComparisons = document.querySelectorAll('.ba-comparison');
    
    baComparisons.forEach(comparison => {
        const afterImage = comparison.querySelector('.ba-after');
        const handle = comparison.querySelector('.ba-slider-handle');
        let isDragging = false;
        
        // Mouse/Touch events for slider
        const updateSlider = (x) => {
            const rect = comparison.getBoundingClientRect();
            let percentage = ((x - rect.left) / rect.width) * 100;
            
            // Clamp between 5% and 95%
            percentage = Math.max(5, Math.min(95, percentage));
            
            // Update clip-path on after image
            afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            
            // Update handle position
            handle.style.left = `${percentage}%`;
        };
        
        // Mouse events
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Click on image to jump to position
        comparison.addEventListener('click', (e) => {
            if (e.target === handle || e.target.closest('.ba-slider-handle')) return;
            updateSlider(e.clientX);
        });
    });
    
    // ============================================
    // INSTAGRAM ITEM HOVER EFFECTS
    // ============================================
    
    const instagramItems = document.querySelectorAll('.instagram-item');
    
    instagramItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            gsap.to(img, { scale: 1.1, duration: 0.3 });
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            gsap.to(img, { scale: 1, duration: 0.3 });
        });
    });
    
    // ============================================
    // STUDIO ITEM ANIMATIONS
    // ============================================
    
    const studioItems = document.querySelectorAll('.studio-item');
    
    studioItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // ============================================
    // BA CARDS ANIMATION
    // ============================================
    
    baCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });
    
    console.log('✨ Enhanced Gallery functionality initialized');
});
