document.addEventListener('DOMContentLoaded', () => {

    // Hide preloader once page is loaded
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // 1. Sticky Header on Scroll
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // 3. Smooth Scroll-Reveal Animations
    gsap.registerPlugin(ScrollTrigger);

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const tl = gsap.timeline();
        tl.from(heroContent.querySelector('h1'), { opacity: 0, y: 50, duration: 1, ease: 'power3.out' })
          .from(heroContent.querySelector('p'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, "-=0.7")
          .from(heroContent.querySelector('.hero-buttons'), { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, "-=0.6")
          .from(".hero-image", { opacity: 0, scale: 0.9, duration: 1, ease: 'power3.out' }, "-=0.8");

        // Add this for hero parallax effect
        const hero = document.querySelector('.hero');
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) - 0.5;
            const y = (clientY / window.innerHeight) - 0.5;

            gsap.to(heroContent.querySelector('h1'), {
                x: -x * 50,
                y: -y * 30,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(heroContent.querySelector('p'), {
                x: x * 40,
                y: y * 20,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(heroContent.querySelector('.hero-buttons'), {
                x: -x * 30,
                y: -y * 15,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        gsap.to(".hero", {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 }, // from state
            { // to state
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%", // Start animation when element is 10% from the bottom of the viewport
                    toggleActions: "play none none none",
                }
            }
        );
    });

    // 4. Back to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Dynamic News Loading (News & Single Post Pages)
    const newsContainer = document.getElementById('news-container');
    const postContainer = document.getElementById('post-container');
    const paginationContainer = document.getElementById('pagination-container');
    const newsSearchInput = document.getElementById('news-search');
    const recentPostsSidebar = document.getElementById('recent-posts-sidebar');

    let allPosts = [];
    let filteredPosts = [];
    const postsPerPage = 6;

    const fetchNews = async () => {
        try {
            const response = await fetch('data/news.json');
            if (!response.ok) throw new Error('News data not found.');
            const data = await response.json();
            return data.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    };

    // If on the main News page
    if (newsContainer) {
        const renderPosts = (page = 1) => {
            newsContainer.innerHTML = '';
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            const paginatedPosts = filteredPosts.slice(start, end);

            if (paginatedPosts.length === 0) {
                newsContainer.innerHTML = '<p class="no-results">No news posts found.</p>';
                return;
            }

            paginatedPosts.forEach(post => {
                const postElement = document.createElement('a');
                postElement.href = `news-post.html?id=${post.id}`;
                postElement.className = 'news-card';
                postElement.innerHTML = `
                    <div class="news-card-image">
                        <img src="${post.image || 'images/default-news.webp'}" alt="${post.title}">
                    </div>
                    <div class="news-card-content">
                        <span class="news-card-date">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <h3>${post.title}</h3>
                        <p>${post.summary}</p>
                        <span class="read-more">Read More &rarr;</span>
                    </div>
                `;
                newsContainer.appendChild(postElement);
            });
            // Re-observe newly added elements
            document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
        };

        const renderPagination = () => {
            if (!paginationContainer) return;
            paginationContainer.innerHTML = '';
            const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
            if (pageCount <= 1) return;

            for (let i = 1; i <= pageCount; i++) {
                const link = document.createElement('a');
                link.href = `#page-${i}`;
                link.innerText = i;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderPosts(i);
                    // Optionally update URL without reloading
                    // window.history.pushState({page: i}, `Page ${i}`, `?page=${i}`);
                });
                paginationContainer.appendChild(link);
            }
        };

        const handleFiltering = () => {
            const searchTerm = newsSearchInput.value.toLowerCase();
            filteredPosts = allPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.summary.toLowerCase().includes(searchTerm)
            );
            renderPosts(1);
            renderPagination();
        };

        const renderRecentPosts = (posts) => {
            if (!recentPostsSidebar) return;
            recentPostsSidebar.innerHTML = '';
            posts.slice(0, 5).forEach(post => { // Display top 5 recent posts
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="news-post.html?id=${post.id}">${post.title}</a>`;
                recentPostsSidebar.appendChild(listItem);
            });
        };

        const initNewsPage = async () => {
            allPosts = await fetchNews();
            filteredPosts = [...allPosts];
            if (newsSearchInput) {
                newsSearchInput.addEventListener('input', handleFiltering);
            }
            renderPosts(1);
            renderPagination();
            renderRecentPosts(allPosts);
        };

        initNewsPage();
    }

    // If on a Single Post page
    if (postContainer) {
        const initPostPage = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = parseInt(urlParams.get('id'));
            if (!postId) {
                postContainer.innerHTML = '<p>Invalid post ID.</p>';
                return;
            }

            const posts = await fetchNews();
            const post = posts.find(p => p.id === postId);

            if (post) {
                document.title = `${post.title} | SSCN`;
                postContainer.innerHTML = `
                    <div class="post-header">
                        <h1>${post.title}</h1>
                        <p class="post-meta">By ${post.author} on ${new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <img src="${post.image || 'images/default-news.webp'}" alt="${post.title}" class="post-banner-image">
                    <div class="post-content">${post.content}</div>
                `;

                // Read Progress Bar Logic
                const progressBar = document.getElementById('read-progress-bar');
                if (progressBar) {
                    window.addEventListener('scroll', () => {
                        const contentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                        const scrollPercentage = (window.scrollY / contentHeight) * 100;
                        progressBar.style.width = `${scrollPercentage}%`;
                    });
                }

            } else {
                postContainer.innerHTML = '<p>Post not found.</p>';
            }
        };

        initPostPage();
    }

    // 6. FAQ Accordion
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        fetch('data/faq.json')
            .then(res => res.json())
            .then(faqs => {
                faqs.forEach(faq => {
                    const item = document.createElement('div');
                    item.className = 'faq-item';
                    item.innerHTML = `
                        <button class="faq-question" aria-expanded="false">
                            <span>${faq.question}</span>
                            <span class="faq-icon"></span>
                        </button>
                        <div class="faq-answer" hidden>${faq.answer}</div>
                    `;
                    faqContainer.appendChild(item);
                });

                faqContainer.addEventListener('click', (e) => {
                    const question = e.target.closest('.faq-question');
                    if (question) {
                        const answer = question.nextElementSibling;
                        const isExpanded = question.getAttribute('aria-expanded') === 'true';
                        question.setAttribute('aria-expanded', !isExpanded);
                        answer.hidden = isExpanded;
                    }
                });
            });
    }

    // 7. Testimonials Loading
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        fetch('data/testimonials.json')
            .then(res => res.json())
            .then(testimonials => {
                testimonialsContainer.innerHTML = '';
                testimonials.forEach(testimonial => {
                    const card = document.createElement('div');
                    card.className = 'testimonial-card scroll-reveal';
                    card.innerHTML = `
                        <img src="${testimonial.image}" alt="${testimonial.name}">
                        <blockquote>"${testimonial.quote}"</blockquote>
                        <cite>- ${testimonial.name}</cite>
                    `;
                    testimonialsContainer.appendChild(card);
                });
                document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
            });
    }

    // 8. News Toast Notification Functionality
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
                                <button class="close-toast">&times;</button>
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

    // 10. Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-img');
    const nextBtn = document.querySelector('.next-img');

    let currentImageIndex;
    const images = Array.from(galleryItems).map(item => ({
        src: item.dataset.src,
        title: item.dataset.title,
        description: item.dataset.description
    }));

    function showImage(index) {
        if (index < 0 || index >= images.length) return;
        currentImageIndex = index;
        lightboxImg.src = images[index].src;
        lightboxCaption.innerHTML = `<h3>${images[index].title}</h3><p>${images[index].description}</p>`;
    }

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                lightbox.classList.add('active');
                showImage(index);
            });
        });

        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowRight') nextBtn.click();
                if (e.key === 'ArrowLeft') prevBtn.click();
                if (e.key === 'Escape') closeBtn.click();
            }
        });
    }
});