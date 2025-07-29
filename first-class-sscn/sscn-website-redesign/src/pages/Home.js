import React from 'react';
import HeroSection from '../components/HeroSection';
import ProgramsSection from '../components/ProgramsSection';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <ProgramsSection />
            <Testimonials />
            <ContactForm />
        </div>
    );
};

export default Home;