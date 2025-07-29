document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([1.7189, 33.6118], 17); // Centered on the school with a good zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Main marker for the school
    L.marker([1.7189, 33.6118]).addTo(map)
        .bindPopup('<b>Soroti School of Comprehensive Nursing</b><br>Main Campus.')
        .openPopup();

    // Example of how to add more markers
    const locations = [
        {
            "coords": [1.7200, 33.6125],
            "title": "Hostel Block A",
            "description": "Student residential hall."
        },
        {
            "coords": [1.7185, 33.6100],
            "title": "Skills Lab",
            "description": "Modern facilities for practical training."
        },
        {
            "coords": [1.7195, 33.6110],
            "title": "Library",
            "description": "Access a wide range of medical books and journals."
        }
    ];

    locations.forEach(location => {
        L.marker(location.coords).addTo(map)
            .bindPopup(`<b>${location.title}</b><br>${location.description}`);
    });

});
