import React from 'react';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to <span className="highlight-text">Soroti School of Comprehensive Nursing</span></h1>
                <p>Empowering the next generation of healthcare professionals in Uganda.</p>
                <a href="#about" className="btn btn-primary">Learn More</a>
            </div>
        </section>
    );
};

export default HeroSection;