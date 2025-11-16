#!/usr/bin/env python3
"""
Script to update all HTML pages to use Header and Footer components
"""

import os
import re
from pathlib import Path

def update_html_page(filepath, base_path):
    """Update a single HTML page to use header/footer components"""
    print(f"Processing: {filepath} (basePath: {base_path})")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create backup
    backup_path = str(filepath) + '.update_bak'
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # Find and replace header section
    # Pattern: from skip-link to </header>
    header_pattern = r'(<!-- Skip to Content Link -->.*?<a.*?skip-link.*?</a>\s*)(<!-- Announcement Banner -->.*?</header>)'
    header_replacement = r'\1\n    <!-- Header Container -->\n    <div id="headerContainer">\n        <!-- Header will be rendered by Components.Header -->\n    </div>\n'

    content = re.sub(header_pattern, header_replacement, content, flags=re.DOTALL)

    # Check if footer container exists, if not add it after </main>
    if 'id="footerContainer"' not in content:
        print(f"  Adding footer container...")
        main_pattern = r'(</main>)'
        footer_addition = r'\1\n\n    <!-- Footer Container -->\n    <div id="footerContainer"></div>'
        content = re.sub(main_pattern, footer_addition, content)

    # Update or add the initialization script
    script_block = f'''    <script>
        // Render header and footer with basePath for subdirectory
        document.addEventListener('DOMContentLoaded', () => {{
            const headerContainer = document.querySelector('#headerContainer');
            const footerContainer = document.querySelector('#footerContainer');

            if (headerContainer) {{
                Components.Header.render(headerContainer, {{ basePath: '{base_path}' }});
                // Initialize header navigation after rendering
                if (typeof initHeaderNavigation === 'function') {{
                    initHeaderNavigation();
                }}
            }}

            if (footerContainer) {{
                Components.Footer.render(footerContainer, {{
                    basePath: '{base_path}',
                    brandHref: '{base_path}index.html'
                }});
            }}
        }});
    </script>'''

    # Check if DOMContentLoaded script exists
    if 'document.addEventListener(\'DOMContentLoaded\'' in content:
        # Replace existing DOMContentLoaded handler
        dom_pattern = r'<script>.*?document\.addEventListener\(.*?DOMContentLoaded.*?\);.*?</script>'
        content = re.sub(dom_pattern, script_block, content, flags=re.DOTALL)
    else:
        # Add before </body>
        content = content.replace('</body>', script_block + '\n</body>')

    # Make sure required scripts are loaded
    if 'assets/js/config.js' not in content:
        print(f"  Adding script tags...")
        scripts = f'''    <script src="{base_path}assets/js/config.js"></script>
    <script src="{base_path}assets/js/utils.js"></script>
    <script src="{base_path}assets/js/components.js"></script>
    <script src="{base_path}assets/js/script.js"></script>
'''
        # Add before the DOMContentLoaded script
        content = content.replace(script_block, scripts + script_block)

    # Write updated content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ Updated successfully")

def main():
    base_dir = Path('/Users/kali/dollhaus.zip')

    # Update pages 1 level deep (pages/*.html)
    pages_dir = base_dir / 'pages'
    for html_file in pages_dir.glob('*.html'):
        update_html_page(html_file, '../')

    # Update pages 2 levels deep (pages/*/*.html)
    for subdir in pages_dir.iterdir():
        if subdir.is_dir():
            for html_file in subdir.glob('*.html'):
                update_html_page(html_file, '../../')

    print("\n✓ All pages updated successfully!")
    print("Backups saved with .update_bak extension")

if __name__ == '__main__':
    main()
