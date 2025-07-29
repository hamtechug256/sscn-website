# Changelog

## [1.0.0] - 2025-07-22

### Added
- Initialized changelog.
- Began complete website redesign project.
- **Project Goal:** Transform the existing website into a world-class, award-winning digital experience with a modern, professional, and unique design.
- **Color Palette (Modern Luxury):**
    - Deep Navy: `#0A192F`
    - Silver Mist: `#CBD5E1`
    - Soft Gold: `#D4AF37`
    - White Smoke: `#F9FAFB`
    - Accent Teal: `#14B8A6`
- **Typography:**
    - Headings: Poppins (Google Fonts)
    - Body: Inter (Google Fonts)

### Changed
- **CSS Overhaul:** Completely rewrote `css/style.css` with a new, modern, and responsive design system.
- Implemented CSS variables for the "Modern Luxury" color palette.
- Introduced a mobile-first approach with Flexbox and Grid layouts.
- Added Google Fonts (`Poppins` for headings, `Inter` for body text).
- Designed a new sticky header that becomes semi-transparent on scroll.
- Created a new professional footer design.
- Added subtle animations and a scroll-reveal effect for a more dynamic user experience.

### Added
- **Homepage Redesign:** Restructured and redesigned `index.html` to align with the new world-class design.
- Created a new, captivating hero section.
- Implemented a modern and clean layout for all content sections.
- Ensured all original text and images are preserved.
- **Internal Page Redesign (About Us):** Redesigned `about.html` to match the new, professional aesthetic, creating a consistent template for internal pages.
- **Internal Pages Redesign (Admissions, Campus Life, News, Programs):** Redesigned the remaining internal pages (`admissions.html`, `campus-life.html`, `news.html`, `news-post.html`, `programs.html`) to ensure a consistent and professional design across the entire website.
- **Photo & Video Gallery:** Created `gallery.html` and integrated it into the navigation.
- **Interactive Campus Map:** Created `campus-map.html` with a placeholder map and basic interactivity, and integrated it into the navigation.

### Changed
- **JavaScript Overhaul:** Rewrote `js/script.js` to support the new design.
- Simplified and modernized the script, removing unused features like the dark mode toggle.
- Ensured all interactive elements, including the mobile menu, scroll animations, and dynamic content loading, are fully functional with the new HTML structure and CSS.
- **Advanced Visual & Interactive Enhancements:**
    - Integrated GSAP (GreenSock Animation Platform) for sophisticated animations.
    - Implemented a dynamic hero section animation with staggered text and button reveals.
    - Added custom SVG iconography to the "Why Choose Us?" section on the homepage.
    - Applied a subtle parallax effect to the hero background image.
    - Implemented a video background for the hero section on the homepage.
- **Content & SEO Improvements:**
    - Enhanced the News section with a sidebar for categories and recent posts.
    - Optimized page titles and added meta descriptions for `index.html`, `about.html`, and `programs.html`.
    - Added Schema.org structured data for the institution and its courses to improve SEO.
- **Performance & Accessibility:**
    - Updated image references to use WebP format and implemented lazy loading for all images.
    - Simulated minification of CSS and JavaScript files (actual minification would be done via build tools).
    - Ensured consistent use of semantic HTML and ARIA attributes for improved accessibility.
- **Contact Form Redesign:** Updated the contact form with a modern and intuitive layout, including improved styling for input fields and clearer user guidance.
- **News Toast Notification:** Re-implemented the news toast notification to appear in the bottom right corner, fetching the latest news.
- **Scroll-Reveal Animation Timing:** Adjusted the scroll-reveal animation trigger to `top 90%` to make content appear sooner as the user scrolls.
- **News Card Visibility:** Fixed an issue where news cards were not visible on the news section by removing a conflicting `scroll-reveal` class from dynamically generated elements.
- **Read Progress Indicator:** Implemented a read progress bar on news post pages (`news-post.html`) to show scroll progress, with CSS styling and JavaScript logic.
- **Back to Top Button Enhancement:** Redesigned the "Back to Top" button with enhanced styling (circular, shadow, smooth transitions) and ensured its show/hide logic is aligned.
- **Lightbox/Modal for Gallery:** Implemented a full-screen lightbox modal for the gallery (`gallery.html`) with image display, navigation, and close functionality.
- **Program Cards Redesign:** Redesigned program cards on `programs.html` to a grid format with a new hover effect where the heading is always visible, and the rest of the content slides up on hover.
