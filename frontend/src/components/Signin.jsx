import React, { useState } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('User data submitted:', formData);
    };
  
    const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(path);
    };

  

  return (
    <div className="signin-form-container">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button" onClick={() => handleNavigation('/dashboard')}>
            Sign In
          </button>
          <p className="signup-text">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
