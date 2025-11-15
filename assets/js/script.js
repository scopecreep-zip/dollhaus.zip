/**
 * The Doll House - President Doll
 * JavaScript functionality matching whitehouse.gov interactions
 * Refactored to use modular architecture with config, utils, and components
 */

// =============================================================================
// Hamburger Menu Toggle (Upper Left)
// =============================================================================

const menuToggle = Utils.DOM.select('.menu-toggle');
const primaryNav = Utils.DOM.select('.primary-nav');
const menuLinks = Utils.DOM.selectAll('.menu-link');
const navCloseBtns = Utils.DOM.selectAll('.nav-close-btn');
const navSearchBtn = Utils.DOM.select('.nav-search');
const navSearchContainer = Utils.DOM.select('#navSearchContainer');
const navSearchInput = Utils.DOM.select('.nav-search-input');
const navOverlayHeader = Utils.DOM.select('#navOverlayHeader');
const navSearchHeader = Utils.DOM.select('#navSearchHeader');
const navOverlayContent = Utils.DOM.select('#navOverlayContent');
const navMenuBtn = Utils.DOM.select('.nav-menu-btn');

// Function to close menu
function closeMenu() {
    primaryNav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Reset to menu view
    showMenuView();
}

// Function to show menu view
function showMenuView() {
    if (navOverlayHeader) navOverlayHeader.style.display = 'flex';
    if (navSearchHeader) navSearchHeader.style.display = 'none';
    if (navSearchContainer) navSearchContainer.style.display = 'none';
    if (navOverlayContent) navOverlayContent.style.display = 'block';
}

// Function to show search view
function showSearchView() {
    if (navOverlayHeader) navOverlayHeader.style.display = 'none';
    if (navSearchHeader) navSearchHeader.style.display = 'flex';
    if (navSearchContainer) navSearchContainer.style.display = 'flex';
    if (navOverlayContent) navOverlayContent.style.display = 'none';
    if (navSearchInput) navSearchInput.focus();
}

// Handle search on Enter key using Component
if (navSearchInput) {
    Components.Search.init(navSearchInput, Components.Search.performSearch);
}

// Toggle main menu overlay
if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('active');
        const isExpanded = primaryNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);

        // Prevent body scroll when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking X button (both headers)
    navCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeMenu);
    });

    // Toggle search view
    if (navSearchBtn) {
        navSearchBtn.addEventListener('click', showSearchView);
    }

    // Back to menu from search
    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', showMenuView);
    }

    // Close menu when clicking outside
    primaryNav.addEventListener('click', (e) => {
        if (e.target === primaryNav) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && primaryNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Handle submenus
menuLinks.forEach(link => {
    // Desktop: hover to show and persist
    link.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            const submenu = link.nextElementSibling;

            // Remove active from all other submenus
            menuLinks.forEach(otherLink => {
                const otherSubmenu = otherLink.nextElementSibling;
                if (otherSubmenu && otherSubmenu !== submenu) {
                    otherSubmenu.classList.remove('active');
                }
            });

            // Add active to current submenu
            if (submenu) {
                submenu.classList.add('active');
            }
        }
    });

    // Mobile: click to toggle
    link.addEventListener('click', (e) => {
        // Only handle clicks on mobile (below 768px)
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const isExpanded = link.getAttribute('aria-expanded') === 'true';
            const submenu = link.nextElementSibling;

            // Close all other submenus
            menuLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.setAttribute('aria-expanded', 'false');
                    const otherSubmenu = otherLink.nextElementSibling;
                    if (otherSubmenu) {
                        otherSubmenu.classList.remove('active');
                    }
                }
            });

            // Toggle current submenu
            link.setAttribute('aria-expanded', !isExpanded);
            if (submenu) {
                submenu.classList.toggle('active');
            }
        }
    });
});

// =============================================================================
// Hero Carousel (using Component)
// =============================================================================

const carouselContainer = Utils.DOM.select('.hero-carousel');
let carouselControls = null;

if (carouselContainer) {
    // Initialize carousel with component
    carouselControls = Components.Carousel.init(carouselContainer, {
        autoAdvance: SiteConfig.features.enableCarousel,
        interval: SiteConfig.timing.carouselAutoAdvance,
        pauseOnHover: true
    });

    // Set up button controls
    const prevButton = Utils.DOM.select('.carousel-control.prev', carouselContainer);
    const nextButton = Utils.DOM.select('.carousel-control.next', carouselContainer);

    if (nextButton && carouselControls) {
        nextButton.addEventListener('click', () => {
            carouselControls.next();
            carouselControls.stop();
            carouselControls.start();
        });
    }

    if (prevButton && carouselControls) {
        prevButton.addEventListener('click', () => {
            carouselControls.prev();
            carouselControls.stop();
            carouselControls.start();
        });
    }

    // Set up indicator controls
    const indicators = Utils.DOM.selectAll('.indicator', carouselContainer);
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (carouselControls) {
                carouselControls.goToSlide(index);
                carouselControls.stop();
                carouselControls.start();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!carouselControls) return;

        if (e.key === 'ArrowLeft') {
            carouselControls.prev();
            carouselControls.stop();
            carouselControls.start();
        } else if (e.key === 'ArrowRight') {
            carouselControls.next();
            carouselControls.stop();
            carouselControls.start();
        }
    });
}

// =============================================================================
// Smooth Scrolling (using Utils)
// =============================================================================

Utils.DOM.selectAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = Utils.DOM.select(href);

        if (target) {
            e.preventDefault();
            Utils.Animation.scrollTo(target, 100);

            // Close menu if open
            if (primaryNav && primaryNav.classList.contains('active')) {
                closeMenu();
            }
        }
    });
});

// =============================================================================
// Newsletter Form Handler (using Component)
// =============================================================================

const newsletterForm = Utils.DOM.select('.newsletter-form');
if (newsletterForm && SiteConfig.features.enableNewsletter) {
    Components.Form.onSubmit(newsletterForm, (formData) => {
        const email = formData.get('email');

        // Placeholder functionality - would normally send to backend
        if (email) {
            alert(`Thank you for subscribing!\n\nYou'll receive fabulous updates from President Doll at: ${email}`);
            newsletterForm.reset();
        }
    });
}

// =============================================================================
// Initialize Governance Document Reader
// =============================================================================

function initGovernanceDocument() {
    Components.DocumentReader.init({
        containerId: 'governance-document',
        documentUrl: 'governance.md',
        documentType: 'Official Policy Document',
        documentTitle: 'Governance & Policy Structure',
        documentSubtitle: 'The Doll House Government Framework',
        lastUpdated: 'November 14, 2025',
        sections: [
            { id: 'doc-section-1', label: 'Overview' },
            { id: 'doc-section-2', label: 'Three Branches' },
            { id: 'doc-section-3', label: 'Core Policy Areas' },
            { id: 'doc-section-4', label: 'Legislative Process' },
            { id: 'doc-section-5', label: 'Rights & Responsibilities' },
            { id: 'doc-section-6', label: 'Transparency' },
            { id: 'doc-section-7', label: 'Amendment Process' }
        ]
    });
}

// =============================================================================
// Search Toggle (Placeholder)
// =============================================================================

const searchToggle = Utils.DOM.select('.search-toggle');
if (searchToggle && SiteConfig.features.enableSearch) {
    searchToggle.addEventListener('click', () => {
        alert('Search functionality - Placeholder\n\nThis would open a search modal or redirect to a search page.');
    });
}

// =============================================================================
// Scroll Effects (using Utils throttle)
// =============================================================================

const header = Utils.DOM.select('.site-header');

const handleScroll = Utils.Animation.throttle(() => {
    const currentScrollY = window.pageYOffset;

    // Enhanced shadow on scroll
    if (currentScrollY > SiteConfig.timing.scrollThreshold && header) {
        header.style.boxShadow = '12px 12px 50px rgba(224, 33, 138, 0.4)';
    } else if (header) {
        header.style.boxShadow = '6px 6px 9px rgba(224, 33, 138, 0.2)';
    }
}, SiteConfig.timing.transitionSpeed);

window.addEventListener('scroll', handleScroll);

// =============================================================================
// Intersection Observer for Animations
// =============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = Utils.DOM.selectAll('.admin-card, .media-block, .featured-block');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Initialize governance document reader
    initGovernanceDocument();

    // Render social links using Component
    const headerSocialContainer = Utils.DOM.select('#headerSocialLinks');
    const footerSocialContainer = Utils.DOM.select('#footerSocialLinks');

    if (headerSocialContainer) {
        Components.SocialLinks.render(headerSocialContainer);
    }

    if (footerSocialContainer) {
        Components.SocialLinks.render(footerSocialContainer);
    }

    // Floating Join Button Close Functionality
    const floatingJoinBtn = Utils.DOM.select('#floatingJoinBtn');
    const joinCloseBtn = Utils.DOM.select('.join-close-btn');

    if (joinCloseBtn && floatingJoinBtn) {
        joinCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            floatingJoinBtn.hidden = true;
        });
    }
});

// =============================================================================
// Resize Handler (using Utils debounce)
// =============================================================================

const handleResize = Utils.Animation.debounce(() => {
    // Reset menu state on resize
    if (primaryNav && primaryNav.classList.contains('active')) {
        closeMenu();
    }
}, 250);

window.addEventListener('resize', handleResize);

// =============================================================================
// Console Welcome Message (using Config)
// =============================================================================

console.log(`%c💖 ${SiteConfig.siteName} - ${SiteConfig.siteTitle} 💖`, 'color: #E0218A; font-size: 24px; font-weight: bold;');
console.log('%cYou can be anything - including President!', 'color: #9B59B6; font-size: 14px;');
console.log('%c\nWebsite built with modern modular architecture.', 'color: #FF69B4; font-size: 12px;');
