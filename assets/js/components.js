/**
 * UI Components
 * Reusable UI component functions for The Doll House website
 */

const Components = {
  /**
   * Social Links Component
   * Renders social media links from config
   */
  SocialLinks: {
    render(container, links = SiteConfig.social) {
      if (!container) return;

      const socialHTML = Object.entries(links).map(([platform, url]) => {
        const icons = {
          twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
          instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>',
          facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
          youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>'
        };

        return `
          <a href="${url}" aria-label="${platform.charAt(0).toUpperCase() + platform.slice(1)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              ${icons[platform] || ''}
            </svg>
          </a>
        `;
      }).join('');

      container.innerHTML = socialHTML;
    }
  },

  /**
   * Navigation Component
   * Handles navigation menu functionality
   */
  Navigation: {
    init(menuElement, toggleButton) {
      if (!menuElement || !toggleButton) return;

      const state = {
        isOpen: false,
        activeSubmenu: null
      };

      const toggle = () => {
        state.isOpen = !state.isOpen;
        menuElement.classList.toggle('active', state.isOpen);
        toggleButton.setAttribute('aria-expanded', state.isOpen);
        document.body.style.overflow = state.isOpen ? 'hidden' : '';
      };

      const close = () => {
        if (state.isOpen) {
          state.isOpen = false;
          menuElement.classList.remove('active');
          toggleButton.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      };

      return { toggle, close, state };
    }
  },

  /**
   * Carousel Component
   * Manages carousel functionality
   */
  Carousel: {
    init(container, options = {}) {
      if (!container) return;

      const defaults = {
        autoAdvance: true,
        interval: SiteConfig.timing.carouselAutoAdvance,
        pauseOnHover: true
      };

      const settings = { ...defaults, ...options };
      const slides = Utils.DOM.selectAll('.carousel-slide', container);
      const indicators = Utils.DOM.selectAll('.indicator', container);

      let currentIndex = 0;
      let intervalId = null;

      const goToSlide = (index) => {
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
      };

      const next = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      };

      const prev = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
      };

      const start = () => {
        if (settings.autoAdvance && !intervalId) {
          intervalId = setInterval(next, settings.interval);
        }
      };

      const stop = () => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };

      // Auto-advance
      if (settings.autoAdvance) {
        start();

        if (settings.pauseOnHover) {
          container.addEventListener('mouseenter', stop);
          container.addEventListener('mouseleave', start);
        }
      }

      return { goToSlide, next, prev, start, stop };
    }
  },

  /**
   * Form Component
   * Handles form validation and submission
   */
  Form: {
    validate(form) {
      if (!form) return false;

      const inputs = Utils.DOM.selectAll('input[required], textarea[required]', form);
      let isValid = true;

      inputs.forEach(input => {
        const value = input.value.trim();

        if (input.type === 'email') {
          if (!Utils.Validate.email(value)) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        } else {
          if (!Utils.Validate.notEmpty(value)) {
            isValid = false;
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        }
      });

      return isValid;
    },

    onSubmit(form, callback) {
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (Components.Form.validate(form)) {
          callback(new FormData(form));
        }
      });
    }
  },

  /**
   * Search Component
   * Handles search functionality
   */
  Search: {
    init(input, onSearch) {
      if (!input) return;

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = input.value.trim();
          if (query && onSearch) {
            onSearch(query);
          }
        }
      });
    },

    performSearch(query) {
      const searchURL = Utils.URL.buildURL('#search', { q: query });
      Utils.URL.navigate(searchURL);
      console.log('Searching for:', query);
    }
  },

  /**
   * DocumentReader Component
   * Creates a government-style document reader with sidebar navigation
   */
  DocumentReader: {
    /**
     * Initialize a document reader
     * @param {Object} options - Configuration options
     * @param {string} options.containerId - ID of the container element
     * @param {string} options.documentUrl - URL to fetch markdown document
     * @param {string} options.documentType - Type label (e.g., "Official Policy Document")
     * @param {string} options.documentTitle - Main document title
     * @param {string} options.documentSubtitle - Document subtitle
     * @param {string} options.lastUpdated - Last updated date
     * @param {Function} options.onLoad - Callback after document loads
     */
    init(options) {
      const container = Utils.DOM.select(`#${options.containerId}`);
      if (!container) {
        console.warn(`DocumentReader: Container #${options.containerId} not found`);
        return null;
      }

      // Render the document reader HTML (without sections initially)
      this.render(container, options);

      // Load the document content
      this.loadDocument(options);

      return {
        reload: () => this.loadDocument(options),
        updateContent: (html) => this.updateContent(options.containerId, html)
      };
    },

    /**
     * Render document reader HTML structure
     */
    render(container, options) {
      container.innerHTML = `
        <div class="document-reader">
          <!-- Document Sidebar Navigation -->
          <aside class="document-nav">
            <div class="document-nav-header">
              <h3>Table of Contents</h3>
            </div>
            <nav class="document-nav-menu" id="${options.containerId}-nav">
              <p class="loading-text">Loading table of contents...</p>
            </nav>
            <div class="document-meta">
              <p class="doc-meta-label">Last Updated</p>
              <p class="doc-meta-value">${options.lastUpdated}</p>
            </div>
          </aside>

          <!-- Document Content Area -->
          <article class="document-content">
            <div class="document-header">
              <p class="document-type">${options.documentType}</p>
              <h1 class="document-title">${options.documentTitle}</h1>
              <p class="document-subtitle">${options.documentSubtitle}</p>
            </div>

            <div class="document-body" data-container-id="${options.containerId}">
              <p class="loading-text">Loading document...</p>
            </div>

            <!-- Document Actions -->
            <div class="document-actions">
              <button class="doc-action-btn" onclick="window.print()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="currentColor" stroke-width="2"/>
                  <rect x="6" y="14" width="12" height="8" stroke="currentColor" stroke-width="2"/>
                </svg>
                Print Document
              </button>
              <button class="doc-action-btn" onclick="navigator.share ? navigator.share({title: '${options.documentTitle}', url: window.location.href}) : alert('Share this page: ' + window.location.href)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" stroke-width="2"/>
                </svg>
                Share
              </button>
            </div>
          </article>
        </div>
      `;
    },

    /**
     * Load document from URL
     */
    async loadDocument(options) {
      const container = Utils.DOM.select(`#${options.containerId}`);
      if (!container) {
        console.warn('DocumentReader: Container not found');
        return;
      }

      const documentBody = Utils.DOM.select('.document-body', container);

      if (!documentBody) {
        console.warn('DocumentReader: Document body not found');
        return;
      }

      try {
        console.log('DocumentReader: Fetching', options.documentUrl);
        const response = await fetch(options.documentUrl);

        if (response.ok) {
          const content = await response.text();
          console.log('DocumentReader: Content loaded, length:', content.length);
          const htmlContent = this.convertMarkdownToHTML(content);
          documentBody.innerHTML = htmlContent;

          // Generate table of contents dynamically from headings
          this.generateTableOfContents(documentBody, options.containerId);

          // Initialize navigation
          this.initNavigation(options.containerId);

          // Call onLoad callback if provided
          if (options.onLoad) {
            options.onLoad();
          }
        } else {
          console.warn('DocumentReader: Fetch failed with status', response.status);
          // Fallback content
          this.showFallback(documentBody, options);
        }
      } catch (error) {
        console.error('DocumentReader: Error loading document', error);
        this.showFallback(documentBody, options);
      }
    },

    /**
     * Generate table of contents from document headings
     */
    generateTableOfContents(documentBody, containerId) {
      const navMenu = Utils.DOM.select(`#${containerId}-nav`);
      if (!navMenu) return;

      // Find all h2 headings (main sections)
      const headings = Utils.DOM.selectAll('h2', documentBody);

      if (headings.length === 0) {
        navMenu.innerHTML = '<p class="loading-text">No sections found</p>';
        return;
      }

      // Generate navigation links
      const navLinks = headings.map((heading, index) => {
        // Create a slug from heading text
        const text = heading.textContent.trim();
        const slug = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-')      // Replace spaces with hyphens
          .replace(/--+/g, '-');     // Replace multiple hyphens with single

        const id = `doc-section-${slug}`;

        // Add ID to heading
        heading.id = id;

        // Return navigation link HTML
        return `<a href="#${id}" class="doc-nav-link ${index === 0 ? 'active' : ''}">${text}</a>`;
      }).join('');

      navMenu.innerHTML = navLinks;
    },

    /**
     * Show fallback content
     */
    showFallback(documentBody, options) {
      console.log('DocumentReader: Showing fallback content');
      documentBody.innerHTML = `
        <h2>Overview</h2>
        <p>The Doll Haus operates under a comprehensive governance framework based on ballroom culture's haus system.</p>
        <h2>Core Principles</h2>
        <p>Our governance is built on protecting the dolls, chosen family, bimbo feminism, sex worker rights, and ballroom culture preservation.</p>
        <h2>The Three Branches</h2>
        <p>The Mother (Executive), The House (Legislative), and The Elders (Judicial) work together through community care and restorative justice.</p>
      `;

      // Generate TOC from fallback content
      this.generateTableOfContents(documentBody, options.containerId);
      this.initNavigation(options.containerId);
    },

    /**
     * Update document content directly
     */
    updateContent(containerId, html) {
      const documentBody = Utils.DOM.select(`[data-container-id="${containerId}"] .document-body`);
      if (documentBody) {
        documentBody.innerHTML = html;
      }
    },

    /**
     * Initialize document navigation
     */
    initNavigation(containerId) {
      const container = Utils.DOM.select(`#${containerId}`);
      if (!container) return;

      const navLinks = Utils.DOM.selectAll('.doc-nav-link', container);
      const documentBody = Utils.DOM.select('.document-body', container);
      const sections = Utils.DOM.selectAll('.document-body h2', container);

      if (navLinks.length === 0 || !documentBody || sections.length === 0) return;

      // Scroll spy - highlight active section
      const scrollSpy = Utils.Animation.throttle(() => {
        let currentSection = '';
        const scrollPosition = documentBody.scrollTop + 100;

        sections.forEach(section => {
          const sectionTop = section.offsetTop - documentBody.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
      }, 100);

      // Listen to scroll events on the document body container
      documentBody.addEventListener('scroll', scrollSpy);

      // Smooth scroll for nav links
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetSection = Utils.DOM.select(`#${targetId}`, container);

          if (targetSection && documentBody) {
            const targetPosition = targetSection.offsetTop - documentBody.offsetTop - 20;

            documentBody.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    },

    /**
     * Convert Markdown to HTML
     */
    convertMarkdownToHTML(markdown) {
      let html = markdown;

      // Headers (must be done in order from largest to smallest)
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');

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

      // Lists and paragraphs
      const lines = html.split('\n');
      let inList = false;
      let result = [];
      let listItems = [];

      lines.forEach(line => {
        const trimmedLine = line.trim();

        if (trimmedLine.match(/^[\*\-] /)) {
          const listItem = trimmedLine.replace(/^[\*\-] /, '');
          listItems.push(`<li>${listItem}</li>`);
          inList = true;
        } else {
          if (inList && listItems.length > 0) {
            result.push('<ul>' + listItems.join('') + '</ul>');
            listItems = [];
            inList = false;
          }

          if (trimmedLine) {
            result.push(trimmedLine);
          }
        }
      });

      if (listItems.length > 0) {
        result.push('<ul>' + listItems.join('') + '</ul>');
      }

      html = result.join('\n');

      // Paragraph wrapping for non-HTML lines
      html = html.replace(/^(?!<[hup])(.*?)$/gm, (match, content) => {
        if (content.trim()) {
          return `<p>${content}</p>`;
        }
        return '';
      });

      return html;
    }
  },

  /**
   * Footer Component
   * Renders the universal footer for all pages
   */
  Footer: {
    render(container, options = {}) {
      console.log('Footer.render called', container);
      if (!container) {
        console.error('Footer.render: No container provided');
        return;
      }

      const defaults = {
        siteName: 'THE DOLL HAUS',
        address: {
          line1: 'THE DOLL HAUS',
          line2: '1600 Pennsylvania Ave NW',
          line3: 'Washington, DC 20500'
        },
        brandLink: 'DOLLHAUS.ZIP',
        brandHref: 'index.html',
        basePath: '' // For pages in subdirectories, set to '../' or '../../'
      };

      // Merge options with defaults (Safari-compatible)
      const config = Object.assign({}, defaults, options);
      if (options.address) {
        config.address = Object.assign({}, defaults.address, options.address);
      }
      const bp = config.basePath; // Shorthand for base path

      const footerHTML = `
        <footer class="site-footer" id="contact">
          <!-- Main Footer - 3 Columns -->
          <div class="footer-main">
            <div class="container">
              <div class="footer-grid">
                <!-- Left Column: Navigation -->
                <nav class="footer-nav-left">
                  <ul>
                    <li><a href="${bp}pages/news.html">NEWS</a></li>
                    <li><a href="${bp}pages/media/wire.html">WIRE</a></li>
                    <li><a href="${bp}pages/priorities/priorities.html">ISSUES</a></li>
                    <li><a href="${bp}pages/contact/contact.html">CONTACT</a></li>
                    <li><a href="${bp}pages/contact/visit.html">VISIT</a></li>
                    <li><a href="${bp}pages/eop/eop.html">EOP</a></li>
                  </ul>
                </nav>

                <!-- Center Column: 3 sub-columns -->
                <div class="footer-center">
                  <!-- Sub-column 1: Navigation -->
                  <nav class="footer-nav-center">
                    <ul>
                      <li><a href="${bp}pages/administration.html">ADMINISTRATION</a></li>
                      <li><a href="${bp}pages/media/gallery.html">GALLERY</a></li>
                      <li><a href="${bp}pages/media/videos.html">VIDEO LIBRARY</a></li>
                      <li><a href="${bp}pages/history/america-250.html">AMERICA 250</a></li>
                      <li><a href="${bp}pages/history/founding-fathers.html">FOUNDING FATHERS</a></li>
                      <li><a href="${bp}pages/history.html">THE SIGNERS</a></li>
                    </ul>
                  </nav>

                  <!-- Sub-column 2: Logo & Newsletter -->
                  <div class="footer-center-middle">
                    <div class="footer-logo">
                      <h3 style="color: var(--color-secondary); font-family: var(--font-serif); margin: 0;">${config.siteName}</h3>
                    </div>
                    <div class="footer-newsletter-main">
                      <h4>Subscribe to The Doll Haus newsletter</h4>
                      <form class="newsletter-form-main">
                        <input type="email" placeholder="Your email" aria-label="Email address" required>
                        <button type="submit">SIGN UP</button>
                      </form>
                      <p class="sms-text">📱 Text PROTECT to 45470 to receive updates</p>
                    </div>
                  </div>

                  <!-- Sub-column 3: Address & Social -->
                  <div class="footer-center-right">
                    <div class="footer-address">
                      <p><strong>${config.address.line1}</strong><br>
                      ${config.address.line2}<br>
                      ${config.address.line3}</p>
                    </div>
                    <div class="footer-social">
                      <ul id="footerSocialLinks">
                        <!-- Social links will be rendered by Components.SocialLinks -->
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="footer-bottom-bar">
            <div class="container">
              <div class="footer-bottom-content">
                <a href="${config.brandHref}" class="footer-brand">${config.brandLink}</a>
                <div class="footer-legal">
                  <a href="${bp}pages/legal/copyright.html">Copyright</a>
                  <a href="${bp}pages/legal/privacy.html">Privacy</a>
                </div>
                <a href="#top" class="back-to-top" title="Back to top">↑ Back to top</a>
              </div>
            </div>
          </div>
        </footer>
      `;

      container.innerHTML = footerHTML;

      // Render social links after footer is in DOM
      setTimeout(() => {
        const socialContainer = document.querySelector('#footerSocialLinks');
        if (socialContainer) {
          Components.SocialLinks.render(socialContainer);
        }
      }, 0);
    }
  }
};

// Freeze components to prevent modifications
Object.freeze(Components);
Object.freeze(Components.SocialLinks);
Object.freeze(Components.Navigation);
Object.freeze(Components.Carousel);
Object.freeze(Components.Form);
Object.freeze(Components.Search);
Object.freeze(Components.DocumentReader);
Object.freeze(Components.Footer);

// Export for ES6 modules (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Components;
}
