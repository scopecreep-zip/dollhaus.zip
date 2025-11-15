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
  }
};

// Freeze components to prevent modifications
Object.freeze(Components);
Object.freeze(Components.SocialLinks);
Object.freeze(Components.Navigation);
Object.freeze(Components.Carousel);
Object.freeze(Components.Form);
Object.freeze(Components.Search);

// Export for ES6 modules (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Components;
}
