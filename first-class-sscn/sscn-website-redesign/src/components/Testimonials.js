import React, { useEffect, useState } from 'react';
import './Testimonials.css'; // Assuming you have a CSS file for styling

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        // Fetch testimonials from an API or a local JSON file
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials'); // Adjust the API endpoint as needed
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container">
                <h2 className="section-title">What Our Alumni Say</h2>
                <div className="testimonials-grid">
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card">
                                <p className="testimonial-quote">"{testimonial.quote}"</p>
                                <p className="testimonial-author">- {testimonial.author}</p>
                            </div>
                        ))
                    ) : (
                        <p>No testimonials available at this time.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;