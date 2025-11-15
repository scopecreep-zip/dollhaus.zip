# The Doll House - President Barbie Website

A fabulous **1:1 recreation** of the White House website (whitehouse.gov), reimagined with Barbie colors and themes!

## 1:1 White House Recreation

This website is an exact structural replica of whitehouse.gov with Barbie theming:

- **Exact Layout**: Matching whitehouse.gov's sections, grid systems, and content hierarchy
- **Typography**: Uses Instrument Sans & Instrument Serif fonts (same as whitehouse.gov)
- **Spacing System**: Fluid spacing with clamp() functions matching WH responsive design
- **Navigation Structure**: Identical menu structure with dropdowns for News, Administration, Media, Priorities, History, and Get in Touch
- **Hero Carousel**: Full-width rotating carousel like whitehouse.gov with 3 slides
- **Content Sections**: Matching order - Announcement Banner → Hero → Administration Grid → Featured Blocks → Priorities → Governance → Media → Newsletter
- **Barbie Color Adaptation**: Navy blues (#030A1B, #0D132D) → Barbie pinks (#E0218A, #C71585, #FF69B4, #9B59B6)

## Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Barbie Color Palette**: Pink (#E0218A), purple (#9B59B6), lavender (#E6B3E6), and gold (#FFD700)
- **Complete White House Structure**:
  - Header with navigation and social links
  - Hero section with call-to-action
  - Administration profiles section
  - Priorities showcase
  - **Governance & Policy section** (reads from `governance.md`)
  - Image carousel gallery
  - Executive actions/news
  - Newsletter signup
  - Comprehensive footer

## Dynamic Governance Section

The "Governance & Policy by the Dolls" section automatically reads from the `governance.md` file in your repository. This allows you to:

1. Edit governance structure in a simple markdown file
2. Automatically display updates on the website
3. Maintain version control of your policies

### How to Customize Governance Content

Simply edit the `governance.md` file in the repository root. The website will:
- Load and parse the markdown
- Convert it to styled HTML
- Display it in the Governance section

Supported markdown features:
- Headers (# ## ###)
- Bold (**text** or __text__)
- Italic (*text* or _text_)
- Links ([text](url))
- Code (`code`)
- Lists (- item or * item)

## File Structure

```
dollhaus.zip/
├── index.html              # Main HTML structure
├── styles.css              # Barbie-themed styling
├── script.js               # Interactive functionality
├── governance.md           # Governance & Policy content (editable!)
├── placeholder-*.jpg       # Placeholder images (SVG format)
├── README.md              # This file
└── LICENSE                # License information
```

## Functional Features

### Image Carousel
- Auto-advances every 5 seconds
- Click indicators to jump to specific slides
- Previous/Next buttons for manual navigation
- Keyboard navigation (arrow keys)
- Pauses on hover

### Mobile Menu
- Hamburger menu for mobile devices
- Smooth animations
- Touch-friendly

### Smooth Scrolling
- Navigation links scroll smoothly to sections
- Proper header offset for fixed navigation

### Newsletter Form
- Email validation
- Form submission handler (placeholder)
- SMS signup option

### Scroll Animations
- Cards fade in as you scroll
- Enhanced header shadow on scroll

## Customization Guide

### Replace Placeholder Images

Replace these files with your own images:
- `placeholder-hero.jpg` - Hero banner (1920x600px recommended)
- `placeholder-president.jpg` - President Barbie (400x400px)
- `placeholder-vp.jpg` - Vice President Ken (400x400px)
- `placeholder-first-doll.jpg` - First Doll (400x400px)
- `placeholder-cabinet.jpg` - Cabinet overview (400x400px)
- `placeholder-gallery-1.jpg` through `placeholder-gallery-4.jpg` - Gallery images (1200x600px)

### Update Content

Edit `index.html` to customize:
- Administration names and titles
- Priority areas
- News/Executive actions
- Footer links

### Modify Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --barbie-pink: #E0218A;
    --barbie-pink-light: #FF69B4;
    --barbie-pink-dark: #C71585;
    --barbie-purple: #9B59B6;
    --barbie-lavender: #E6B3E6;
    --barbie-gold: #FFD700;
}
```

### Add More Carousel Slides

In `index.html`, add new slides to the carousel:
```html
<div class="carousel-slide">
    <img src="your-image.jpg" alt="Description">
    <p class="carousel-caption">Your caption</p>
</div>
```

Don't forget to add a corresponding indicator:
```html
<button class="indicator" data-slide="4"></button>
```

## Running the Website

### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For full functionality (governance.md loading), use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Features Implemented

✅ Sticky header with navigation
✅ Responsive mobile menu
✅ Hero section with gradient backgrounds
✅ Administration grid with cards
✅ Priorities showcase
✅ **Dynamic governance section reading from repo**
✅ Functional image carousel with auto-advance
✅ Executive actions/news section
✅ Newsletter signup form
✅ Comprehensive footer
✅ Social media links
✅ Smooth scrolling navigation
✅ Scroll animations
✅ Full responsive design
✅ Barbie color theme throughout

## Placeholder Functionality

The following features have working UI but need backend integration:
- Search functionality (placeholder alert)
- Newsletter form submission (placeholder alert - displays confirmation)
- Social media links (set to "#" - update with real URLs)

## Future Enhancements

Consider adding:
- Backend integration for newsletter signups
- Search functionality implementation
- Video embedding capabilities
- Blog/news management system
- User authentication for admin area
- Contact form with email integration

## License

See LICENSE file for details.

## Credits

Created as a fabulous spoof of the White House website, reimagined for President Barbie!

---

**You can be anything - including President!** 💖✨
