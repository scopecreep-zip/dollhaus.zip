#!/bin/bash

# Script to update all HTML pages to use Header and Footer components

echo "Updating all HTML pages to use Header and Footer components..."

# Function to update a page
update_page() {
    local file="$1"
    local basepath="$2"

    echo "Processing: $file (basePath: $basepath)"

    # Create backup
    cp "$file" "${file}.bak"

    # Find the line number where the header starts (after skip-link)
    header_start=$(grep -n "<!-- Announcement Banner -->" "$file" | head -1 | cut -d: -f1)

    if [ -z "$header_start" ]; then
        header_start=$(grep -n "<div class=\"announcement-banner\">" "$file" | head -1 | cut -d: -f1)
    fi

    # Find the line number where the header ends
    header_end=$(grep -n "</header>" "$file" | head -1 | cut -d: -f1)

    if [ -n "$header_start" ] && [ -n "$header_end" ]; then
        # Replace header section with container div
        sed -i '' "${header_start},${header_end}d" "$file"
        sed -i '' "$((header_start-1))a\\
\\
    <!-- Header Container -->\\
    <div id=\"headerContainer\">\\
        <!-- Header will be rendered by Components.Header -->\\
    </div>\\
" "$file"
    fi

    # Check if footer container exists
    if ! grep -q "id=\"footerContainer\"" "$file"; then
        echo "  Adding footer container..."
        # Find </main> tag
        main_end=$(grep -n "</main>" "$file" | tail -1 | cut -d: -f1)
        if [ -n "$main_end" ]; then
            sed -i '' "${main_end}a\\
\\
    <!-- Footer Container -->\\
    <div id=\"footerContainer\">\\
        <!-- Footer will be rendered by Components.Footer -->\\
    </div>\\
" "$file"
        fi
    fi

    # Make sure the page loads the required scripts
    if ! grep -q "assets/js/config.js" "$file"; then
        echo "  Adding script tags..."
        # Add before </body>
        sed -i '' 's|</body>|    <!-- Load modules in order: config, utils, components, then main script -->\
    <script src="'${basepath}'assets/js/config.js"></script>\
    <script src="'${basepath}'assets/js/utils.js"></script>\
    <script src="'${basepath}'assets/js/components.js"></script>\
    <script src="'${basepath}'assets/js/script.js"></script>\
    <script>\
        // Render header and footer for this page\
        document.addEventListener('"'DOMContentLoaded'"', function() {\
            const headerContainer = document.querySelector('"'#headerContainer'"');\
            const footerContainer = document.querySelector('"'#footerContainer'"');\
            \
            if (headerContainer) {\
                Components.Header.render(headerContainer, { basePath: '"'${basepath}'"' });\
                // Initialize navigation after header renders\
                if (typeof initHeaderNavigation === '"'function'"') {\
                    initHeaderNavigation();\
                }\
            }\
            \
            if (footerContainer) {\
                Components.Footer.render(footerContainer, { basePath: '"'${basepath}'"' });\
            }\
        });\
    </script>\
</body>|' "$file"
    fi
}

# Update pages 1 level deep (pages/*.html)
for file in /Users/kali/dollhaus.zip/pages/*.html; do
    if [ -f "$file" ]; then
        update_page "$file" "../"
    fi
done

# Update pages 2 levels deep (pages/*/*.html)
for file in /Users/kali/dollhaus.zip/pages/*/*.html; do
    if [ -f "$file" ]; then
        update_page "$file" "../../"
    fi
done

echo "Done! All pages have been updated."
echo "Backups saved with .bak extension."
