import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="nav-header">
      <div className="nav-container">
        <h1 className="nav-brand">Travel Blog</h1>
        <nav className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;