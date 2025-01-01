import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingNav.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <h1>TruthLens</h1>
      
      <div className="button">
        <button className="navbar-button" onClick={() => handleNavigation('/signup')}>
          Sign Up
        </button>
        <button className="navbar-button" onClick={() => handleNavigation('/signin')}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
