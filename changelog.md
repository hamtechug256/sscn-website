# Changelog

## [1.3.0] - 2025-07-21

### Added
- A subtle toast notification to draw attention to the latest news article.
- The toast appears after a 15-second delay and can be dismissed by the user.
- The dismissal state is saved in `sessionStorage` to prevent it from reappearing.

### Changed
- Updated the HTML of all pages to include the toast notification structure.
- Added CSS to style the toast and its animations.
- Updated `script.js` to include the logic for fetching data and controlling the toast.