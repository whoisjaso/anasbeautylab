
/**
 * ANA'S BEAUTY LAB - Gyroscope Integration
 * Gradient mesh background responsive to device movement
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const gradientMesh = document.getElementById('gradientMesh');
    
    if (!gradientMesh) return;
    
    // ============================================
    // MOUSE MOVEMENT (Desktop)
    // ============================================
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isTouch = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouch) {
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });
        
        // Smooth interpolation loop
        function updateMouseGradient() {
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            
            const hue1 = 30 + targetX * 10;
            const hue2 = 25 + targetY * 10;
            const hue3 = 35 - targetX * 5;
            
            gradientMesh.style.background = `
                linear-gradient(
                    ${135 + targetX * 20}deg,
                    hsl(${hue1}, 40%, 97%) 0%,
                    hsl(${hue2}, 45%, 93%) 50%,
                    hsl(${hue3}, 35%, 90%) 100%
                )
            `;
            
            requestAnimationFrame(updateMouseGradient);
        }
        
        updateMouseGradient();
    }
    
    // ============================================
    // DEVICE ORIENTATION (Mobile)
    // ============================================
    
    let permissionGranted = false;
    let deviceX = 0;
    let deviceY = 0;
    let deviceTargetX = 0;
    let deviceTargetY = 0;
    
    // Check for DeviceOrientationEvent support
    if (window.DeviceOrientationEvent) {
        // iOS 13+ requires permission
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // Create a subtle prompt button for iOS
            const permissionBtn = document.createElement('button');
            permissionBtn.className = 'gyro-permission-btn';
            permissionBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path></svg> Enable Motion';
            permissionBtn.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 20px;
                background: rgba(26, 26, 26, 0.9);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(212, 165, 116, 0.3);
                border-radius: 50px;
                color: #faf7f2;
                font-family: 'Montserrat', sans-serif;
                font-size: 13px;
                font-weight: 500;
                letter-spacing: 1px;
                cursor: pointer;
                z-index: 500;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(permissionBtn);
            
            // Show button after a delay
            setTimeout(() => {
                permissionBtn.style.opacity = '1';
                permissionBtn.style.pointerEvents = 'auto';
            }, 3000);
            
            permissionBtn.addEventListener('click', async () => {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        permissionGranted = true;
                        permissionBtn.style.opacity = '0';
                        permissionBtn.style.pointerEvents = 'none';
                        setTimeout(() => permissionBtn.remove(), 300);
                        initDeviceOrientation();
                    }
                } catch (error) {
                    console.warn('Device orientation permission denied:', error);
                }
            });
        } else {
            // Android or older iOS - permission not required
            permissionGranted = true;
            initDeviceOrientation();
        }
    }
    
    function initDeviceOrientation() {
        window.addEventListener('deviceorientation', (e) => {
            if (!e.gamma && !e.beta) return;
            
            // gamma: left/right tilt (-90 to 90)
            // beta: front/back tilt (-180 to 180)
            deviceX = Math.max(-45, Math.min(45, e.gamma || 0)) / 45;
            deviceY = Math.max(-45, Math.min(45, e.beta || 0)) / 45;
        }, { passive: true });
        
        // Smooth update loop for device orientation
        function updateDeviceGradient() {
            if (!permissionGranted) {
                requestAnimationFrame(updateDeviceGradient);
                return;
            }
            
            deviceTargetX += (deviceX - deviceTargetX) * 0.08;
            deviceTargetY += (deviceY - deviceTargetY) * 0.08;
            
            const hue1 = 30 + deviceTargetX * 15;
            const hue2 = 25 + deviceTargetY * 15;
            const hue3 = 35 - deviceTargetX * 10;
            
            // Add subtle parallax to mesh elements
            const meshBefore = gradientMesh.querySelector('::before');
            
            gradientMesh.style.background = `
                linear-gradient(
                    ${135 + deviceTargetX * 30}deg,
                    hsl(${hue1}, 40%, 97%) 0%,
                    hsl(${hue2}, 45%, 93%) 50%,
                    hsl(${hue3}, 35%, 90%) 100%
                )
            `;
            
            // Shift the radial gradients in the ::before pseudo-element
            const style = document.createElement('style');
            style.textContent = `
                .gradient-mesh::before {
                    transform: translate(
                        ${deviceTargetX * 5}%, 
                        ${deviceTargetY * 5}%
                    ) rotate(${deviceTargetX * 5}deg) !important;
                }
            `;
            
            // Remove old style if exists
            const oldStyle = document.getElementById('gyro-style');
            if (oldStyle) oldStyle.remove();
            
            style.id = 'gyro-style';
            document.head.appendChild(style);
            
            requestAnimationFrame(updateDeviceGradient);
        }
        
        updateDeviceGradient();
    }
    
    // ============================================
    // SCROLL-BASED GRADIENT SHIFT
    // ============================================
    
    let scrollProgress = 0;
    
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = window.scrollY / docHeight;
    }, { passive: true });
    
    // Combine scroll with mouse/gyro effects
    function updateCombinedGradient() {
        const scrollHue = scrollProgress * 10;
        
        // This runs in addition to mouse/gyro updates
        // The final gradient is computed in those loops
        
        requestAnimationFrame(updateCombinedGradient);
    }
    
    if (!isTouch) {
        updateCombinedGradient();
    }
    
    // ============================================
    // AMBIENT ANIMATION FALLBACK
    // ============================================
    
    // For users without motion sensors or who denied permission
    let ambientTime = 0;
    
    function ambientAnimation() {
        if (permissionGranted || !isTouch) return;
        
        ambientTime += 0.005;
        
        const hue1 = 30 + Math.sin(ambientTime) * 5;
        const hue2 = 25 + Math.cos(ambientTime * 0.7) * 5;
        
        gradientMesh.style.background = `
            linear-gradient(
                ${135 + Math.sin(ambientTime * 0.5) * 10}deg,
                hsl(${hue1}, 40%, 97%) 0%,
                hsl(${hue2}, 45%, 93%) 50%,
                hsl(35, 35%, 90%) 100%
            )
        `;
        
        requestAnimationFrame(ambientAnimation);
    }
    
    if (isTouch && !permissionGranted) {
        ambientAnimation();
    }
    
    // ============================================
    // SCROLL VELOCITY EFFECT
    // ============================================
    
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    
    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        scrollVelocity = Math.abs(st - lastScrollTop);
        lastScrollTop = st;
        
        // Add motion blur effect on fast scroll
        if (scrollVelocity > 50) {
            gradientMesh.style.filter = `blur(${Math.min(scrollVelocity / 100, 2)}px)`;
        } else {
            gradientMesh.style.filter = 'blur(0px)';
        }
    }, { passive: true });
    
    // ============================================
    // DARK MODE DETECTION (Subtle adjustment)
    // ============================================
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Slightly adjust for dark mode preference
        gradientMesh.style.filter = 'brightness(0.95)';
    }
    
    // Listen for changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        gradientMesh.style.filter = e.matches ? 'brightness(0.95)' : 'brightness(1)';
    });
    
    console.log('✨ Gyroscope integration initialized');
});
