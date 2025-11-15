# DocumentReader Component

A reusable, government-style document reader component with sidebar navigation, scrollable content area, and professional styling.

## Features

- **Sticky sidebar navigation** with table of contents
- **Scrollable document body** (max-height: 800px)
- **Scroll spy** - automatically highlights current section
- **Smooth scrolling** to sections
- **Print & Share buttons**
- **Markdown support** - loads content from .md files
- **Responsive design** - mobile-friendly layout
- **Custom scrollbar** styling

## Basic Usage

### 1. Add a container in your HTML

```html
<section class="my-document-section">
    <div class="container">
        <h2 class="section-heading">My Document Title</h2>
        <div id="my-document"></div>
    </div>
</section>
```

### 2. Initialize the component in JavaScript

```javascript
Components.DocumentReader.init({
    containerId: 'my-document',
    documentUrl: 'path/to/document.md',
    documentType: 'Official Policy Document',
    documentTitle: 'Document Title',
    documentSubtitle: 'Document Subtitle',
    lastUpdated: 'November 14, 2025',
    sections: [
        { id: 'section-1', label: 'Introduction' },
        { id: 'section-2', label: 'Overview' },
        { id: 'section-3', label: 'Details' }
    ]
});
```

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `containerId` | string | ✓ | ID of the container element |
| `documentUrl` | string | ✓ | URL to fetch markdown document |
| `documentType` | string | ✓ | Type label (e.g., "Official Policy Document") |
| `documentTitle` | string | ✓ | Main document title |
| `documentSubtitle` | string | ✓ | Document subtitle |
| `lastUpdated` | string | ✓ | Last updated date |
| `sections` | array | ✓ | Array of section objects `{id, label}` |
| `onLoad` | function | ✗ | Callback function after document loads |

## Section Configuration

Each section in the `sections` array should have:

- `id`: Unique identifier for the section (will be used as `#id` in URLs)
- `label`: Display name in the table of contents

```javascript
sections: [
    { id: 'doc-section-1', label: 'Introduction' },
    { id: 'doc-section-2', label: 'Core Concepts' },
    { id: 'doc-section-3', label: 'Implementation' }
]
```

**Note:** The component will automatically add these IDs to your H2 headings in the order they appear in the markdown.

## Markdown Format

Your markdown document should use H2 (`##`) for main sections and H3 (`###`) for subsections:

```markdown
# Document Title

## Introduction
This is the introduction section.

## Core Concepts
Here are the core concepts...

### Subsection
Details about a specific topic.

## Implementation
Implementation details...
```

## Advanced Usage

### With Callback

```javascript
Components.DocumentReader.init({
    containerId: 'my-document',
    documentUrl: 'document.md',
    documentType: 'Technical Specification',
    documentTitle: 'API Documentation',
    documentSubtitle: 'Version 2.0',
    lastUpdated: 'December 1, 2025',
    sections: [
        { id: 'intro', label: 'Introduction' },
        { id: 'endpoints', label: 'Endpoints' },
        { id: 'auth', label: 'Authentication' }
    ],
    onLoad: () => {
        console.log('Document loaded successfully!');
        // Add custom functionality here
    }
});
```

### Manual Content Update

If you need to update content dynamically:

```javascript
const reader = Components.DocumentReader.init({
    // ... configuration
});

// Later, update the content
reader.updateContent('<h2>New Content</h2><p>Updated text...</p>');

// Or reload from source
reader.reload();
```

## Styling

The component uses these CSS classes (already defined in `assets/css/styles.css`):

- `.document-reader` - Main container
- `.document-nav` - Sidebar navigation
- `.document-content` - Content area
- `.document-body` - Scrollable content (max-height: 800px)
- `.doc-nav-link` - TOC links
- `.doc-action-btn` - Action buttons

### Customizing Max Height

To change the document height, update the CSS:

```css
.document-content {
    max-height: 600px; /* Change from default 800px */
}
```

## Multiple Documents on One Page

You can have multiple document readers on the same page:

```html
<div id="document-one"></div>
<div id="document-two"></div>
```

```javascript
// First document
Components.DocumentReader.init({
    containerId: 'document-one',
    documentUrl: 'policy.md',
    // ... other options
});

// Second document
Components.DocumentReader.init({
    containerId: 'document-two',
    documentUrl: 'procedures.md',
    // ... other options
});
```

## Example: Complete Implementation

```html
<!-- HTML -->
<section class="governance-section">
    <div class="container">
        <h2 class="section-heading">Company Policies</h2>
        <div id="policies-doc"></div>
    </div>
</section>
```

```javascript
// JavaScript (in your script.js or initialization code)
document.addEventListener('DOMContentLoaded', () => {
    Components.DocumentReader.init({
        containerId: 'policies-doc',
        documentUrl: 'policies.md',
        documentType: 'Company Policy',
        documentTitle: 'Employee Handbook',
        documentSubtitle: '2025 Edition',
        lastUpdated: 'January 1, 2025',
        sections: [
            { id: 'welcome', label: 'Welcome' },
            { id: 'conduct', label: 'Code of Conduct' },
            { id: 'benefits', label: 'Benefits' },
            { id: 'pto', label: 'Time Off' },
            { id: 'remote', label: 'Remote Work' }
        ],
        onLoad: () => {
            console.log('Policies loaded');
        }
    });
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The component automatically handles scroll spy and navigation highlighting
- Print functionality opens the browser's print dialog
- Share functionality uses native Web Share API when available
- Markdown parsing is basic - for complex documents, consider preprocessing
- Document body has custom scrollbar styling (webkit browsers only)
