/**
 * UI Interactions - Handles UI-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu debug code
    console.log('UI.js loaded - Adding mobile menu debugging');
    mobileMenuDebug();
});

// Button ripple effect
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Position the ripple where clicked
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add ripple to button
            button.appendChild(ripple);
            
            // Add active class to button
            button.classList.add('btn-active');
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
                button.classList.remove('btn-active');
            }, 600);
        });
    });
}); 

/**
 * Mobile menu debug helper
 */
function mobileMenuDebug() {
    // Direct approach - replace Bootstrap's toggle behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarResponsive');
    
    if (!navbarToggler || !navbarCollapse) {
        console.error('Mobile menu: Missing required elements');
        return;
    }
    
    // Remove existing listeners to avoid conflicts
    const newToggler = navbarToggler.cloneNode(true);
    navbarToggler.parentNode.replaceChild(newToggler, navbarToggler);
    
    // Add our own click handler that will always work
    newToggler.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the menu directly
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            newToggler.setAttribute('aria-expanded', 'false');
        } else {
            navbarCollapse.classList.add('show');
            newToggler.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
                newToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // Only on mobile and if menu is open
        if (window.innerWidth >= 992 || !navbarCollapse.classList.contains('show')) return;
        
        // Check if click is outside menu and toggle button
        if (!navbarCollapse.contains(e.target) && !newToggler.contains(e.target)) {
            navbarCollapse.classList.remove('show');
            newToggler.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Fix possible conflict with Bootstrap collapse
    // Remove Bootstrap data attributes to prevent any conflicts
    newToggler.removeAttribute('data-bs-toggle');
    newToggler.removeAttribute('data-bs-target');
} 