/**
 * Main JavaScript for GitHub Pages Site
 * Handles interactivity, animations, and user experience enhancements
 */

// ============================================
// DOM Ready Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeThemePreference();
});

// ============================================
// Navigation
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Remove any existing active class
        link.classList.remove('active');

        // Add active class based on current page
        if (link.getAttribute('href') === currentPath.split('/').pop() || 
            (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Scroll Effects
// ============================================

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation class
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// Theme Preference
// ============================================

function initializeThemePreference() {
    // Respect system preference for color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.style.colorScheme = 'dark';
    } else {
        document.documentElement.style.colorScheme = 'light';
    }

    // Listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Print Resume Functionality
// ============================================

function printResume() {
    window.print();
}

// Expose to global scope if needed
window.printResume = printResume;

// ============================================
// Utility: Check if Element is in Viewport
// ============================================

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Console Message (Easter Egg)
// ============================================

console.log('%cWelcome to Scotty Bowden\'s Professional Site', 'font-size: 16px; font-weight: bold; color: #2563eb;');
console.log('%cInterested in enterprise technology? Let\'s connect!', 'font-size: 14px; color: #6b7280;');
console.log('%cEmail: bowden.scotty@mayo.edu', 'font-size: 12px; color: #9ca3af;');
