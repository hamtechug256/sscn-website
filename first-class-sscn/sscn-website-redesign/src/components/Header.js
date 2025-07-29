import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you will create a CSS file for styling

const Header = () => {
    return (
        <header className="main-header">
            <div className="container">
                <nav className="main-nav">
                    <Link to="/" className="logo">SSCN</Link>
                    <ul className="nav-links">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/about" className="nav-link">About Us</Link></li>
                        <li><Link to="/programs" className="nav-link">Programs</Link></li>
                        <li><Link to="/admissions" className="nav-link">Admissions</Link></li>
                        <li><Link to="/campus-life" className="nav-link">Campus Life</Link></li>
                        <li><Link to="/news" className="nav-link">News</Link></li>
                        <li><Link to="#contact" className="nav-link">Contact</Link></li>
                    </ul>
                    <button className="menu-toggle">☰</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;