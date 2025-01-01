import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    pan: '',
    address: '',
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const newFiles = [...e.target.files];
    setFormData({ ...formData, files: [...formData.files, ...newFiles] });
  };

  const handleFileRemove = (index) => {
    const updatedFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: updatedFiles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User data submitted:', formData);
    // Redirect to dashboard or show a success message
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="signup-form-container">
      <div className="form-wrapper">
        <h2>Enter Policy Holder Details</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="phone"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
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
          <input
            type="text"
            name="pan"
            placeholder="Pan Number"
            value={formData.pan}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* File Upload Section */}
          <div className="file-input-container">
            <label>Upload Aadhar Card, Policy and Bills (PDF's)</label>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
            />
            <div className="file-preview-container">
              {formData.files.map((file, index) => (
                <div key={index} className="file-preview">
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleFileRemove(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button" onClick={() => handleNavigation('/dashboard')}>
            Sign Up
          </button>

          <p className="login-text">
            Already have an account? <a href="/signup">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
