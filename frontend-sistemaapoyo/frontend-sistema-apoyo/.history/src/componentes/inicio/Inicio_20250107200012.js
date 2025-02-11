import React from 'react';
import './Inicio.css';

const Inicio = () => {
  const handleLanguageChange = (e) => {
    console.log('Language changed:', e.target.value);
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleCreateProfile = () => {
    console.log('Create profile clicked');
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Preply</div>
        <div className="nav-links">
          <a href="#" className="nav-link">Find tutors</a>
          <a href="#" className="nav-link">Corporate language training</a>
          <a href="#" className="nav-link">Become a tutor</a>
        </div>
        <div className="nav-right">
          <select className="language-select" onChange={handleLanguageChange}>
            <option>English, ARS</option>
          </select>
          <button className="login-btn" onClick={handleLogin}>Log In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Make a living by teaching the largest community of learners worldwide
          </h1>
          
          <div className="steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-line"></div>
              <h3 className="step-title">Sign up</h3>
              <p className="step-subtitle">to create your tutor profile</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-line"></div>
              <h3 className="step-title">Get approved</h3>
              <p className="step-subtitle">by our team in 5 business days</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Start earning</h3>
              <p className="step-subtitle">by teaching students all over the world!</p>
            </div>
          </div>

          <button className="cta-button" onClick={handleCreateProfile}>
            Create a tutor profile now
          </button>
        </div>

        <div className="hero-image-container">
          <img src="/api/placeholder/600/400" alt="Tutor teaching online" className="hero-image" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <h3 className="feature-title">Set your own rate</h3>
          <p className="feature-description">Choose your hourly rate and change it any time. On average, tutors earn $15-25/hour.</p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Teach anytime, anywhere</h3>
          <p className="feature-description">Decide when and how many hours you want to teach. Work from home or while traveling.</p>
        </div>
        <div className="feature-card">
          <h3 className="feature-title">Grow professionally</h3>
          <p className="feature-description">Attend professional development webinars and get guidance from our team.</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
