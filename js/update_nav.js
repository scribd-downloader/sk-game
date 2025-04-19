// Update navigation for all HTML pages
const fs = require('fs');
const path = require('path');

// The CSS file to include
const CSS_INCLUDE = '<link rel="stylesheet" href="./css/interactive-nav.css">';

// The navigation menu script to include
const NAV_SCRIPT = `
    <!-- Interactive Navigation Menu -->
    <script>
    (function() {
        console.log('Enhanced navigation menu running');
        
        function setupNavigation() {
            // Get menu elements
            var toggler = document.querySelector('.navbar-toggler');
            var menu = document.getElementById('navbarResponsive');
            
            // Check if they exist
            if (!toggler || !menu) {
                console.warn('Menu elements not found yet');
                // Try again after a short delay
                setTimeout(setupNavigation, 100);
                return;
            }
            
            console.log('Found menu elements, setting up enhanced toggler');
            
            // Reset Bootstrap attributes
            toggler.removeAttribute('data-bs-toggle');
            toggler.removeAttribute('data-bs-target');
            
            // Remove existing event listeners by cloning
            var newToggler = toggler.cloneNode(true);
            toggler.parentNode.replaceChild(newToggler, toggler);
            toggler = newToggler;
            
            // Create the toggle function
            function toggleMenu(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Navigation toggle clicked');
                
                // Check current state
                if (menu.classList.contains('show')) {
                    // HIDE MENU
                    menu.classList.remove('show');
                    
                    // Force hide with inline styles
                    menu.style.display = 'none';
                    menu.style.visibility = 'hidden';
                    menu.style.opacity = '0';
                    menu.style.height = '0';
                    menu.style.overflow = 'hidden';
                    
                    // For accessibility
                    toggler.setAttribute('aria-expanded', 'false');
                } else {
                    // SHOW MENU
                    menu.classList.add('show');
                    
                    // Force show with detailed inline styles
                    menu.style.display = 'block';
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                    menu.style.height = 'auto';
                    menu.style.width = '100%';
                    menu.style.position = 'absolute';
                    menu.style.top = '100%';
                    menu.style.left = '0';
                    menu.style.right = '0';
                    menu.style.zIndex = '9999';
                    menu.style.padding = '15px';
                    menu.style.background = 'linear-gradient(45deg, #F8B840, #FFECC2)';
                    menu.style.borderRadius = '0 0 8px 8px';
                    menu.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
                    menu.style.border = '2px solid rgba(0,0,0,0.1)';
                    menu.style.overflowY = 'auto';
                    
                    // For accessibility
                    toggler.setAttribute('aria-expanded', 'true');
                    
                    // Style navigation items for better visibility
                    var navItems = menu.querySelectorAll('.nav-item');
                    navItems.forEach(function(item) {
                        item.style.display = 'block';
                        item.style.width = '100%';
                        item.style.margin = '10px 0';
                        item.style.textAlign = 'center';
                    });
                    
                    var navLinks = menu.querySelectorAll('.nav-link');
                    navLinks.forEach(function(link) {
                        link.style.display = 'block';
                        link.style.width = '100%';
                        link.style.padding = '15px';
                        link.style.margin = '0';
                        link.style.borderRadius = '5px';
                        link.style.fontSize = '18px';
                        link.style.fontWeight = '600';
                        link.style.color = '#1A1718';
                        link.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                        link.style.transition = 'all 0.2s ease';
                        
                        // Highlight active link
                        if (link.classList.contains('active')) {
                            link.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                            link.style.borderLeft = '4px solid #F8B840';
                        }
                    });
                }
                
                return false;
            }
            
            // Add the toggler click event
            toggler.addEventListener('click', toggleMenu);
            
            // Close when clicking links
            var navLinks = menu.querySelectorAll('.nav-link');
            navLinks.forEach(function(link) {
                var newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                newLink.addEventListener('click', function() {
                    if (window.innerWidth < 992) {
                        menu.classList.remove('show');
                        menu.style.display = 'none';
                        toggler.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            
            // Close when clicking outside
            document.addEventListener('click', function(e) {
                if (window.innerWidth < 992 && 
                    menu.classList.contains('show') && 
                    !menu.contains(e.target) && 
                    !toggler.contains(e.target)) {
                    
                    menu.classList.remove('show');
                    menu.style.display = 'none';
                    toggler.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 992) {
                    // Desktop view - ensure menu is visible
                    menu.style.display = 'flex';
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                    menu.style.height = 'auto';
                    menu.style.position = 'relative';
                    menu.style.width = 'auto';
                    menu.style.background = 'none';
                    menu.style.boxShadow = 'none';
                    menu.style.border = 'none';
                    menu.style.padding = '0';
                    
                    // Reset styles on nav items for desktop
                    var navItems = menu.querySelectorAll('.nav-item');
                    navItems.forEach(function(item) {
                        item.removeAttribute('style');
                    });
                    
                    var navLinks = menu.querySelectorAll('.nav-link');
                    navLinks.forEach(function(link) {
                        link.removeAttribute('style');
                    });
                } else {
                    // Mobile view - hide menu initially unless it's actively shown
                    if (!menu.classList.contains('show')) {
                        menu.style.display = 'none';
                        menu.style.visibility = 'hidden';
                        menu.style.opacity = '0';
                        menu.style.height = '0';
                        menu.style.overflow = 'hidden';
                    }
                }
            });
            
            // Initial setup - hide menu on mobile
            if (window.innerWidth < 992) {
                menu.classList.remove('show');
                menu.style.display = 'none';
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
                menu.style.height = '0';
                menu.style.overflow = 'hidden';
            }
            
            console.log('Enhanced navigation menu setup complete');
        }
        
        // Call immediately and after a short delay to ensure it works
        setupNavigation();
        setTimeout(setupNavigation, 500);
        
        // Also set up after window load
        window.addEventListener('load', setupNavigation);
    })();
    </script>
`;

// Function to update a single HTML file
function updateHtmlFile(filePath) {
    try {
        console.log(`Processing ${filePath}...`);
        if (!fs.existsSync(filePath)) {
            console.error(`File ${filePath} does not exist.`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip already updated files
        if (content.includes('interactive-nav.css') && content.includes('Enhanced navigation menu running')) {
            console.log(`${filePath} already updated, skipping...`);
            return;
        }
        
        // Remove old CSS includes
        content = content.replace(/<link.*?ultra-menu\.css.*?>/g, '');
        content = content.replace(/<link.*?mobile-menu\.css.*?>/g, '');
        
        // Add new CSS include after animations.css
        content = content.replace(
            /<link.*?animations\.css.*?>/,
            match => match + '\n    ' + CSS_INCLUDE
        );
        
        // Remove old script includes
        content = content.replace(/<script.*?menu-vanilla\.js.*?><\/script>/g, '');
        content = content.replace(/<script.*?direct-menu\.js.*?><\/script>/g, '');
        
        // Remove old inline menu script and styles
        content = content.replace(/<!-- ULTRA DIRECT MOBILE MENU FIX -->[\s\S]*?<\/script>/m, '');
        content = content.replace(/<!-- Ultra direct menu visibility fix -->[\s\S]*?<\/style>/m, '');
        
        // Add new navigation script before </body>
        content = content.replace(/<\/body>/, NAV_SCRIPT + '\n</body>');
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath} successfully.`);
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
    }
}

// Process all HTML files in the directory
function updateAllHtmlFiles() {
    console.log('Starting update process for all HTML files...');
    
    try {
        // Get all HTML files in the current directory
        const files = fs.readdirSync('.')
            .filter(file => file.endsWith('.html'));
        
        if (files.length === 0) {
            console.log('No HTML files found in the current directory.');
            return;
        }
        
        console.log(`Found ${files.length} HTML files to process.`);
        
        // Process each file
        files.forEach(file => {
            updateHtmlFile(file);
        });
        
        console.log('Update process completed.');
    } catch (error) {
        console.error('Error updating HTML files:', error);
    }
}

// Run the update process
updateAllHtmlFiles(); 