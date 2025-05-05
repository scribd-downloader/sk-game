/**
 * Suika Game - Animations JavaScript
 * Handles animations and visual effects
 */

// Register GSAP plugins if available
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin if available
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            // console.log("ScrollTrigger plugin registered successfully");
        } else {
            // Silently handle missing ScrollTrigger plugin
            // console.warn("ScrollTrigger plugin not found. Some animations may not work properly.");
        }
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if on mobile device
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Only run heavy animations on desktop
    if (!isMobile) {
        // Initialize animations on scroll
        initScrollAnimations();
        
        // Initialize floating fruits background
        initFloatingFruits();
        
        // Initialize staggered animations
        initStaggeredAnimations();
        
        // Initialize text animations
        initTextAnimations();
        
        // Initialize floating fruits
        animateFloatingFruits();
        
        // Initialize scroll reveal animations
        initScrollReveal();
    } else {
        // Minimal setup for mobile - only essential functions
        console.log('Mobile device detected. Disabling heavy animations for better performance.');
    }
    
    // Essential functionality for all devices
    initCustomCursor();
    initSmoothNav();
    initResponsiveNav();
    initSmoothScroll();
    initGameStart();
});

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Get all elements that should be animated on scroll (excluding hero section)
    const animatedElements = document.querySelectorAll('.fade-in:not(.hero-section .fade-in), [data-animation]:not(.hero-section [data-animation])');
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Skip if it's in the hero section
            if (entry.target.closest('.hero-section')) return;
            
            // Add the animation class when element is visible
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // If element has a data-animation attribute, use that animation class
                if (element.dataset.animation) {
                    element.classList.add('animated');
                    
                    // Add delay if specified
                    if (element.dataset.delay) {
                        element.style.animationDelay = element.dataset.delay + 'ms';
                    }
                } else {
                    // Otherwise just add the visible class
                    element.classList.add('visible');
                }
                
                // Unobserve after animating once
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Negative bottom margin to trigger earlier
    });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize floating fruits background
 */
function initFloatingFruits() {
    const fruitsContainer = document.getElementById('fruits-container');
    
    // Exit if container is not found
    if (!fruitsContainer) return;
    
    // Check if on mobile device
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Don't show fruits on mobile at all
    if (isMobile) {
        fruitsContainer.style.display = 'none';
        return;
    }
    
    // Clear existing content
    fruitsContainer.innerHTML = '';
    
    // Fruit images to use
    const fruitIcons = [
        './icons/00_cherry.webp',
        './icons/01_strawberry.webp',
        './icons/02_grape.webp',
        './icons/03_orange.webp',
        './icons/04_lemon.webp',
        './icons/05_pear.webp',
        './icons/06_apple.webp',
        './icons/07_peach.webp',
        './icons/08_pineapple.webp',
        './icons/09_melon.webp',
        './icons/10_watermelon.webp'
    ];
    
    // Create initial fruit elements
    createInitialFruits();
    
    // Continue creating fruits at intervals - less frequently than before
    setInterval(createRandomFruit, 5000);
    
    /**
     * Create initial fruits
     */
    function createInitialFruits() {
        // Create multiple fruits initially - fewer than before
        for (let i = 0; i < 6; i++) {
            createRandomFruit();
        }
    }
    
    /**
     * Create a single random fruit element
     */
    function createRandomFruit() {
        // Create fruit element
        const fruit = document.createElement('img');
        fruit.className = 'floating-fruit';
        fruit.alt = 'Floating Fruit';
        fruit.loading = 'lazy'; // Add lazy loading
        
        // Select random fruit image
        const randomIndex = Math.floor(Math.random() * fruitIcons.length);
        fruit.src = fruitIcons[randomIndex];
        
        // Random size between 20px and 60px
        const size = Math.floor(Math.random() * 40) + 20;
        fruit.style.width = `${size}px`;
        fruit.style.height = `${size}px`;
        
        // Random position
        const left = Math.floor(Math.random() * 100);
        const top = Math.floor(Math.random() * 100);
        fruit.style.left = `${left}%`;
        fruit.style.top = `${top}%`;
        
        // Random rotation
        const rotation = Math.floor(Math.random() * 360);
        fruit.style.transform = `rotate(${rotation}deg)`;
        
        // Random animation duration between 6s and 12s
        const duration = Math.floor(Math.random() * 6) + 6;
        fruit.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        const delay = Math.floor(Math.random() * 5);
        fruit.style.animationDelay = `${delay}s`;
        
        // Add to container
        fruitsContainer.appendChild(fruit);
        
        // Remove after some time to avoid too many elements - shorter time
        setTimeout(() => {
            fruit.classList.add('fade-out');
            setTimeout(() => {
                if (fruit.parentNode === fruitsContainer) {
                    fruitsContainer.removeChild(fruit);
                }
            }, 1000);
        }, (duration + delay + 5) * 1000); // Reduced from 15 to 5
    }
}

/**
 * Initialize custom cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    // Check if device supports pointer (non-touch)
    if (window.matchMedia("(pointer: fine)").matches) {
        // Show cursor on devices with pointer
        cursor.style.display = 'block';
        
        // Update cursor position on mousemove
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add event listeners for hoverable elements
        const hoverableElements = document.querySelectorAll('a, button, .nav-link, .btn, .fruit-item, .step-card, .floating-fruit');
        
        hoverableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-expanded');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-expanded');
            });
        });
        
        // Hide cursor when mouse leaves the window
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget == null || e.relatedTarget.nodeName === 'HTML') {
                cursor.style.display = 'none';
            }
        });
        
        // Show cursor when mouse enters the window
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'block';
        });
    } else {
        // Hide cursor on touch devices
        cursor.style.display = 'none';
    }
}

/**
 * Initialize staggered animations for lists and groups
 */
function initStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    
    // Create Intersection Observer for staggered animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each staggered container
    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });
}

/**
 * Initialize GSAP animations if available
 */
function initGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP library not found. GSAP animations will not be initialized.');
        return;
    }

    try {
        // Skip the hero content animations since they're not displaying properly
        // Only animate the hero image if it exists
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            gsap.from(heroImage, {
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "power2.out"
            });
        }
        
        // Check if ScrollTrigger is registered
        if (typeof ScrollTrigger !== 'undefined') {
            // Animate section headings (except hero section)
            gsap.utils.toArray('.section-heading').forEach(heading => {
                // Skip if it's in the hero section
                if (heading.closest('.hero-section')) return;
                
                gsap.from(heading, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 80%"
                    }
                });
            });
            
            // Animate feature cards
            gsap.utils.toArray('.feature-card').forEach((card, index) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%"
                    }
                });
            });
        } else {
            // Fallback animations without ScrollTrigger
            gsap.utils.toArray('.section-heading').forEach(heading => {
                // Skip if it's in the hero section
                if (heading.closest('.hero-section')) return;
                
                gsap.from(heading, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8
                });
            });
            
            gsap.utils.toArray('.feature-card').forEach((card, index) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    delay: index * 0.2
                });
            });
        }
    } catch (error) {
        console.warn('Error initializing GSAP animations:', error);
    }
}

/**
 * Initialize parallax effect - DISABLED due to SVG issues
 */
function initParallaxEffect() {
    // Disabled due to SVG compatibility issues
    console.log("Parallax effect disabled to improve performance");
}

/**
 * Initialize mouse trail effect
 */
function initMouseTrail() {
    // Silently exit instead of showing a warning
    return;
}

/**
 * Initialize text animations for headings
 */
function initTextAnimations() {
    // Get all headings for animation (excluding hero section)
    const headings = document.querySelectorAll('h1:not(.hero-section h1), h2.section-heading:not(.hero-section .section-heading)');
    
    headings.forEach(heading => {
        // Skip if already processed or contains complex elements
        if (heading.classList.contains('text-animated') || 
            heading.querySelector('*') ||
            heading.closest('.hero-section')) {
            return;
        }
        
        // Get the text content
        const text = heading.textContent.trim();
        heading.textContent = '';
        heading.classList.add('text-animated');
        
        // Create character spans
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.className = 'animate-text';
            charSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Use non-breaking space for spaces
            heading.appendChild(charSpan);
        }
    });
    
    // Add a blinking cursor to the game section heading
    const gameHeading = document.querySelector('#game-section .section-heading');
    if (gameHeading) {
        const cursorEl = document.createElement('span');
        cursorEl.className = 'typing-cursor';
        gameHeading.appendChild(cursorEl);
    }
}

/**
 * Initialize smooth navigation effects
 */
function initSmoothNav() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get target element
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Scroll to target with smooth behavior
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Add hover underline effect to nav links
    const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    menuLinks.forEach(link => {
        link.classList.add('hover-underline');
    });
    
    // Change navigation bar on scroll
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.opacity = '0.95';
            } else {
                navbar.style.padding = '0.75rem 0';
                navbar.style.opacity = '1';
            }
        });
    }
}

// Animate Floating Fruits
function animateFloatingFruits() {
    const floatingFruits = document.querySelectorAll('.floating-fruit');
    
    floatingFruits.forEach((fruit, index) => {
        // Set random positions
        const randomX = Math.random() * 80 + 10; // 10-90% of viewport width
        const randomY = Math.random() * 80 + 10; // 10-90% of viewport height
        
        fruit.style.left = `${randomX}%`;
        fruit.style.top = `${randomY}%`;
        
        // Set random animation delays
        const delay = Math.random() * 5;
        fruit.style.animationDelay = `${delay}s`;
        
        // Add different animation durations
        const duration = Math.random() * 4 + 4; // 4-8s
        fruit.style.animationDuration = `${duration}s`;
    });
}

/**
 * Initialize responsive navigation for mobile devices
 */
function initResponsiveNav() {
    // Add scroll event for navbar styling only
    window.addEventListener('scroll', function() {
        const mainNav = document.getElementById('mainNav');
        if (mainNav) {
            if (window.scrollY > 50) {
                mainNav.classList.add('navbar-scrolled');
            } else {
                mainNav.classList.remove('navbar-scrolled');
            }
        }
    });
}

// Initialize Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Game Start Functionality
function initGameStart() {
    const startGameBtn = document.querySelector('.start-game-btn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            // Here you would normally initialize the game
            // Alert removed to improve user experience
            console.log('Game started');
            // Scroll to game section instead
            const gameSection = document.getElementById('game-section');
            if (gameSection) {
                window.scrollTo({
                    top: gameSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Preload game images - Modified to only load essential images on mobile
 */
function preloadImages() {
    // Check if on mobile device
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Essential images needed for the game itself
    const essentialImages = [
        './icons/00_cherry.webp',
        './icons/01_strawberry.webp',
        './icons/02_grape.webp',
        './icons/03_orange.webp',
        './icons/04_lemon.webp',
        './icons/05_pear.webp',
        './icons/06_apple.webp',
        './icons/07_peach.webp',
        './icons/08_pineapple.webp',
        './icons/09_melon.webp',
        './icons/10_watermelon.webp',
        './icons/Replay Suika Game Again.webp',
    ];
    
    // Additional images for desktop only
    const desktopImages = [
        // Game feature images - skip on mobile
        './Images/play suika watermelon game step 1.webp',
        './Images/play suika watermelon game step 2.webp',
        './Images/play suika watermelon game step 3.webp'
    ];
    
    // Only preload essential images on mobile
    const imagesToPreload = isMobile ? essentialImages : [...essentialImages, ...desktopImages];
    
    // Load images with lower priority on mobile
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        if (isMobile) {
            img.fetchPriority = "low";
        }
    });
}

/**
 * Initialize candy background effect
 */
function initCandyBackground() {
    // Silently exit instead of showing a warning
    return;
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    // Get all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    
    // Create intersection observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each element
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize fast loading effects
 */
function initFastLoading() {
    // Silently exit instead of showing a warning
    return;
}

// Initialize wave animation (DISABLED for performance)
/* 
function initWaveAnimation() {
    const waveDecoration = document.querySelector('.wave-decoration');
    if (waveDecoration) {
        // Disable wave animation for better performance
        waveDecoration.style.animation = 'none';
        waveDecoration.style.display = 'none';
    }
}
*/ 