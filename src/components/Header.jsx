import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTopLevel = location.pathname === '/' || location.pathname === '/workouts';

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
          <Link
            to="/"
            className={`header__nav-link ${location.pathname === '/' ? 'header__nav-link--active' : ''}`}
          >
            Machines
          </Link>
          <Link
            to="/workouts"
            className={`header__nav-link ${location.pathname.startsWith('/workout') ? 'header__nav-link--active' : ''}`}
          >
            Workouts
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
