// src/components/Footer.tsx
import React from 'react';
import '../Styling/Footer.scss';
import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Branding */}
          <div>
            <div className="footer__brand">
              <div className="footer__icon">
                <Target size={20} color="#fff" />
              </div>
              <span className="footer__name">PitchMe</span>
            </div>
            <p className="footer__desc">
              Perfect your professional pitch and land your dream job.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="footer__heading">Product</h4>
            <ul className="footer__list">
              <li><Link to="/builder">Resume Builder</Link></li>
              <li><Link to="/templates">Templates</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/ai-coach">AI Coach</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="footer__heading">Resources</h4>
            <ul className="footer__list">
              <li><a href="#">Career Tips</a></li>
              <li><a href="#">Interview Prep</a></li>
              <li><a href="#">Pitch Examples</a></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2024 PitchMe. All rights reserved. Perfect your pitch, perfect your career.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
