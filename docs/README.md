# Dollhaus.zip Documentation

Welcome to the documentation for the dollhaus.zip project - a complete 1:1 spoof of whitehouse.gov with doll-themed content.

## Documentation Files

### [SITE-STRUCTURE.md](./SITE-STRUCTURE.md)
Complete directory structure, navigation patterns, and link path documentation. **Start here** to understand how the site is organized.

**Contains:**
- Full directory tree
- Page count summary
- Navigation structure
- Link path patterns (root ↔ pages ↔ subdirectories)
- Asset path examples
- Best practices
- Deployment notes

### [WHITEHOUSE_PAGES_REFERENCE.md](./WHITEHOUSE_PAGES_REFERENCE.md)
Research document detailing all pages from the original whitehouse.gov website that were emulated.

**Contains:**
- Complete whitehouse.gov page inventory
- Feature descriptions for each section
- Design patterns to replicate
- Dollhaus adaptation notes
- Original build order recommendations

### [DOCUMENTREADER.md](./DOCUMENTREADER.md)
Documentation for the DocumentReader component used for government-style documents.

**Contains:**
- Component usage instructions
- Configuration options
- Implementation examples
- Styling guidelines

### [DNS-SETUP.md](./DNS-SETUP.md)
DNS and deployment configuration instructions for hosting the site.

**Contains:**
- GitHub Pages setup
- Custom domain configuration
- DNS record settings
- CNAME setup

### [governance.md](./governance.md)
Sample governance document content used in the DocumentReader component demo.

## Quick Start

1. **Understand the Structure**: Read [SITE-STRUCTURE.md](./SITE-STRUCTURE.md) first
2. **Review Original Design**: See [WHITEHOUSE_PAGES_REFERENCE.md](./WHITEHOUSE_PAGES_REFERENCE.md) for reference
3. **Set Up Deployment**: Follow [DNS-SETUP.md](./DNS-SETUP.md) for hosting

## Project Overview

### Total Pages: 54 HTML files

- **Root**: 1 page (index.html)
- **Landing Pages**: 4 pages (news, administration, media, history)
- **News Section**: 9 pages
- **Administration**: 5 pages
- **Media**: 4 pages
- **Priorities**: 3 pages
- **Issues**: 8 pages
- **History**: 7 pages
- **EOP**: 7 pages
- **Legal**: 3 pages
- **Contact**: 3 pages

### Directory Structure

```
dollhaus.zip/
├── index.html          # Homepage
├── assets/             # CSS, JS, images
├── pages/              # All other HTML pages
│   ├── news.html       # Landing pages
│   ├── administration.html
│   ├── media.html
│   ├── history.html
│   └── [10 subdirectories with 49 pages]
└── docs/               # This documentation
```

## Key Features

✨ **Complete whitehouse.gov Emulation**
- All major sections recreated
- Interactive tables (investments, achievements)
- Photo galleries and video libraries
- Contact forms and tour information

🎨 **Doll-Themed Content**
- President Barbie, VP Ken, First Doll Skipper, Second Doll Teresa
- Doll-appropriate policies and initiatives
- Playful yet official government aesthetic

📱 **Responsive Design**
- Mobile-first approach
- Grid-based layouts
- Accessible navigation

🔗 **Clean Architecture**
- Organized folder structure
- Consistent navigation patterns
- Relative path linking
- Scalable for future additions

## Development Guidelines

### Adding New Pages

1. Create HTML file in appropriate `pages/` subdirectory
2. Use existing pages as templates for header/footer
3. Update navigation in ALL pages
4. Use correct relative paths:
   - Assets: `../../assets/` from subdirectories, `../assets/` from landing pages
   - Home: `../../index.html` from subdirectories, `../index.html` from landing pages
5. Test navigation from multiple locations

### Modifying Existing Pages

1. Maintain consistent header/footer structure
2. Keep navigation menus identical across all pages
3. Preserve accessibility features (skip links, ARIA labels)
4. Test all internal links after changes

### Asset Management

- CSS: `assets/css/styles.css`
- JavaScript: `assets/js/config.js`, `utils.js`, `components.js`, `script.js`
- Images: `assets/images/`

All assets stay in root `assets/` folder for predictable paths.

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript**: ES6+, modular architecture
- **Fonts**: Google Fonts (Instrument Sans, Instrument Serif)

## Deployment

The site is designed for:
- GitHub Pages
- Static hosting services
- Any web server with no backend requirements

See [DNS-SETUP.md](./DNS-SETUP.md) for deployment instructions.

## Maintenance

Keep this documentation updated when:
- Adding new pages or sections
- Changing folder structure
- Modifying navigation patterns
- Updating deployment configuration

## License

See [LICENSE](../LICENSE) in project root.

## Questions?

Refer to individual documentation files above for detailed information on specific topics.
