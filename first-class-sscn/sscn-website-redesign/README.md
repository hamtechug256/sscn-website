# SSCN Website Redesign

## Project Overview
The SSCN Website Redesign project aims to create a modern, user-friendly, and visually appealing website for the Soroti School of Comprehensive Nursing. The redesigned website will enhance user experience, provide easy access to information, and showcase the institution's programs and values effectively.

## Project Structure
The project is organized into two main directories: `public` and `src`.

- **public/**: Contains the static HTML files and assets that are served to users.
  - `index.html`: Main entry point for the website.
  - `about.html`: About Us page.
  - `programs.html`: Information about academic programs.
  - `admissions.html`: Admissions process and requirements.
  - `campus-life.html`: Description of campus life.
  - `news.html`: Latest news and updates.
  - `favicon.ico`: Website favicon.

- **src/**: Contains the source code for the website, including components, styles, and utilities.
  - **assets/**: Holds custom fonts and SVG graphics.
  - **components/**: Reusable React components for different sections of the website.
  - **pages/**: Individual page components for routing.
  - **styles/**: CSS files for styling the website.
  - **utils/**: Utility functions for API calls.
  - `index.js`: Entry point for the JavaScript application.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd sscn-website-redesign
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Development Server**
   Start the development server to view the website locally:
   ```bash
   npm start
   ```

4. **Build for Production**
   To create a production build of the website, run:
   ```bash
   npm run build
   ```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.