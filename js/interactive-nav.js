/**
 * Interactive Navigation Bar
 * Handles responsive navigation for all device sizes
 * Works on mobile, tablet, and desktop devices
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

// Also run on window load to ensure all elements are available
window.addEventListener('load', function() {
    initializeNavigation();
});

/**
 * Initialize the navigation functionality
 */
function initializeNavigation() {
    console.log('Initializing interactive navigation');
    
    // Get navigation elements
    const navToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarResponsive');
    
    // Exit if elements aren't found
    if (!navToggler || !navbarMenu) {
        console.warn('Navigation elements not found, will try again later');
        setTimeout(initializeNavigation, 100);
        return;
    }
    
    // Remove any existing event listeners by cloning elements
    const newToggler = navToggler.cloneNode(true);
    navToggler.parentNode.replaceChild(newToggler, navToggler);
    
    // Clear any Bootstrap data attributes that might interfere
    newToggler.removeAttribute('data-bs-toggle');
    newToggler.removeAttribute('data-bs-target');
    
    // Set up toggle functionality
    newToggler.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        toggleNavMenu();
        
        return false;
    });
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        // Clone to remove existing listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add new click event
        newLink.addEventListener('click', function() {
            // Only close menu on mobile view
            if (window.innerWidth < 992) {
                hideNavMenu();
            }
            
            // Highlight active link
            navLinks.forEach(l => l.classList.remove('active'));
            newLink.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && 
            isNavMenuVisible() &&
            !navbarMenu.contains(e.target) && 
            !newToggler.contains(e.target)) {
            
            hideNavMenu();
        }
    });
    
    // Add window resize handler
    window.addEventListener('resize', function() {
        handleWindowResize();
    });
    
    // Set initial state
    handleWindowResize();
    
    /**
     * Toggle the navigation menu visibility
     */
    function toggleNavMenu() {
        console.log('Toggling navigation menu');
        
        if (isNavMenuVisible()) {
            hideNavMenu();
        } else {
            showNavMenu();
        }
    }
    
    /**
     * Show the navigation menu
     */
    function showNavMenu() {
        navbarMenu.classList.add('show');
        
        // Force styles directly for maximum compatibility
        navbarMenu.styles.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            min-height: 300px !important;
            width: 100% !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 9999 !important;
            padding: 20px !important;
            margin-top: 0 !important;
            background: linear-gradient(45deg, #F8B840, #FFECC2) !important;
            border-radius: 0 0 8px 8px !important;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
            overflow-y: auto !important;
            border: 2px solid rgba(0,0,0,0.1) !important;
            transition: opacity 0.2s ease-in-out !important;
        `;
        
        // Style the navigation items
        styleNavItems();
        
        // For accessibility
        newToggler.setAttribute('aria-expanded', 'true');
    }
    
    /**
     * Hide the navigation menu
     */
    function hideNavMenu() {
        navbarMenu.classList.remove('show');
        
        // Force hiding with inline styles
        navbarMenu.styles.cssText = `
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        `;
        
        // For accessibility
        newToggler.setAttribute('aria-expanded', 'false');
    }
    
    /**
     * Style navigation items for better visibility
     */
    function styleNavItems() {
        // Only apply on mobile
        if (window.innerWidth >= 992) return;
        
        // Get navigation container
        const navContainer = navbarMenu.querySelector('.navbar-nav');
        if (navContainer) {
            navContainer.styles.cssText = `
                display: flex !important;
                flex-direction: column !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            `;
        }
        
        // Style individual items
        const navItems = navbarMenu.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.styles.cssText = `
                display: block !important;
                width: 100% !important;
                margin: 10px 0 !important;
                text-align: center !important;
            `;
        });
        
        // Style navigation links
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.styles.cssText = `
                display: block !important;
                width: 100% !important;
                padding: 15px !important;
                margin: 0 !important;
                border-radius: 5px !important;
                font-size: 18px !important;
                font-weight: 600 !important;
                color: #1A1718 !important;
                text-decoration: none !important;
                background-color: rgba(255, 255, 255, 0.3) !important;
                text-align: center !important;
                transition: all 0.2s ease !important;
            `;
            
            // Highlight active link
            if (link.classList.contains('active')) {
                link.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                link.style.borderLeft = '4px solid #F8B840';
            }
        });
    }
    
    /**
     * Handle window resize events
     */
    function handleWindowResize() {
        if (window.innerWidth >= 992) {
            // Desktop view - ensure menu is visible
            navbarMenu.classList.remove('show');
            navbarMenu.styles.cssText = `
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                height: auto !important;
                position: relative !important;
            `;
            
            // Reset styles on nav items
            const navItems = navbarMenu.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.removeAttribute('style');
            });
            
            const navLinks = navbarMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.removeAttribute('style');
            });
        } else {
            // Mobile view - hide menu initially
            if (!isNavMenuVisible()) {
                hideNavMenu();
            }
        }
    }
    
    /**
     * Check if the navigation menu is visible
     */
    function isNavMenuVisible() {
        return navbarMenu.classList.contains('show');
    }
} 