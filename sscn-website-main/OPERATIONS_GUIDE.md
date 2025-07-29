# Website Operations Guide

This document provides instructions on how to manage and update your Soroti School of Comprehensive Nursing website, focusing on the dynamic news section and push notifications.

---

## 1. Managing News Posts (`data/news.json`)

Your news articles are stored in a single JSON file located at `data/news.json`. This file acts as your content database.

### File Location:
`C:\Users\HAMZA\Favorites\projects\SSCN\data\news.json`

### Structure of a News Post:
Each news article is an object within a JSON array. Here's an example of a single post's structure:

```json
{
  "id": 4,
  "title": "SSCN Launches Annual Mentorship Program",
  "date": "2025-07-21",
  "author": "Student Affairs Office",
  "summary": "The new mentorship program pairs final-year students with incoming first-years to provide guidance, support, and a friendly face on campus.",
  "content": "<p>In a move to foster a stronger, more supportive student community, the Student Affairs Office has officially launched the annual SSCN Mentorship Program. This initiative pairs experienced final-year students with new, incoming students to help them navigate the challenges and opportunities of their academic journey.</p><p>Mentors will provide academic guidance, share practical tips for clinical placements, and offer personal support to help first-years acclimate to campus life.</p><img src='images/counseling.jpg' alt='Students in a discussion' style='width:100%; border-radius: 8px; margin-top: 15px;'>"
}
```

*   **`id` (Number):** A unique identifier for the post. **Crucial:** Ensure each new post has a unique `id`. It's best to use sequential numbers (e.g., if the last ID was 4, the next should be 5).
*   **`title` (String):** The main headline of your news article.
*   **`date` (String):** The publication date of the article in `YYYY-MM-DD` format. This is used for sorting (newest first) and display.
*   **`author` (String):** The name of the author or department.
*   **`summary` (String):** A short, concise summary of the article. This is displayed on the main News page.
*   **`content` (String - HTML allowed):** The full body of your news article. You can include standard HTML tags (`<p>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<img>`, `<a>`, etc.) directly within this string.
    *   **Images:** For images, use relative paths like `images/your_image.jpg`. Ensure the image file is actually in your `images/` folder. You can also add inline styles for basic formatting (e.g., `style='width:100%; border-radius: 8px;'`).

### How to Add a New Post:

1.  **Open `data/news.json`** in a text editor (like VS Code, Notepad++, or even Notepad).
2.  **Add a new object** to the **beginning** of the array (after the opening `[` and before the first existing `{`). This ensures the newest post appears first.
3.  **Assign a unique `id`**. Increment the `id` from the previous latest post.
4.  **Fill in all other fields** (`title`, `date`, `author`, `summary`, `content`).
5.  **Save the `news.json` file.**
6.  **Deploy your changes** (see Section 3).

**Example of adding a new post (assuming current latest ID is 4):**

```json
[
  {
    "id": 5,
    "title": "New Student Orientation Dates Announced",
    "date": "2025-07-25",
    "author": "Admissions Office",
    "summary": "Get ready for an exciting start! Orientation for new students will be held from August 15-17.",
    "content": "<p>We are thrilled to welcome our new cohort of students! The orientation program is designed to help you settle in, meet faculty, and get familiar with campus resources. Please ensure you attend all sessions.</p><ul><li>August 15: Registration & Welcome</li><li>August 16: Campus Tour & Department Meetings</li><li>August 17: Student Life & Club Fair</li></ul>"
  },
  {
    "id": 4,
    "title": "SSCN Launches Annual Mentorship Program",
    "date": "2025-07-21",
    "author": "Student Affairs Office",
    "summary": "The new mentorship program pairs final-year students with incoming first-years to provide guidance, support, and a friendly face on campus.",
    "content": "<p>...</p>"
  }
]
```

### How to Edit an Existing Post:

1.  **Open `data/news.json`**.
2.  **Locate the post** you wish to edit by its `id` or `title`.
3.  **Modify the relevant fields** within that post's object.
4.  **Save the `news.json` file.**
5.  **Deploy your changes** (see Section 3).

### How to Delete a Post:

1.  **Open `data/news.json`**.
2.  **Locate the entire object** for the post you want to delete (from its opening `{` to its closing `}`).
3.  **Carefully delete the entire object**, including the comma that separates it from the next object (if it's not the last one).
4.  **Save the `news.json` file.**
5.  **Deploy your changes** (see Section 3).

**Important JSON Syntax Notes:**
*   The entire file must be enclosed in square brackets `[]`.
*   Each post object must be enclosed in curly braces `{}`.
*   Objects within the array must be separated by commas `,`.
*   The last object in the array should NOT have a trailing comma.
*   All keys (like `"id"`, `"title"`) must be enclosed in double quotes.
*   All string values (like `"SSCN Launches..."`, `"2025-07-21"`) must be enclosed in double quotes.
*   Numbers (like `4`) do not need quotes.
*   Be very careful with commas and quotes; a single misplaced character can break the entire file. Use a JSON validator online if you encounter issues.

---

## 2. Sending Push Notifications (OneSignal)

Your website is integrated with OneSignal to send push notifications to visitors who have opted in.

### Prerequisites:
*   Your website **must be served over HTTPS** (which Netlify handles automatically).
*   The `OneSignalSDKWorker.js` file **must be present in the root directory** of your deployed website. (You should have placed this file in `C:\Users\HAMZA\Favorites\projects\SSCN\` and pushed it to GitHub).

### Workflow to Send a New Notification:

1.  **First, add your new news post to `data/news.json`** and deploy your website (as described in Section 1 and 3). This ensures the content is live on your site.
2.  **Log in to your OneSignal Dashboard:** Go to [https://app.onesignal.com/](https://app.onesignal.com/) and log in with your credentials.
3.  **Navigate to Campaigns:** In the OneSignal dashboard, click on **"Messages"** (or "Campaigns" depending on their UI updates) in the left sidebar.
4.  **Create a New Push:** Click on **"New Push"** (or "New Push Campaign").
5.  **Compose Your Message:**
    *   **Title:** This is the main headline of your notification (e.g., "New Post from SSCN!").
    *   **Message:** The body of your notification (e.g., "Read about our Annual Mentorship Program.").
    *   **Launch URL:** This is crucial. Enter the full URL to your new news article on your website (e.g., `https://your-netlify-site.netlify.app/news-post.html?id=5`).
    *   **Icon:** Your school logo should automatically appear.
6.  **Review and Send:** Review your notification. You can send a test notification to yourself first. Once satisfied, click **"Send Message"** (or "Send to X Subscribers").

**Tips for Effective Notifications:**
*   **Keep it concise:** Notifications are short. Get straight to the point.
*   **Be timely:** Send notifications shortly after publishing relevant news.
*   **Provide value:** Only notify users about genuinely important updates.
*   **Use a clear call to action:** Encourage them to click and read more.

---

## 3. General Website Operation & Deployment

Any changes you make to your website files (HTML, CSS, JS, JSON) on your local computer need to be deployed to your live Netlify site. This is done using Git and GitHub.

### Workflow for Updating Your Website:

1.  **Make Changes Locally:** Edit any of your website files (e.g., `index.html`, `css/style.css`, `data/news.json`).
2.  **Open Your Terminal/Command Line:** Navigate to your project's root directory:
    ```bash
    cd C:\Users\HAMZA\Favorites\projects\SSCN
    ```
3.  **Stage Your Changes:** Tell Git which changes you want to include in your next update:
    ```bash
    git add .
    ```
    (The `.` means "all changes in the current directory and subdirectories")
4.  **Commit Your Changes:** Create a snapshot of your changes with a descriptive message:
    ```bash
    git commit -m "feat: Added new news post and updated navigation"
    ```
    (Use clear messages like "fix:", "feat:", "refactor:" to describe the change)
5.  **Push to GitHub:** Send your committed changes to your GitHub repository:
    ```bash
    git push origin main
    ```
    (Assuming your main branch is named `main`)

### Viewing Your Changes Live:

*   Once you `git push`, Netlify will automatically detect the new commit on your GitHub repository.
*   Netlify will then rebuild and redeploy your website. This usually takes less than a minute.
*   You can monitor the deployment status on your Netlify dashboard.
*   Once the deployment is successful, your changes will be live at your Netlify URL.

---

## 4. Website Features Overview

*   **Responsive Design:** The website adapts to look good on all devices (desktops, tablets, phones).
*   **Dark Mode Toggle:** Click the moon/sun icon (🌙/☀️) in the bottom-right corner to switch between light and dark themes. Your preference is saved in your browser.
*   **Scroll-to-Top Button:** An arrow (↑) appears in the bottom-right corner when you scroll down, allowing you to quickly return to the top of the page.
*   **Mobile Sidebar:** On smaller screens, the main navigation is hidden. Click the "☰" (hamburger) icon in the header to open a sidebar with navigation links. Click the "×" or the overlay to close it.
*   **News Toast Notification:** After 15 seconds on any page (except news pages), a small toast notification will appear in the bottom-right corner, highlighting the latest news post. You can dismiss it by clicking "×" or "Read More". It won't reappear in the same browsing session once dismissed.

---

This guide should provide you with all the necessary information to operate and maintain your website effectively. If you have any questions or encounter issues, refer back to this document or consult with a web developer.
