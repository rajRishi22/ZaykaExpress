import React from 'react';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-wrapper">
        <div className="container my-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-6 about-content">
              <h1 className="display-4 mb-4 gradient-text">About Zayka Express</h1>
              <p className="lead text-secondary">Delivering happiness since 2024</p>
              <p className="mb-4 about-text">
                At Zayka Express, we believe that great food should be accessible to everyone. 
                Our journey began with a simple mission: to connect food lovers with the best local restaurants.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <h2 className="gradient-text">1000+</h2>
                  <p>Restaurants</p>
                </div>
                <div className="stat-item">
                  <h2 className="gradient-text">50k+</h2>
                  <p>Happy Customers</p>
                </div>
                <div className="stat-item">
                  <h2 className="gradient-text">100+</h2>
                  <p>Cities</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image-container">
                <img 
                  src="https://img.freepik.com/free-photo/top-view-frame-with-food-copy-space_23-2148247893.jpg"
                  alt="About Us" 
                  className="about-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;