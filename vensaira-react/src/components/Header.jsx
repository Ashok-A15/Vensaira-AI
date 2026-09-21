import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

const AI_SOLUTIONS_ITEMS = [
  { label: 'AI & Machine Learning', href: '/ai-solutions/ai-machine-learning' },
  { label: 'Generative AI & LLMs', href: '/ai-solutions/generative-ai-llms' },
  { label: 'Agentic AI', href: '/ai-solutions/agentic-ai' },
  { label: 'AI Chatbots', href: '/ai-solutions/ai-chatbots' },
  { label: 'Conversational AI', href: '/ai-solutions/conversational-ai' },
  { label: 'Quantum Machine Learning', href: '/ai-solutions/quantum-machine-learning' },
  { label: 'AI eLearning', href: '/ai-solutions/ai-elearning' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown on outside click
  const handleDocClick = useCallback((e) => {
    if (!e.target.closest('.nav-dropdown')) setDropdownOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, [handleDocClick]);

  const isActive = (path) => location.pathname === path;

  // Smooth scroll helper for same-page anchors
  const handleAnchorClick = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="brand-logo" aria-label="VENSAIRA AI Home">
          <img src="/assets/logo-header-clean.png" alt="VENSAIRA AI Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation">
          <ul className={`nav-menu${mobileOpen ? ' open' : ''}`} role="menubar">

            <li role="none">
              <Link to="/" className={`nav-link${isActive('/') ? ' active' : ''}`} role="menuitem"
                onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Home
              </Link>
            </li>

            <li role="none">
              <a href="/#about" className="nav-link" role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#about')}>
                About Us
              </a>
            </li>

            {/* AI Solutions Dropdown */}
            <li className={`nav-dropdown${dropdownOpen ? ' open' : ''}`} role="none">
              <button
                className="nav-link dropdown-toggle"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                role="menuitem"
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDropdownOpen(!dropdownOpen); }
                  if (e.key === 'Escape') setDropdownOpen(false);
                }}
              >
                AI Solutions
              </button>
              <ul className="dropdown-menu" role="menu">
                {AI_SOLUTIONS_ITEMS.map((item) => (
                  <li key={item.label} role="none">
                    <Link to={item.href} role="menuitem"
                      onClick={(e) => {
                        if (item.href.startsWith('/#')) {
                          handleAnchorClick(e, item.href);
                        } else {
                          setMobileOpen(false);
                        }
                      }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li role="none">
              <a href="/#industries" className="nav-link" role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#industries')}>
                Industries
              </a>
            </li>

            <li role="none">
              <a href="/#innovation" className="nav-link" role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#innovation')}>
                Innovation
              </a>
            </li>

            <li role="none">
              <Link to="/elearning" className={`nav-link${isActive('/elearning') ? ' active' : ''}`} role="menuitem"
                onClick={() => setMobileOpen(false)}>
                eLearning
              </Link>
            </li>

            <li role="none">
              <a href="/#customers" className="nav-link" role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#customers')}>
                Customers
              </a>
            </li>

            <li role="none">
              <Link
                to="/contact"
                className={`nav-link nav-btn-cta${isActive('/contact') ? ' active' : ''}`}
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                <span>Contact Us</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </li>

          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="nav-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
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
