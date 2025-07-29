import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <Link to="/">H&B Metal Workshop</Link>
        <div>
          <Link to="/about" className="ml-4">About</Link>
          <Link to="/services" className="ml-4">Services</Link>
          <Link to="/portfolio" className="ml-4">Portfolio</Link>
          <Link to="/testimonials" className="ml-4">Testimonials</Link>
          <Link to="/contact" className="ml-4">Contact</Link>
          <Link to="/order" className="ml-4">Order</Link>
          <Link to="/login" className="ml-4">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
