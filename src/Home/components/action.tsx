import '../Styling/action.scss';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Action = () => {
  return (
    <section className="action">
      <div className="action__container">
        <div className="action__badge">
          <Sparkles className="action__sparkle" />
          Transform Your Career Today
        </div>

        <h2 className="action__title">Ready to Perfect Your Professional Pitch?</h2>
        
        <p className="action__subtitle">
          Join <strong>thousands of ambitious professionals</strong> leveling up their career game with smart, AI-powered pitches that make hiring managers say wow.
        </p>
        
        <Link to="/builder" className="action__button">
          Start Building Your Pitch Now
          <ArrowRight className="action__icon" />
        </Link>
      </div>
    </section>
  );
};

export default Action;
