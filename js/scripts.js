/**
 * Suika Game - Main JavaScript
 * Handles navigation and animation functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap navbar toggler functionality
    initBootstrapNavbar();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize the new components
    initReviewsSlider();
    initGameCarousel();
    
    // Initialize floating fruits
    initFloatingFruits();
    
    // Initialize interactive feature cards
    initFeatureCards();
});

/**
 * Initialize Bootstrap navbar toggler functionality
 */
function initBootstrapNavbar() {
    // Make sure we're only adding event listeners once
    const navbarCollapse = document.getElementById('navbarResponsive');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (!navbarCollapse || !navbarToggler) return;
    
    // For mobile: Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        // Skip if we're not on mobile or menu is already closed
        if (window.innerWidth >= 992 || !navbarCollapse.classList.contains('show')) return;
        
        // Check if click is outside navbar
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            // Close the menu
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            } else {
                // Fallback if bootstrap JS not loaded
                navbarCollapse.classList.remove('show');
            }
        }
    });
    
    // Close menu when a nav link is clicked (mobile only)
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                // Use Bootstrap's Collapse API to hide the navbar
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        // If no instance exists yet, create one
                        new bootstrap.Collapse(navbarCollapse).hide();
                    }
                } else {
                    // Fallback if bootstrap JS not loaded yet
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Ensure toggler always works even if Bootstrap JS is slow to load
    navbarToggler.addEventListener('click', function(e) {
        if (typeof bootstrap === 'undefined' || !bootstrap.Collapse) {
            e.preventDefault();
            navbarCollapse.classList.toggle('show');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = document.querySelector('#mainNav')?.offsetHeight || 0;
                
                // Calculate position accounting for navbar
                const top = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
                
                // On mobile, close the navbar when a link is clicked
                const navbarCollapse = document.getElementById('navbarResponsive');
                if (navbarCollapse && navbarCollapse.classList.contains('show') && window.innerWidth < 992) {
                    // Use Bootstrap's collapse API if available
                    if (typeof bootstrap !== 'undefined') {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });
}

/**
 * Initialize the reviews slider
 */
function initReviewsSlider() {
    try {
        // Safely check if jQuery and slick are available
        if (typeof $ === 'undefined') {
            console.warn('jQuery is not available, reviews slider cannot be initialized');
            return;
        }
        
        if (typeof $.fn.slick === 'undefined') {
            console.warn('Slick slider not available');
            return;
        }
        
        // Wait for DOM to be fully ready
        $(document).ready(function() {
            // Check if the reviews slider element exists
            if ($('.reviews-slider').length === 0) {
                console.warn('Reviews slider element not found');
                return;
            }
            
            // Add accessibility attributes before initialization
            $('.reviews-slider .slick-slide').attr('aria-hidden', 'true');
            $('.reviews-slider .slick-current').attr('aria-hidden', 'false');
            
            // Initialize slick slider with safety checks
            try {
                $('.reviews-slider').slick({
                    dots: true,
                    arrows: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnHover: true,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
                console.log('Reviews slider initialized successfully');
                
                // Add interactive animations for reviews
                $('.review-card').mouseenter(function() {
                    $(this).find('.review-card-inner').css('transform', 'translateY(-8px)');
                    $(this).find('.reviewer-avatar img').css('transform', 'scale(1.1)');
                }).mouseleave(function() {
                    $(this).find('.review-card-inner').css('transform', 'translateY(0)');
                    $(this).find('.reviewer-avatar img').css('transform', 'scale(1)');
                });
                
                // Set up button behaviors
                $('.leave-review-btn').click(function() {
                    alert('Review functionality will be implemented soon. Thank you for your interest!');
                });
                
                $('.view-more-reviews-btn').click(function() {
                    alert('More reviews will be loaded soon. Thank you for your interest!');
                });
                
            } catch (slickError) {
                console.error('Error initializing slick slider:', slickError);
            }
        });
    } catch (e) {
        console.error('Error in initReviewsSlider:', e);
    }
}

/**
 * Initialize the game carousel
 */
function initGameCarousel() {
    // This would be implemented with actual gameplay images/videos
    console.log('Game carousel initialized');
}

/**
 * Ensure floating fruits are visible and positioned properly
 */
function initFloatingFruits() {
    const fruits = document.querySelectorAll('.floating-fruit');
    const heroSection = document.querySelector('.hero-section');
    
    if (!fruits.length || !heroSection) return;
    
    // Position fruits randomly within the hero section
    fruits.forEach((fruit, index) => {
        // Set random positions
        const randomX = Math.floor(Math.random() * 80) + 10; // 10% to 90% of width
        const randomY = Math.floor(Math.random() * 60) + 20; // 20% to 80% of height
        
        // Set different animation delays for each fruit
        const delay = index * 0.5;
        
        fruit.style.left = `${randomX}%`;
        fruit.style.top = `${randomY}%`;
        fruit.style.animationDelay = `${delay}s`;
        
        // Make sure fruits are visible
        fruit.style.display = 'block';
        fruit.style.opacity = '0.8';
    });
    
    // Adjust fruit sizes for mobile
    const adjustFruitSizes = () => {
        if (window.innerWidth <= 576) {
            fruits.forEach(fruit => {
                fruit.style.maxWidth = '30px';
                fruit.style.maxHeight = '30px';
            });
        } else if (window.innerWidth <= 768) {
            fruits.forEach(fruit => {
                fruit.style.maxWidth = '40px';
                fruit.style.maxHeight = '40px';
            });
        } else {
            fruits.forEach((fruit, index) => {
                // Vary the sizes a bit more on larger screens
                const baseSize = 40 + (index * 10);
                fruit.style.maxWidth = `${baseSize}px`;
                fruit.style.maxHeight = `${baseSize}px`;
            });
        }
    };
    
    // Run initially and on resize
    adjustFruitSizes();
    window.addEventListener('resize', adjustFruitSizes);
}

// Sticky Navigation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const navbar = document.getElementById('mainNav');
    const mobileNav = document.querySelector('.mobile-nav');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // On mobile screens
        if (window.innerWidth < 992) {
            // Scrolling down - hide navbar but keep mobile nav
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                if (navbar) navbar.style.top = '-56px';
                if (mobileNav) mobileNav.style.top = '0';
            } 
            // Scrolling up - show both
            else {
                if (navbar) navbar.style.top = '0';
                if (mobileNav) mobileNav.style.top = '56px';
            }
        }
        
        lastScrollTop = scrollTop;
    });
});

/**
 * Initialize the interactive features section
 */
function initFeatureCards() {
    // Feature cards expansion
    const featureCards = document.querySelectorAll('.feature-card.interactive');
    
    featureCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more-btn');
        const readLessBtn = card.querySelector('.read-less-btn');
        
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.add('expanded');
            });
        }
        
        if (readLessBtn) {
            readLessBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('expanded');
            });
        }
        
        // Optional: Allow clicking the entire card to expand
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('expanded') && 
                !e.target.classList.contains('play-now-btn') && 
                !e.target.classList.contains('read-less-btn')) {
                card.classList.add('expanded');
            }
        });
    });
    
    // Animate counters when they come into view
    const counterElements = document.querySelectorAll('.counter');
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        counterElements.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 2000; // 2 seconds
            const frameRate = 50; // updates per second
            const totalFrames = duration * frameRate / 1000;
            let frame = 0;
            
            const increment = target / totalFrames;
            let currentCount = 0;
            
            const timer = setInterval(() => {
                frame++;
                currentCount += increment;
                
                if (frame === totalFrames) {
                    clearInterval(timer);
                    counter.textContent = target.toString();
                } else {
                    counter.textContent = isDecimal 
                        ? currentCount.toFixed(1) 
                        : Math.floor(currentCount).toString();
                }
                
                if (currentCount >= target) {
                    clearInterval(timer);
                    counter.textContent = isDecimal ? target.toFixed(1) : target;
                }
            }, 1000/frameRate);
        });
        
        countersStarted = true;
    }
    
    // Check if counters are in viewport
    function checkCounters() {
        if (countersStarted) return;
        
        const statsContainer = document.querySelector('.stats-container');
        if (!statsContainer) return;
        
        const rect = statsContainer.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (isInViewport) {
            startCounters();
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkCounters);
    // Initial check
    checkCounters();
}

/**
 * Load Google Maps when user clicks the load button
 * This helps with initial page performance by deferring map loading
 */
function loadMap() {
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    const mapFrame = document.getElementById('mapFrame');
    
    if (!mapPlaceholder || !mapFrame) return;
    
    // Create the iframe with Google Maps
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479654750047!2d139.7001765!3d35.6614629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b563b00109f%3A0x337328def1e2ab26!2z5riL6LC36Zmi77yI5riv5rSl77yJ!5e0!3m2!1sja!2sjp!4v1713364521026!5m2!1sja!2sjp';
    iframe.width = '100%';
    iframe.height = '450';
    iframe.style.border = '0';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    // Add the iframe to the map frame
    mapFrame.appendChild(iframe);
    
    // Hide placeholder and show the map
    mapPlaceholder.classList.add('d-none');
    mapFrame.classList.remove('d-none');
    
    // Log for debugging
    console.log('Map loaded successfully');
} 