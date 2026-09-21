import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/header.css';

export default function ElearningHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar" id="elearning-navbar" style={{ position: 'sticky', top: 0, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', zIndex: 1000, padding: '0 24px' }}>
      <div className="navbar-container" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Logo */}
        <Link to="/" className="brand-logo" aria-label="VENSAIRA AI eLearning Home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
          <img src="/assets/logo-header-clean.png" alt="VENSAIRA AI Logo" style={{ height: '36px' }} />
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', borderLeft: '2px solid var(--border-color)', paddingLeft: '12px' }}>eLearning</span>
        </Link>

        {/* Center Nav */}
        <nav aria-label="eLearning navigation">
          <ul className={`nav-menu${mobileOpen ? ' open' : ''}`} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li role="none">
              <Link to="/elearning" className={`nav-link${isActive('/elearning') ? ' active' : ''}`} role="menuitem" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li role="none">
              <Link to="/elearning/courses" className={`nav-link${isActive('/elearning/courses') ? ' active' : ''}`} role="menuitem" onClick={() => setMobileOpen(false)}>
                Courses
              </Link>
            </li>
            <li role="none">
              <Link to="/elearning/about" className={`nav-link${isActive('/elearning/about') ? ' active' : ''}`} role="menuitem" onClick={() => setMobileOpen(false)}>
                About
              </Link>
            </li>
            <li role="none">
              <Link to="/elearning/contact" className={`nav-link${isActive('/elearning/contact') ? ' active' : ''}`} role="menuitem" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </li>
            
            {/* Account on Mobile */}
            <li role="none" className="mobile-only-link" style={{ display: 'none' }}>
              <Link to="/elearning/account" className={`nav-link${isActive('/elearning/account') ? ' active' : ''}`} role="menuitem" onClick={() => setMobileOpen(false)}>
                Account
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Nav (Desktop only) */}
        <div className="desktop-account-nav" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/elearning/account" className="btn btn-primary" style={{ padding: '8px 20px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem', transition: 'background 0.2s' }}>
            Account
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="nav-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
