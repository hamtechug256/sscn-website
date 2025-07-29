import React from 'react';
import './CampusLife.css';

const CampusLife = () => {
    return (
        <div className="campus-life">
            <h1>Campus Life at Soroti School of Comprehensive Nursing</h1>
            <p>Experience a vibrant and engaging campus life that fosters personal growth, community involvement, and academic excellence.</p>
            
            <section className="activities">
                <h2>Student Activities</h2>
                <p>Join various clubs and organizations that cater to diverse interests, from sports to arts and culture.</p>
            </section>

            <section className="facilities">
                <h2>Facilities</h2>
                <p>Our campus is equipped with modern facilities, including libraries, study areas, and recreational spaces.</p>
            </section>

            <section className="support">
                <h2>Student Support Services</h2>
                <p>We offer comprehensive support services, including counseling, academic advising, and career guidance.</p>
            </section>

            <section className="community">
                <h2>Community Engagement</h2>
                <p>Get involved in community service projects and initiatives that make a positive impact in Soroti City.</p>
            </section>
        </div>
    );
};

export default CampusLife;