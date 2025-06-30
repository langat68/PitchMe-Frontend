import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Styling/Navbar.scss';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`navbar ${!isVisible ? 'navbar--hidden' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <div className="navbar__icon">
            <Target size={20} color="#fff" />
          </div>
          <span className="navbar__brand">PitchMe</span>
        </div>

        <Link to="/signin" className="navbar__button">
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
