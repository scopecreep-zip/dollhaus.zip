# dollhaus.zip - Making the White House Femme Again

A radical **political art project** by a trans woman - spoofing whitehouse.gov to celebrate bimbo feminism, protect the dolls, and honor ballroom culture's chosen family (haus) tradition.

## About This Project

**dollhaus.zip** is a political art project created by a trans woman to reclaim space, celebrate hyperfemininity as resistance, and honor the cultural legacy of ballroom.

### Cultural Context

**"Dolls"** - A term coined by Black & Latina trans women in 1980s ballroom culture:
- Celebrates trans femininity, confidence, and authentic self-expression
- "Protect the Dolls" - movement supporting trans women facing discrimination
- Code language for trans women to recognize each other

**"Haus"** - From ballroom culture:
- Chosen families led by mothers/fathers providing shelter, mentorship, community
- Safe spaces for LGBTQ+ youth rejected by biological families
- Founded in Harlem's House of LaBeija (1972) by Crystal & Lottie LaBeija

**Bimbo Feminism (2025)**:
- Reclaiming hyperfemininity as radical leftist resistance
- Intelligence + political engagement + glamorous presentation
- Pro-LGBTQ+, pro-sex work, pro-BLM, anti-patriarchy
- Rejecting "girlboss" hustle culture for authentic joy

### Technical Implementation

This is a 1:1 structural spoof of whitehouse.gov with updated messaging:

- **Exact Layout**: Matching whitehouse.gov's sections, grid systems, and content hierarchy
- **Typography**: Uses Instrument Sans & Instrument Serif fonts (same as whitehouse.gov)
- **Navigation Structure**: Identical menu structure with dropdowns
- **Color Palette**: Navy blues → Pink/purple gradient (trans pride + femme aesthetics)
- **Content**: Rewritten to center trans women, chosen family, and bimbo feminist values

## Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Trans Pride Color Palette**: Pink (#E0218A), purple (#9B59B6), lavender (#E6B3E6) - celebrating femme aesthetics
- **Political Messaging**:
  - Announcement: "Making the White House Femme Again ✨ Protect the Dolls"
  - Carousel: Bimbo feminism, ballroom history, chosen family
  - Priorities: Trans rights, sex worker support, LGBTQ+ liberation, anti-patriarchy
  - Footer: "Text PROTECT to 45470" - solidarity messaging
- **Structure**:
  - Header with navigation and social links
  - Hero carousel with political messaging
  - Administration profiles (President Doll: "Trans Woman Making America Femme Again")
  - Priorities: Radical leftist values
  - Governance & Policy by the Haus
  - Newsletter: "Bimbo feminism, trans joy, and radical politics delivered with glitter"

## Dynamic Governance Section

The "Governance & Policy by the Haus" section can read from a `governance.md` file in your repository. This allows you to:

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

Created by a trans woman as political art - spoofing whitehouse.gov to make space for dolls, honor ballroom culture, and celebrate bimbo feminism as resistance.

Inspired by:
- Black & Latina trans women who created ballroom culture and the term "dolls"
- House mothers and fathers who built chosen families for rejected LGBTQ+ youth
- The "Protect the Dolls" movement (popularized by Pedro Pascal, Connor Ives)
- Bimbo feminism's radical reclamation of hyperfemininity
- Paris Is Burning (1990) and the ongoing ballroom scene

---

**Protect the Dolls. Support Trans Joy. Choose Your Haus.** 💖✨

*"Being a doll means being politically fierce."*
