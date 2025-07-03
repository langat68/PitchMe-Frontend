import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Styling/Navbar.scss';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <header className={`navbar ${!isVisible ? 'navbar--hidden' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <div className="navbar__icon">
            <Target size={20} color="#fff" />
          </div>
          <span className="navbar__brand">PitchMe</span>
        </div>

        {user ? (
          <div className="navbar__user">
            <span className="navbar__initials">
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </span>
          </div>
        ) : (
          <Link to="/login" className="navbar__button">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
