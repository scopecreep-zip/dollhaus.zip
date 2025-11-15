/**
 * Utility Functions
 * Reusable helper functions for The Doll House website
 */

const Utils = {
  /**
   * DOM Utilities
   */
  DOM: {
    /**
     * Select single element with error handling
     */
    select(selector, context = document) {
      const element = context.querySelector(selector);
      if (!element) {
        console.warn(`Element not found: ${selector}`);
      }
      return element;
    },

    /**
     * Select multiple elements
     */
    selectAll(selector, context = document) {
      return Array.from(context.querySelectorAll(selector));
    },

    /**
     * Toggle element visibility
     */
    toggle(element, forceShow = null) {
      if (!element) return;

      if (forceShow === null) {
        element.style.display = element.style.display === 'none' ? '' : 'none';
      } else {
        element.style.display = forceShow ? '' : 'none';
      }
    },

    /**
     * Add event listener with delegation support
     */
    on(target, event, selectorOrCallback, callback) {
      if (typeof selectorOrCallback === 'function') {
        target.addEventListener(event, selectorOrCallback);
      } else {
        target.addEventListener(event, (e) => {
          if (e.target.matches(selectorOrCallback)) {
            callback(e);
          }
        });
      }
    }
  },

  /**
   * Animation & Timing Utilities
   */
  Animation: {
    /**
     * Debounce function calls
     */
    debounce(func, wait = 300) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle function calls
     */
    throttle(func, limit = 300) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * Smooth scroll to element
     */
    scrollTo(target, offset = 0) {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  },

  /**
   * State Management Utilities
   */
  State: {
    /**
     * Store data in localStorage with error handling
     */
    save(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
      }
    },

    /**
     * Retrieve data from localStorage
     */
    load(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
      }
    },

    /**
     * Remove item from localStorage
     */
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Error removing from localStorage:', e);
        return false;
      }
    }
  },

  /**
   * URL & Navigation Utilities
   */
  URL: {
    /**
     * Get query parameter from URL
     */
    getParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },

    /**
     * Build URL with query parameters
     */
    buildURL(base, params = {}) {
      const url = new URL(base, window.location.origin);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
      return url.toString();
    },

    /**
     * Navigate to URL
     */
    navigate(url, newTab = false) {
      if (newTab) {
        window.open(url, '_blank');
      } else {
        window.location.href = url;
      }
    }
  },

  /**
   * Validation Utilities
   */
  Validate: {
    /**
     * Validate email address
     */
    email(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    /**
     * Check if string is not empty
     */
    notEmpty(str) {
      return typeof str === 'string' && str.trim().length > 0;
    }
  }
};

// Freeze utils to prevent modifications
Object.freeze(Utils);
Object.freeze(Utils.DOM);
Object.freeze(Utils.Animation);
Object.freeze(Utils.State);
Object.freeze(Utils.URL);
Object.freeze(Utils.Validate);

// Export for ES6 modules (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
