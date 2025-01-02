import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Sidebar.css';
import logo from './images/TruthLens.png';
const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (e) => {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
  };

  return (
    <>
      <nav 
        id="sidebar" 
        className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <div className="bg-[#212A31] sidebar-header">
          <img 
            src={logo} 
            alt="Logo" 
            className="sidebar-logo"
          />
          <span className="sidebar-title">TruthLens</span>
        </div>
        
        <div className="bg-[#212A31] sidebar-nav">
          {/* Using Link to navigate to different pages */}
          <Link to="/dashboard" onClick={handleNavLinkClick} className="active">
            <i className="fas fa-file-alt"></i>
            <span>Overview</span>
          </Link>
          <Link to="/input" onClick={handleNavLinkClick} className="active">
            <i className="fas fa-file-alt"></i>
            <span>Input</span>
          </Link>
          {/* <Link to="/content-analysis" onClick={handleNavLinkClick}>
            <i className="fas fa-file-alt"></i>
            <span>Content</span>
          </Link> */}
          <Link to="/analytics" onClick={handleNavLinkClick}>
            <i className="fas fa-file-alt"></i>
            <span>Analytics</span>
          </Link>
          <Link to="/trend-and-report" onClick={handleNavLinkClick}>
            <i className="fas fa-chart-bar"></i>
            <span>Trends And Reports</span>
          </Link>
          <Link to="/settings" onClick={handleNavLinkClick}>
            <i className="fas fa-brain"></i>
            <span>Settings</span>
          </Link>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <img 
              src="https://avatar.iran.liara.run/public" 
              alt="User Avatar" 
              className="user-avatar"
            />
            <div className="user-details">
              <p className="user-name">Admin User</p>
              <p className="user-email">admin@misinform.ai</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="mobile-menu">
        <button 
          id="menu-toggle" 
          onClick={toggleMobileMenu}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
