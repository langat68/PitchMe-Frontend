
import { Button } from '@mui/material';
import { ArrowRight, Sparkles, Star, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Styling/Hero.scss'; // Custom SCSS styles

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="badge">
          <Sparkles className="icon" />
          AI-Powered Professional Pitch Builder
        </div>

        <h1 className="hero-title">
          Perfect Your
          <span className="block">Professional Pitch</span>
        </h1>

        <p className="hero-subtitle">
          Create an irresistible professional pitch that makes employers take notice. 
          Build compelling resumes and portfolios with AI-powered suggestions that help you 
          <span className="highlight"> stand out from the crowd</span>.
        </p>

        <div className="hero-buttons">
          <Link to="/build-resume">
            <Button variant="contained" className="cta-primary" endIcon={<ArrowRight />}>
              Create My Pitch
            </Button>
          </Link>
          <Link to="/ai-coach">
            <Button variant="outlined" className="cta-secondary" startIcon={<Sparkles />}>
              Improve My Pitch
            </Button>
          </Link>
        </div>

        <div className="hero-social-proof">
          <div className="proof-item">
            <Star className="proof-icon yellow" />
            <span>4.9/5 from 10k+ users</span>
          </div>
          <div className="proof-item">
            <TrendingUp className="proof-icon green" />
            <span>85% more interviews</span>
          </div>
          <div className="proof-item">
            <Award className="proof-icon blue" />
            <span>Industry-optimized</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
