import React from 'react';

const ProgramsSection = () => {
    const programs = [
        {
            title: 'Diploma in Nursing',
            description: 'Our comprehensive Diploma in Nursing program prepares students for a rewarding career in healthcare.',
            link: 'programs.html'
        },
        {
            title: 'Diploma in Midwifery',
            description: 'The Diploma in Midwifery program focuses on providing specialized training in maternal and child health.',
            link: 'programs.html'
        },
        {
            title: 'Certificate in Nursing',
            description: 'The Certificate in Nursing program offers foundational knowledge and practical skills for entry-level nursing roles.',
            link: 'programs.html'
        },
        {
            title: 'Certificate in Midwifery',
            description: 'Our Certificate in Midwifery provides fundamental training in midwifery practices.',
            link: 'programs.html'
        }
    ];

    return (
        <section id="programs" className="programs-section">
            <div className="container">
                <h2 className="section-title">Our Academic Programs</h2>
                <div className="programs-grid">
                    {programs.map((program, index) => (
                        <div className="program-card" key={index}>
                            <h3>{program.title}</h3>
                            <p>{program.description}</p>
                            <a href={program.link} className="btn btn-primary">Learn More</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsSection;