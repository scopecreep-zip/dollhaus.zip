# Footer Component

A reusable universal footer component matching the whitehouse.gov design pattern.

## Features

- **Whitehouse.gov-inspired layout**: 2-column grid with 3 sub-columns in the center
- **Navigation links**: Left column and center-left navigation
- **Logo & Newsletter**: Centered logo with newsletter signup form
- **Address & Social**: Right-aligned contact information and social media links
- **Bottom bar**: Brand link, legal links, and "Back to top" button with vertical separator
- **Configurable paths**: Works for pages at any directory level
- **Auto-renders social links**: Automatically includes social media icons

## Basic Usage

### 1. Add a container in your HTML

```html
<!-- Before closing body tag -->
<div id="footerContainer"></div>
```

### 2. Initialize the component in JavaScript

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('#footerContainer');
    if (footerContainer) {
        Components.Footer.render(footerContainer);
    }
});
```

## Configuration Options

```javascript
Components.Footer.render(container, {
    siteName: 'THE DOLL HOUSE',           // Site name in logo
    address: {
        line1: 'THE DOLL HOUSE',           // Address line 1
        line2: '1600 Pennsylvania Ave NW', // Address line 2
        line3: 'Washington, DC 20500'      // Address line 3
    },
    brandLink: 'DOLLHAUS.ZIP',             // Text for brand link in bottom bar
    brandHref: 'index.html',               // URL for brand link
    basePath: ''                           // Path prefix for links
});
```

## Path Configuration

The `basePath` option adjusts all internal links for pages at different directory levels:

### Root Level (index.html)
```javascript
Components.Footer.render(footerContainer, {
    basePath: '' // No prefix needed
});
```

### Landing Pages (pages/news.html, pages/administration.html)
```javascript
Components.Footer.render(footerContainer, {
    basePath: '../',
    brandHref: '../index.html'
});
```

### Subdirectory Pages (pages/news/articles.html)
```javascript
Components.Footer.render(footerContainer, {
    basePath: '../../',
    brandHref: '../../index.html'
});
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <main>
        <!-- Your page content -->
    </main>

    <!-- Footer Container -->
    <div id="footerContainer"></div>

    <!-- Load scripts -->
    <script src="../assets/js/config.js"></script>
    <script src="../assets/js/utils.js"></script>
    <script src="../assets/js/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            Components.Footer.render(document.querySelector('#footerContainer'), {
                basePath: '../',
                brandHref: '../index.html'
            });
        });
    </script>
</body>
</html>
```

## Styling

All footer styles are defined in `assets/css/styles.css`. The component uses:

- `.site-footer` - Main footer container
- `.footer-main` - Main footer section with dark background
- `.footer-grid` - 2-column grid layout
- `.footer-nav-left`, `.footer-nav-center`, `.footer-nav-right` - Navigation columns
- `.footer-center` - Center column with 3 sub-columns
- `.footer-logo`, `.footer-newsletter-main`, `.footer-address`, `.footer-social` - Content sections
- `.footer-bottom-bar` - Bottom bar with brand, legal links, and back-to-top
- `.footer-brand`, `.footer-legal`, `.back-to-top` - Bottom bar elements

## Navigation Links

The footer includes these navigation sections:

**Left Column:**
- NEWS, WIRE, ISSUES, CONTACT, VISIT, EOP

**Center-Left:**
- ADMINISTRATION, GALLERY, VIDEO LIBRARY, AMERICA 250, FOUNDING FATHERS, THE SIGNERS

**Center:**
- Logo and newsletter signup

**Right:**
- Address and social media links

**Bottom Bar:**
- Brand link (left)
- Copyright & Privacy (center-left)
- Back to top (right, with separator line)

## Social Media

The footer automatically renders social media icons using the `SocialLinks` component. Configure social links in `assets/js/config.js`:

```javascript
const SiteConfig = {
    social: {
        twitter: 'https://twitter.com/example',
        instagram: 'https://instagram.com/example',
        facebook: 'https://facebook.com/example',
        youtube: 'https://youtube.com/example'
    }
};
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The component automatically renders social links after the footer HTML is inserted
- Newsletter form submission needs backend integration (currently placeholder)
- All navigation paths are configurable via the `basePath` option
- The footer maintains full-width layout with flush left/right edges on the bottom bar
- The "Back to top" link scrolls to `#top` anchor (add `id="top"` to your page top element)
