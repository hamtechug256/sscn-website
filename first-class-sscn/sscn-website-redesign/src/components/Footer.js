import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Soroti School of Comprehensive Nursing. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/about.html">About Us</a></li>
                    <li><a href="/programs.html">Programs</a></li>
                    <li><a href="/admissions.html">Admissions</a></li>
                    <li><a href="/campus-life.html">Campus Life</a></li>
                    <li><a href="/news.html">News</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;