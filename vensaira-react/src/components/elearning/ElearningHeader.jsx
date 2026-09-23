import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/header.css';
import '../../styles/elearning.css';

export default function ElearningHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const isCoursesActive = location.pathname.startsWith('/elearning/courses');
  const isProjectsActive = location.pathname.startsWith('/elearning/projects');

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/elearning/courses');
  };

  return (
    <header className="el-navbar" id="elearning-navbar">
      <div className="el-navbar-inner">

        {/* Brand Logo */}
        <Link
          to="/"
          className="brand-logo"
          aria-label="VENSAIRA AI Home"
          onClick={() => {
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="/assets/va-symbol-dark.png" alt="VENSAIRA AI Symbol" className="brand-symbol" />
          <div className="brand-text">
            <span className="brand-name">VENSAIRA AI</span>
            <span className="brand-tagline">YOUR VISION, POWERED BY AI</span>
          </div>
          <span className="el-brand-badge">
            eLearning
          </span>
        </Link>

        {/* Navigation Links & Actions */}
        <div className={`el-nav-menu-wrapper${mobileOpen ? ' open' : ''}`}>
          <nav aria-label="eLearning navigation">
            <ul className="el-nav-links" role="menubar">
              <li role="none">
                <Link
                  to="/elearning/courses"
                  className={`el-nav-item${isCoursesActive ? ' active' : ''}`}
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                >
                  Courses
                </Link>
              </li>
              <li role="none">
                <Link
                  to="/elearning/projects"
                  className={`el-nav-item${isProjectsActive ? ' active' : ''}`}
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                >
                  Projects
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Auth Actions */}
          <div className="el-nav-actions">
            {user ? (
              <>
                <Link
                  to="/elearning/dashboard"
                  className="el-btn el-btn-secondary"
                  style={{ padding: '8px 20px', fontSize: '14px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="el-btn"
                  style={{ padding: '8px 20px', fontSize: '14px', border: 'none', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/elearning/login"
                  className="el-btn el-btn-secondary"
                  style={{ padding: '8px 20px', fontSize: '14px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/elearning/signup"
                  className="el-btn"
                  style={{ padding: '8px 20px', fontSize: '14px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="el-mobile-toggle"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

      </div>
    </header>
  );
}
