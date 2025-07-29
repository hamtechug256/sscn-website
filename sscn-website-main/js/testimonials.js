document.addEventListener('DOMContentLoaded', () => {
    const testimonialsContainer = document.getElementById('testimonials-container');

    if (testimonialsContainer) {
        fetch('data/testimonials.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(testimonials => {
                testimonials.forEach(testimonial => {
                    const testimonialCard = document.createElement('div');
                    testimonialCard.className = 'testimonial-card scroll-reveal';

                    testimonialCard.innerHTML = `
                        <div class="testimonial-content">
                            <blockquote>${testimonial.quote}</blockquote>
                            <div class="author-info">
                                <img src="${testimonial.image}" alt="Photo of ${testimonial.name}">
                                <div class="author-details">
                                    <p class="name">${testimonial.name}</p>
                                    <p class="program">${testimonial.program}</p>
                                </div>
                            </div>
                        </div>
                    `;

                    testimonialsContainer.appendChild(testimonialCard);
                });

                // Re-initialize GSAP animations for the new elements
                if (window.gsap) {
                    document.querySelectorAll('.scroll-reveal').forEach(el => {
                        gsap.fromTo(el, 
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1, 
                                y: 0, 
                                duration: 1, 
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: el,
                                    start: "top 90%",
                                    toggleActions: "play none none none",
                                }
                            }
                        );
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching or processing testimonials:', error);
                testimonialsContainer.innerHTML = '<p style="color: var(--color-text);">Could not load testimonials at this time.</p>';
            });
    }
});
