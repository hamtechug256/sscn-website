document.addEventListener('DOMContentLoaded', () => {
    // Sidebar and mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const overlay = document.querySelector('.overlay');

    if (menuToggle && sidebar && closeSidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        const close = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        };

        closeSidebar.addEventListener('click', close);
        overlay.addEventListener('click', close);
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? '1' : '0');
        });
        if (localStorage.getItem('darkMode') === '1') {
            document.body.classList.add('dark-mode');
        }
    }

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scroll-reveal animations
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    scrollRevealElements.forEach(element => {
        scrollRevealObserver.observe(element);
    });

    // News Page Functionality
    const newsContainer = document.getElementById('news-container');
    const paginationContainer = document.getElementById('pagination-container');
    if (newsContainer) {
        const postsPerPage = 5;
        let posts = [];

        const renderPosts = (page = 1) => {
            newsContainer.innerHTML = '';
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            const paginatedPosts = posts.slice(start, end);

            paginatedPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('news-card');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p class="post-meta">By ${post.author} on ${new Date(post.date).toLocaleDateString()}</p>
                    <p>${post.summary}</p>
                    <a href="news-post.html?id=${post.id}" class="btn btn-primary">Read More</a>
                `;
                newsContainer.appendChild(postElement);
            });
        };

        const renderPagination = () => {
            paginationContainer.innerHTML = '';
            const pageCount = Math.ceil(posts.length / postsPerPage);
            for (let i = 1; i <= pageCount; i++) {
                const link = document.createElement('a');
                link.href = `?page=${i}`;
                link.innerText = i;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderPosts(i);
                    window.history.pushState({page: i}, `Page ${i}`, `?page=${i}`);
                });
                paginationContainer.appendChild(link);
            }
        };

        fetch('data/news.json')
            .then(response => response.json())
            .then(data => {
                posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                const urlParams = new URLSearchParams(window.location.search);
                const page = parseInt(urlParams.get('page')) || 1;
                renderPosts(page);
                renderPagination();
            });
    }

    // Single News Post Functionality
    const postContainer = document.getElementById('post-container');
    if (postContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));

        fetch('data/news.json')
            .then(response => response.json())
            .then(data => {
                const post = data.find(p => p.id === postId);
                if (post) {
                    document.title = `SSCN | ${post.title}`;
                    postContainer.innerHTML = `
                        <h1>${post.title}</h1>
                        <p class="post-meta">By ${post.author} on ${new Date(post.date).toLocaleDateString()}</p>
                        <div class="post-content">${post.content}</div>
                    `;
                } else {
                    postContainer.innerHTML = `<p>Post not found.</p>`;
                }
            });
    }

    // Toast Notification Functionality
    const newsToast = document.getElementById('news-toast');
    if (newsToast && !window.location.pathname.includes('news')) { // Don't show on news pages
        setTimeout(() => {
            if (sessionStorage.getItem('newsToastDismissed') !== 'true') {
                fetch('data/news.json')
                    .then(response => response.json())
                    .then(data => {
                        const latestPost = data.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
                        if (latestPost) {
                            newsToast.innerHTML = `
                                <button class="close-toast">×</button>
                                <h4>Latest News</h4>
                                <p>${latestPost.title}</p>
                                <a href="news-post.html?id=${latestPost.id}" class="btn btn-primary btn-sm">Read More</a>
                            `;
                            newsToast.classList.add('show');

                            const closeButton = newsToast.querySelector('.close-toast');
                            closeButton.addEventListener('click', () => {
                                newsToast.classList.remove('show');
                                sessionStorage.setItem('newsToastDismissed', 'true');
                            });

                            const readMoreLink = newsToast.querySelector('a');
                            readMoreLink.addEventListener('click', () => {
                                sessionStorage.setItem('newsToastDismissed', 'true');
                            });
                        }
                    });
            }
        }, 15000); // 15 seconds delay
    }
});