// frontend/js/animations.js

document.addEventListener("DOMContentLoaded", () => {
    // Navbar Animation
    gsap.from(".navbar", { 
        duration: 1, 
        y: -50, 
        opacity: 0, 
        ease: "power3.out" 
    });

    // Hero Text Animations
    gsap.from(".hero-content h1", { 
        duration: 1.2, 
        y: 40, 
        opacity: 0, 
        ease: "power3.out", 
        delay: 0.3 
    });
    
    gsap.from(".hero-content p", { 
        duration: 1.2, 
        y: 20, 
        opacity: 0, 
        ease: "power3.out", 
        delay: 0.6 
    });
    
    gsap.from(".hero-cta", { 
        duration: 1.2, 
        y: 20, 
        opacity: 0, 
        ease: "power3.out", 
        delay: 0.9 
    });

    // Hero Image Animation (Smooth Slide & Scale)
    gsap.from(".hero-image img", { 
        duration: 1.8, 
        x: 100,
        scale: 0.9, 
        opacity: 0, 
        ease: "power4.out", 
        delay: 0.5 
    });
});
