import { useEffect, useState } from 'react';
import { Target, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styling/Navbar.scss';

// if you use Redux:
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { logout } from '../../Redux/slices/authSlice';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // from Redux
  const user = useSelector((state: RootState) => state.auth.user);

  // fallback to localStorage if Redux user is null
  const [localUser, setLocalUser] = useState<{ firstName: string; lastName: string } | null>(null);

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
    if (!user) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setLocalUser(JSON.parse(userStr));
      } else {
        setLocalUser(null);
      }
    }
  }, [user]);

  const handleLogout = () => {
    // clear Redux
    dispatch(logout());

    // clear localStorage fallback
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    navigate('/login');
  };

  const displayedUser = user || localUser;

  return (
    <header className={`navbar ${!isVisible ? 'navbar--hidden' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo">
          <div className="navbar__icon">
            <Target size={20} color="#fff" />
          </div>
          <span className="navbar__brand">PitchMe</span>
        </div>

        {displayedUser ? (
          <div className="navbar__user">
            <span className="navbar__initials">
              {displayedUser.firstName[0].toUpperCase()}
              {displayedUser.lastName[0].toUpperCase()}
            </span>
            <button
              className="navbar__logout"
              onClick={handleLogout}
              title="Log out"
            >
              <LogOut size={16} color="#fff" />
            </button>
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
