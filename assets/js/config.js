/**
 * Site Configuration
 * Centralized configuration for The Doll House website
 * All site-wide constants, URLs, and settings are defined here
 */

const SiteConfig = {
  // Site Information
  siteName: 'The Doll Haus',
  siteTitle: 'President Doll',
  siteDescription: 'Making the White House Femme Again - A trans woman\'s radical take on bimbo feminism, chosen family, and political resistance. Protect the dolls.',

  // Social Media Links
  social: {
    twitter: 'https://twitter.com/dollhouse',
    instagram: 'https://instagram.com/dollhouse',
    facebook: 'https://facebook.com/dollhouse',
    youtube: 'https://youtube.com/dollhouse'
  },

  // Navigation Structure
  navigation: {
    news: {
      label: 'News',
      items: ['Articles', 'Briefings & Statements', 'Fact Sheets', 'Presidential Actions', 'Remarks']
    },
    administration: {
      label: 'Administration',
      items: ['President Doll', 'Vice President Ken', 'First Doll Skipper', 'Second Doll Teresa', 'The Cabinet']
    },
    media: {
      label: 'Media',
      items: ['Video Library', 'Gallery', 'Live News', 'Doll House Wire']
    },
    priorities: {
      label: 'Priorities',
      items: ['Issues', 'Investments', 'Wins and Achievements']
    },
    history: {
      label: 'History',
      items: ['Founders Museum', 'Timeline', 'Government Information']
    },
    contact: {
      label: 'Get in Touch',
      items: ['Contact', 'Visit', 'Internships']
    }
  },

  // Feature Flags
  features: {
    enableSearch: true,
    enableNewsletter: true,
    enableCarousel: true,
    enableFloatingCTA: true
  },

  // Animation & Timing
  timing: {
    carouselAutoAdvance: 5000, // 5 seconds
    transitionSpeed: 300, // 300ms
    scrollThreshold: 50
  }
};

// Freeze config to prevent accidental modifications
Object.freeze(SiteConfig);
Object.freeze(SiteConfig.social);
Object.freeze(SiteConfig.navigation);
Object.freeze(SiteConfig.features);
Object.freeze(SiteConfig.timing);

// Export for ES6 modules (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SiteConfig;
}
