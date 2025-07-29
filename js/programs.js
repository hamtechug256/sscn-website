document.addEventListener('DOMContentLoaded', () => {
    const programsGrid = document.getElementById('programs-grid');
    const filterBtnsContainer = document.getElementById('program-filters');
    let allPrograms = [];

    // Function to render program cards
    const renderPrograms = (programsToRender) => {
        programsGrid.innerHTML = '';
        if (programsToRender.length === 0) {
            programsGrid.innerHTML = '<p class="no-results">No programs match the selected filter.</p>';
            return;
        }

        programsToRender.forEach(program => {
            const programCard = document.createElement('a');
            programCard.href = program.details_link;
            programCard.className = 'program-card scroll-reveal';

            programCard.innerHTML = `
                <div class="program-card-image">
                    <img src="${program.image}" alt="${program.title}" loading="lazy">
                    <div class="program-card-overlay">
                        <h3>${program.title}</h3>
                        <div class="program-card-details">
                            <p>${program.summary}</p>
                            <span class="learn-more-btn">Learn More &rarr;</span>
                        </div>
                    </div>
                </div>
            `;
            programsGrid.appendChild(programCard);
        });

        // Re-trigger animations
        if (window.gsap) {
            gsap.utils.toArray('.scroll-reveal').forEach(el => {
                gsap.fromTo(el, { opacity: 0, y: 50 }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' }
                });
            });
        }
    };

    // Fetch and display programs
    fetch('data/programs.json')
        .then(response => response.json())
        .then(data => {
            allPrograms = data;
            renderPrograms(allPrograms);
        })
        .catch(error => {
            console.error('Error fetching programs:', error);
            programsGrid.innerHTML = '<p class="no-results">Error loading programs. Please try again later.</p>';
        });

    // Handle filter button clicks
    if (filterBtnsContainer) {
        filterBtnsContainer.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName !== 'BUTTON') return;

            // Update active button state
            filterBtnsContainer.querySelector('.active').classList.remove('active');
            target.classList.add('active');

            const filter = target.dataset.filter;
            let filteredPrograms;

            if (filter === 'all') {
                filteredPrograms = allPrograms;
            } else {
                filteredPrograms = allPrograms.filter(p => p.category === filter);
            }

            renderPrograms(filteredPrograms);
        });
    }
});
