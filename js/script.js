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

    // Function to apply theme based on isDark boolean
    const setTheme = (isDark) => {
        const root = document.documentElement;
        if (isDark) {
            root.style.setProperty('--primary-color', '#4dabf7');
            root.style.setProperty('--primary-color-dark', '#1e88e5');
            root.style.setProperty('--secondary-color', '#adb5bd');
            root.style.setProperty('--background-color', '#121212');
            root.style.setProperty('--surface-color', '#1e1e1e');
            root.style.setProperty('--text-color', '#e0e0e0');
            root.style.setProperty('--heading-color', '#ffffff');
            root.style.setProperty('--border-color', '#333333');
            root.style.setProperty('--primary-color-rgb', '77, 171, 247');
        } else {
            root.style.setProperty('--primary-color', '#007bff');
            root.style.setProperty('--primary-color-dark', '#0056b3');
            root.style.setProperty('--secondary-color', '#6c757d');
            root.style.setProperty('--background-color', '#ffffff');
            root.style.setProperty('--surface-color', '#f8f9fa');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--heading-color', '#000000');
            root.style.setProperty('--border-color', '#dee2e6');
            root.style.setProperty('--primary-color-rgb', '0, 123, 255');
        }
        localStorage.setItem('darkMode', isDark ? '1' : '0');
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = localStorage.getItem('darkMode') !== '1';
            setTheme(isDark);
        });
        // Apply theme on initial load
        setTheme(localStorage.getItem('darkMode') === '1');
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
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const animationType = entry.target.dataset.animation || 'fade-in-up';
                entry.target.classList.add(`animate-${animationType}`);

                // Staggered animations for children
                const staggeredChildren = entry.target.querySelectorAll('[data-stagger]');
                staggeredChildren.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`; // 100ms delay per item
                    child.classList.add(`animate-${animationType}`);
                });

                scrollRevealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(element => {
        scrollRevealObserver.observe(element);
    });

    // Helper function to create skeleton loaders
    const createSkeletonLoader = (type = 'text', count = 1) => {
        let html = '';
        for (let i = 0; i < count; i++) {
            if (type === 'text') {
                html += '<div class="skeleton-loader skeleton-text"></div>';
            } else if (type === 'image') {
                html += '<div class="skeleton-loader skeleton-image"></div>';
            } else if (type === 'card') {
                html += `
                    <div class="news-card skeleton-loader">
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                    </div>
                `;
            } else if (type === 'testimonial') {
                html += `
                    <div class="testimonial-card skeleton-loader">
                        <div class="skeleton-image"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text short"></div>
                    </div>
                `;
            }
        }
        return html;
    };

    // News Page Functionality
    const newsContainer = document.getElementById('news-container');
    const paginationContainer = document.getElementById('pagination-container');
    const newsSearchInput = document.getElementById('news-search');
    let allPosts = []; // Store all posts for filtering

    if (newsContainer) {
        const postsPerPage = 5;
        let filteredPosts = [];

        const renderPosts = (page = 1) => {
            newsContainer.innerHTML = '';
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            const paginatedPosts = filteredPosts.slice(start, end);

            if (paginatedPosts.length === 0) {
                newsContainer.innerHTML = '<p>No news posts found matching your search.</p>';
                paginationContainer.innerHTML = '';
                return;
            }

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
            const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
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

        const filterPosts = () => {
            const searchTerm = newsSearchInput.value.toLowerCase();
            filteredPosts = allPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) ||
                post.summary.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm)
            );
            renderPosts(1); // Reset to first page on search
            renderPagination();
        };

        newsSearchInput.addEventListener('input', filterPosts);

        // Display skeletons while loading
        newsContainer.innerHTML = createSkeletonLoader('card', postsPerPage);

        fetch('data/news.json')
            .then(response => response.json())
            .then(data => {
                allPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                filteredPosts = [...allPosts]; // Initialize filtered posts with all posts
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

        // Display skeletons while loading
        postContainer.innerHTML = `
            <div class="skeleton-loader skeleton-text" style="height: 40px; width: 80%;"></div>
            <div class="skeleton-loader skeleton-text short" style="width: 40%;"></div>
            <div class="skeleton-loader skeleton-text"></div>
            <div class="skeleton-loader skeleton-text"></div>
            <div class="skeleton-loader skeleton-text short" style="width: 70%;"></div>
        `;

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

    // Testimonials Functionality
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        // Display skeletons while loading
        testimonialsContainer.innerHTML = createSkeletonLoader('testimonial', 3); // Show 3 testimonial skeletons

        fetch('data/testimonials.json')
            .then(response => response.json())
            .then(data => {
                testimonialsContainer.innerHTML = ''; // Clear skeletons
                data.forEach(testimonial => {
                    const testimonialElement = document.createElement('div');
                    testimonialElement.classList.add('testimonial-card');
                    testimonialElement.innerHTML = `
                        <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                        <p>"${testimonial.quote}"</p>
                        <h4>- ${testimonial.name}</h4>
                    `;
                    testimonialsContainer.appendChild(testimonialElement);
                });
            });
    }

    // FAQ Functionality
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        fetch('data/faq.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(faq => {
                    const faqItem = document.createElement('div');
                    faqItem.classList.add('faq-item');
                    faqItem.innerHTML = `
                        <div class="faq-question">${faq.question}</div>
                        <div class="faq-answer">${faq.answer}</div>
                    `;
                    faqContainer.appendChild(faqItem);
                });

                // Add toggle functionality
                faqContainer.querySelectorAll('.faq-question').forEach(question => {
                    question.addEventListener('click', () => {
                        const answer = question.nextElementSibling;
                        question.classList.toggle('active');
                        answer.classList.toggle('active');
                    });
                });
            });
    }
});