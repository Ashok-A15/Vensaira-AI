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
  
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar" id="elearning-navbar" style={{ position: 'sticky', top: 0, background: '#FFFFFF', borderBottom: '1px solid var(--el-border)', zIndex: 1000, padding: '0 24px' }}>
      <div className="navbar-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Logo */}
        <Link to="/" className="brand-logo" aria-label="VENSAIRA AI Corporate Home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
          <img src="/assets/logo-header-clean.png" alt="VENSAIRA AI Logo" style={{ height: '36px' }} />
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--el-navy)', letterSpacing: '-0.02em', borderLeft: '2px solid var(--el-border)', paddingLeft: '12px' }}>eLearning</span>
        </Link>

        {/* Center Nav */}
        <nav aria-label="eLearning navigation">
          <ul className={`nav-menu${mobileOpen ? ' open' : ''}`} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '32px' }}>
            <li role="none">
              <Link to="/elearning" className={`nav-link${isActive('/elearning') ? ' active' : ''}`} style={{ color: 'var(--el-navy)', fontWeight: 600, textDecoration: 'none' }} role="menuitem" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li role="none">
              <Link to="/elearning/courses" className={`nav-link${isActive('/elearning/courses') ? ' active' : ''}`} style={{ color: 'var(--el-navy)', fontWeight: 600, textDecoration: 'none' }} role="menuitem" onClick={() => setMobileOpen(false)}>
                Courses
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <>
              <Link to="/elearning/dashboard" className="el-btn el-btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                Dashboard
              </Link>
              <button onClick={() => { logout(); navigate('/elearning'); }} className="el-btn" style={{ padding: '8px 20px', fontSize: '14px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/elearning/login" className="el-btn el-btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                Login
              </Link>
              <Link to="/elearning/signup" className="el-btn" style={{ padding: '8px 20px', fontSize: '14px' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
