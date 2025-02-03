import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-wrapper">
        <div className="container">
          <div className="contact-content">
            <div className="contact-header text-center">
              <h1 className="gradient-text">Get in Touch</h1>
              <p className="lead">We'd love to hear from you</p>
            </div>
            
            <div className="row g-5 mt-4">
              <div className="col-lg-5">
                <div className="contact-info">
                  <div className="info-card">
                    <div className="info-item">
                      <i className="bi bi-geo-alt"></i>
                      <div>
                        <h5>Address</h5>
                        <p>123 Food Street, Foodie City, FC 12345</p>
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <i className="bi bi-envelope"></i>
                      <div>
                        <h5>Email</h5>
                        <p>support@zaykaexpress.com</p>
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <i className="bi bi-telephone"></i>
                      <div>
                        <h5>Phone</h5>
                        <p>+91 123 456 7890</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="social-links">
                    <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-7">
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-4">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                    
                    <div className="form-floating mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                    
                    <div className="form-floating mb-4">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Your Message"
                        style={{height: '150px'}}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                      <label htmlFor="message">Your Message</label>
                    </div>
                    
                    <button type="submit" className="btn btn-gradient">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}