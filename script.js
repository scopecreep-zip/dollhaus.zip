/**
 * The Doll House - President Barbie
 * JavaScript functionality matching whitehouse.gov interactions
 */

// =============================================================================
// Hamburger Menu Toggle (Upper Left)
// =============================================================================

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const menuLinks = document.querySelectorAll('.menu-link');
const navCloseBtns = document.querySelectorAll('.nav-close-btn');
const navSearchBtn = document.querySelector('.nav-search');
const navSearchContainer = document.getElementById('navSearchContainer');
const navSearchInput = document.querySelector('.nav-search-input');
const navOverlayHeader = document.getElementById('navOverlayHeader');
const navSearchHeader = document.getElementById('navSearchHeader');
const navOverlayContent = document.getElementById('navOverlayContent');
const navMenuBtn = document.querySelector('.nav-menu-btn');

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

// Handle search on Enter key
if (navSearchInput) {
    navSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchQuery = navSearchInput.value.trim();
            if (searchQuery) {
                // Perform search - you can customize this URL
                window.location.href = `#search?q=${encodeURIComponent(searchQuery)}`;
                // Or open in new tab: window.open(`/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
                console.log('Searching for:', searchQuery);
            }
        }
    });
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

// Toggle submenus
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
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
    });
});

// =============================================================================
// Hero Carousel
// =============================================================================

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let autoplayInterval;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Wrap around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Add active class to current slide and indicator
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// Button controls
if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
}

if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
}

// Indicator controls
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetAutoplay();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoplay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoplay();
    }
});

// Autoplay
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// Pause on hover
const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Start autoplay on load
    startAutoplay();
}

// =============================================================================
// Smooth Scrolling
// =============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const headerOffset = 100; // Account for sticky header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close menu if open
            if (primaryNav && primaryNav.classList.contains('active')) {
                primaryNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
});

// =============================================================================
// Newsletter Form Handler
// =============================================================================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Placeholder functionality - would normally send to backend
        if (email) {
            alert(`Thank you for subscribing!\n\nYou'll receive fabulous updates from President Barbie at: ${email}`);
            newsletterForm.reset();
        }
    });
}

// =============================================================================
// Load Governance Content
// =============================================================================

async function loadGovernanceContent() {
    const governanceContainer = document.getElementById('governance-content');

    if (!governanceContainer) return;

    try {
        const response = await fetch('governance.md');

        if (response.ok) {
            const content = await response.text();
            const htmlContent = convertMarkdownToHTML(content);
            governanceContainer.innerHTML = htmlContent;
        } else {
            // Fallback content
            showFallbackGovernance(governanceContainer);
        }
    } catch (error) {
        // Error fallback
        showFallbackGovernance(governanceContainer);
    }
}

function showFallbackGovernance(container) {
    container.innerHTML = `
        <div class="governance-fallback">
            <h3>Governance & Policy Structure</h3>
            <p>The Doll House operates under a comprehensive governance framework designed to ensure fairness, transparency, and fabulousness for all.</p>

            <h3>Three Branches of Government:</h3>
            <ul>
                <li><strong>Executive Branch</strong> - President Barbie and Vice President Ken lead the administration</li>
                <li><strong>Legislative Branch</strong> - The Doll Congress creates laws and policies</li>
                <li><strong>Judicial Branch</strong> - The Supreme Doll Court interprets laws</li>
            </ul>

            <h3>Core Policy Areas:</h3>
            <ul>
                <li>Education and Career Development</li>
                <li>Fashion and Creative Expression</li>
                <li>Health and Wellness</li>
                <li>Environmental Sustainability</li>
                <li>International Doll Relations</li>
            </ul>

            <p><em>To customize this content, create a <code>governance.md</code> file in your repository root.</em></p>
        </div>
    `;
}

// Simple Markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    let html = markdown;

    // Headers (must be done in order from largest to smallest)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h3>$1</h3>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert line breaks to <br> except in lists
    const lines = html.split('\n');
    let inList = false;
    let result = [];
    let listItems = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Check for list items
        if (trimmedLine.match(/^[\*\-] /)) {
            const listItem = trimmedLine.replace(/^[\*\-] /, '');
            listItems.push(`<li>${listItem}</li>`);
            inList = true;
        } else {
            // If we were in a list, close it
            if (inList && listItems.length > 0) {
                result.push('<ul>' + listItems.join('') + '</ul>');
                listItems = [];
                inList = false;
            }

            // Add the line
            if (trimmedLine) {
                result.push(trimmedLine);
            }
        }
    });

    // Close any remaining list
    if (listItems.length > 0) {
        result.push('<ul>' + listItems.join('') + '</ul>');
    }

    html = result.join('\n');

    // Paragraph wrapping for non-HTML lines
    html = html.replace(/^(?!<[h|u|p])(.*?)$/gm, (match, content) => {
        if (content.trim()) {
            return `<p>${content}</p>`;
        }
        return '';
    });

    return html;
}

// =============================================================================
// Search Toggle (Placeholder)
// =============================================================================

const searchToggle = document.querySelector('.search-toggle');
if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        alert('Search functionality - Placeholder\n\nThis would open a search modal or redirect to a search page.');
    });
}

// =============================================================================
// Scroll Effects
// =============================================================================

let lastScrollY = window.pageYOffset;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    // Enhanced shadow on scroll
    if (currentScrollY > 50 && header) {
        header.style.boxShadow = '12px 12px 50px rgba(224, 33, 138, 0.4)';
    } else if (header) {
        header.style.boxShadow = '6px 6px 9px rgba(224, 33, 138, 0.2)';
    }

    lastScrollY = currentScrollY;
});

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
    const cards = document.querySelectorAll('.admin-card, .media-block, .featured-block');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Load governance content
    loadGovernanceContent();

    // Floating Join Button Close Functionality
    const floatingJoinBtn = document.getElementById('floatingJoinBtn');
    const joinCloseBtn = document.querySelector('.join-close-btn');

    if (joinCloseBtn && floatingJoinBtn) {
        joinCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            floatingJoinBtn.hidden = true;
        });
    }
});

// =============================================================================
// Resize Handler
// =============================================================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset menu state on resize
        if (primaryNav && primaryNav.classList.contains('active')) {
            primaryNav.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }, 250);
});

// =============================================================================
// Console Welcome Message
// =============================================================================

console.log('%c💖 The Doll House - President Barbie 💖', 'color: #E0218A; font-size: 24px; font-weight: bold;');
console.log('%cYou can be anything - including President!', 'color: #9B59B6; font-size: 14px;');
console.log('%c\nWebsite built with Barbie colors and White House structure.', 'color: #FF69B4; font-size: 12px;');
