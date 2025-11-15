# Dollhaus.zip Site Structure

This document outlines the complete file structure of the dollhaus.zip project.

## Directory Structure

```
dollhaus.zip/
├── index.html                  # Homepage with hero carousel (ONLY HTML in root)
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet
│   ├── js/
│   │   ├── config.js          # Site configuration
│   │   ├── utils.js           # Utility functions
│   │   ├── components.js      # UI components
│   │   └── script.js          # Main JavaScript
│   └── images/                # Image assets
└── pages/
    ├── news.html              # News section landing page
    ├── administration.html    # Administration section landing page
    ├── media.html             # Media section landing page
    ├── history.html           # History section landing page
    │
    ├── news/                  # News Section (9 pages)
    │   ├── articles.html
    │   ├── briefings-statements.html
    │   ├── fact-sheets.html
    │   ├── presidential-actions.html
    │   ├── executive-orders.html
    │   ├── nominations-appointments.html
    │   ├── presidential-memoranda.html
    │   ├── proclamations.html
    │   └── remarks.html
    │
    ├── administration/        # Administration (5 pages)
    │   ├── president-barbie.html
    │   ├── vp-ken.html
    │   ├── first-doll-skipper.html
    │   ├── second-doll-teresa.html
    │   └── cabinet.html
    │
    ├── media/                 # Media Section (4 pages)
    │   ├── videos.html
    │   ├── gallery.html
    │   ├── live.html
    │   └── wire.html
    │
    ├── priorities/            # Priorities Landing (3 pages)
    │   ├── priorities.html
    │   ├── investments.html
    │   └── achievements.html
    │
    ├── issues/                # Individual Issues (8 pages)
    │   ├── technology-innovation.html
    │   ├── economy.html
    │   ├── national-security.html
    │   ├── government-accountability.html
    │   ├── make-dolls-fabulous.html
    │   ├── housing-communities.html
    │   ├── safe-communities.html
    │   └── social-causes.html
    │
    ├── history/               # History Section (7 pages)
    │   ├── america-250.html
    │   ├── founders-museum.html
    │   ├── founding-fathers.html
    │   ├── moments-that-made-us.html
    │   ├── about-the-doll-house.html
    │   ├── dream-convertible-one.html
    │   └── camp-malibu.html
    │
    ├── eop/                   # Executive Office (7 pages)
    │   ├── eop.html
    │   ├── office-management-budget.html
    │   ├── office-science-technology.html
    │   ├── council-economic-advisors.html
    │   ├── office-cyber-director.html
    │   ├── office-drug-control.html
    │   └── council-environmental-quality.html
    │
    ├── legal/                 # Legal/Government (3 pages)
    │   ├── government.html
    │   ├── copyright.html
    │   └── privacy.html
    │
    └── contact/               # Contact Section (3 pages)
        ├── contact.html
        ├── visit.html
        └── internships.html
```

## Page Count Summary

**Total Pages:** 54
- **Root:** 1 page (index.html only)
- **Landing Pages (in pages/):** 4 (news, administration, media, history)
- **News Section:** 9 pages
- **Administration:** 5 pages
- **Media:** 4 pages
- **Priorities:** 3 pages
- **Issues:** 8 pages
- **History:** 7 pages
- **EOP:** 7 pages
- **Legal:** 3 pages
- **Contact:** 3 pages

## Navigation Structure

### Main Navigation Menu

1. **News**
   - Articles → `pages/news/articles.html`
   - Briefings & Statements → `pages/news/briefings-statements.html`
   - Fact Sheets → `pages/news/fact-sheets.html`
   - Presidential Actions → `pages/news/presidential-actions.html`
   - Remarks → `pages/news/remarks.html`

2. **Administration**
   - President Barbie → `pages/administration/president-barbie.html`
   - Vice President Ken → `pages/administration/vp-ken.html`
   - First Doll Skipper → `pages/administration/first-doll-skipper.html`
   - Second Doll Teresa → `pages/administration/second-doll-teresa.html`
   - The Cabinet → `pages/administration/cabinet.html`

3. **Media**
   - Video Library → `pages/media/videos.html`
   - Gallery → `pages/media/gallery.html`
   - Live News → `pages/media/live.html`
   - Doll House Wire → `pages/media/wire.html`

4. **Priorities**
   - Issues → `pages/priorities/priorities.html`
   - Investments → `pages/priorities/investments.html`
   - Wins and Achievements → `pages/priorities/achievements.html`

5. **History**
   - Founders Museum → `pages/history/founders-museum.html`
   - Timeline → `pages/history/moments-that-made-us.html`
   - Government Information → `pages/legal/government.html`

6. **Get in Touch**
   - Contact → `pages/contact/contact.html`
   - Visit → `pages/contact/visit.html`
   - Internships → `pages/contact/internships.html`

## Link Path Patterns

### From Root (index.html) to Pages
```html
<!-- From index.html to landing pages -->
<a href="pages/news.html">News</a>
<a href="pages/administration.html">Administration</a>

<!-- From index.html to subpages -->
<a href="pages/news/articles.html">Articles</a>
<a href="pages/administration/president-barbie.html">President Barbie</a>
```

### From Landing Pages to Root
```html
<!-- From pages/news.html, pages/administration.html, etc. -->
<a href="../index.html">Home</a>
<link rel="stylesheet" href="../assets/css/styles.css">
```

### From Subdirectory Pages to Root
```html
<!-- From pages/news/articles.html to root -->
<a href="../../index.html">Home</a>
<link rel="stylesheet" href="../../assets/css/styles.css">
```

### From Subdirectory Pages to Landing Pages
```html
<!-- From pages/news/articles.html to pages/news.html -->
<a href="../news.html">Back to News</a>

<!-- From pages/news/articles.html to pages/media.html -->
<a href="../media.html">Media</a>
```

### From Subdirectory Pages to Other Subdirectory Pages
```html
<!-- From pages/news/articles.html to pages/media/videos.html -->
<a href="../media/videos.html">Videos</a>
```

### Asset Paths

**From Root (index.html):**
```html
<link rel="stylesheet" href="assets/css/styles.css">
<script src="assets/js/script.js"></script>
```

**From Landing Pages (pages/news.html, etc.):**
```html
<link rel="stylesheet" href="../assets/css/styles.css">
<script src="../assets/js/script.js"></script>
```

**From Subdirectory Pages (pages/news/articles.html, etc.):**

```html
<link rel="stylesheet" href="../../assets/css/styles.css">
<script src="../../assets/js/script.js"></script>
```

## Special Pages

- **Presidential Actions Landing:** `pages/news/presidential-actions.html` - Links to 4 sub-categories:
  - Executive Orders
  - Nominations & Appointments
  - Presidential Memoranda
  - Proclamations

- **EOP Landing:** `pages/eop/eop.html` - Links to 6 office pages

- **Priorities Landing:** `pages/priorities/priorities.html` - Links to 8 individual issue pages

## Best Practices

1. **Always use relative paths** - Ensures site works in any deployment environment
2. **Maintain consistent navigation** - All pages should have identical navigation structure
3. **Update links systematically** - When adding new pages, update all relevant navigation menus
4. **Test all links** - Verify navigation works from both root and subdirectory pages
5. **Keep assets in root** - Makes asset paths predictable across all pages

## Deployment Notes

This structure is optimized for:

- GitHub Pages deployment
- Static site hosting
- Clean URL organization
- Easy maintenance and updates
- Scalability for future pages

## Maintenance

When adding new pages:

1. Place in appropriate `pages/` subdirectory
2. Update navigation menus in all pages
3. Update footer links if necessary
4. Use correct relative paths for assets
5. Test navigation from multiple page depths
