import React from 'react';
import './About.css'; // Assuming you will create a CSS file for styling

const About = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Soroti School of Comprehensive Nursing</h1>
            </header>
            <section className="about-content">
                <p>
                    Soroti School of Comprehensive Nursing is a leading institution dedicated to training competent and compassionate healthcare professionals. Located in Soroti City, Uganda, we are committed to providing high-quality education in nursing and midwifery.
                </p>
                <p>
                    Our programs are designed to equip students with the knowledge, skills, and ethical values necessary to excel in the dynamic healthcare sector. We foster a learning environment that encourages critical thinking, practical expertise, and a commitment to community health.
                </p>
            </section>
            <section className="mission-vision">
                <h2>Our Mission</h2>
                <p>To empower the next generation of healthcare professionals through innovative education and training.</p>
                <h2>Our Vision</h2>
                <p>To be a premier institution recognized for excellence in nursing and midwifery education.</p>
            </section>
        </div>
    );
};

export default About;