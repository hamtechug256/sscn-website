import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const Admissions = () => {
    return (
        <div>
            <Header />
            <main>
                <section className="admissions-hero">
                    <h1>Admissions</h1>
                    <p>Join us at Soroti School of Comprehensive Nursing and take the first step towards a rewarding career in healthcare.</p>
                </section>
                
                <section className="admissions-requirements">
                    <h2>Admission Requirements</h2>
                    <ul>
                        <li>Completed application form</li>
                        <li>High school diploma or equivalent</li>
                        <li>Transcripts from previous education</li>
                        <li>Personal statement</li>
                        <li>Two letters of recommendation</li>
                    </ul>
                </section>

                <section className="admissions-process">
                    <h2>Application Process</h2>
                    <ol>
                        <li>Submit your application form online.</li>
                        <li>Pay the application fee.</li>
                        <li>Attend an interview (if required).</li>
                        <li>Receive your admission decision.</li>
                    </ol>
                </section>

                <section className="contact-section">
                    <h2>Contact Us</h2>
                    <ContactForm />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Admissions;