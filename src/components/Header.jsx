import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const isTopLevel = location.pathname === '/' || location.pathname === '/workouts' || location.pathname === '/create-workout';

  return (
    <header className="header">
      <div className="header__inner">
        {!isTopLevel && (
          <button className="header__back" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="header__title" onClick={() => navigate('/')}>
          Gym Machine Guide
        </h1>
        <nav className="header__nav">
          <Link to="/" className={`header__nav-link ${location.pathname === '/' ? 'header__nav-link--active' : ''}`}>
            Machines
          </Link>
          <Link to="/workouts" className={`header__nav-link ${location.pathname.startsWith('/workout') && location.pathname !== '/create-workout' ? 'header__nav-link--active' : ''}`}>
            Workouts
          </Link>
          <Link to="/create-workout" className={`header__nav-link ${location.pathname === '/create-workout' ? 'header__nav-link--active' : ''}`}>
            Create Workout
          </Link>
        </nav>
        <button
          className="header__theme-toggle"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

export default Header;
