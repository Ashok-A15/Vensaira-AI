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
  const [activeSection, setActiveSection] = useState('home');
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
  }, [location.pathname, location.hash]);

  // Close dropdown on outside click
  const handleDocClick = useCallback((e) => {
    if (!e.target.closest('.nav-dropdown')) setDropdownOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, [handleDocClick]);

  // Hash change listener
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h) {
        setActiveSection(h);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Active section tracking on corporate home page ('/')
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionIds = ['home', 'ai-solutions', 'about', 'industries', 'innovation', 'elearning', 'customers'];

    // Initial check from hash
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      if (sectionIds.includes(hashId)) {
        setActiveSection(hashId);
      }
    } else if (window.scrollY < 150) {
      setActiveSection('home');
    }

    const onScrollSpy = () => {
      if (window.scrollY < 150) {
        setActiveSection('home');
        return;
      }

      const scrollPos = window.scrollY + 220;
      let current = '';

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          current = id;
          break;
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', onScrollSpy);
  }, [location.pathname, location.hash]);

  // Determine which navigation item is active
  const isItemActive = (key) => {
    if (location.pathname === '/contact') {
      return key === 'contact';
    }
    if (location.pathname.startsWith('/elearning')) {
      return key === 'elearning';
    }
    if (location.pathname.startsWith('/ai-solutions')) {
      return key === 'ai-solutions';
    }
    if (location.pathname.startsWith('/industries')) {
      return key === 'industries';
    }
    if (location.pathname === '/mission-vision') {
      return key === 'about';
    }

    // Home page with section hashes / scroll positions
    if (location.pathname === '/') {
      return activeSection === key;
    }

    return false;
  };

  // Smooth scroll helper for same-page anchors
  const handleAnchorClick = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
      setActiveSection(id);
    }
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  // Home link handler
  const handleHomeClick = () => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      window.history.pushState(null, '', '/');
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link
          to="/"
          className="brand-logo"
          aria-label="Vensaira AI Innovations Home"
          onClick={() => {
            setMobileOpen(false);
            if (location.pathname === '/') {
              window.history.pushState(null, '', '/');
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img src="/assets/logo-header-clean.png" alt="VENSAIRA AI Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation">
          <ul className={`nav-menu${mobileOpen ? ' open' : ''}`} role="menubar">

            <li role="none">
              <Link
                to="/"
                className={`nav-link${isItemActive('home') ? ' active' : ''}`}
                role="menuitem"
                onClick={handleHomeClick}
              >
                Home
              </Link>
            </li>

            <li role="none">
              <a
                href="/#about"
                className={`nav-link${isItemActive('about') ? ' active' : ''}`}
                role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#about')}
              >
                About Us
              </a>
            </li>

            {/* AI Solutions Dropdown */}
            <li className={`nav-dropdown${dropdownOpen ? ' open' : ''}`} role="none">
              <button
                className={`nav-link dropdown-toggle${isItemActive('ai-solutions') ? ' active' : ''}`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                role="menuitem"
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDropdownOpen(!dropdownOpen); }
                  if (e.key === 'Escape') setDropdownOpen(false);
                }}
              >
                <span>AI Solutions</span>
                <svg
                  className={`dropdown-chevron${dropdownOpen ? ' open' : ''}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <ul className="dropdown-menu" role="menu">
                {AI_SOLUTIONS_ITEMS.map((item) => (
                  <li key={item.label} role="none">
                    <Link
                      to={item.href}
                      role="menuitem"
                      onClick={(e) => {
                        if (item.href.startsWith('/#')) {
                          handleAnchorClick(e, item.href);
                        } else {
                          setMobileOpen(false);
                          setDropdownOpen(false);
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li role="none">
              <a
                href="/#industries"
                className={`nav-link${isItemActive('industries') ? ' active' : ''}`}
                role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#industries')}
              >
                Industries
              </a>
            </li>

            <li role="none">
              <a
                href="/#innovation"
                className={`nav-link${isItemActive('innovation') ? ' active' : ''}`}
                role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#innovation')}
              >
                Innovation
              </a>
            </li>

            <li role="none">
              <Link
                to="/elearning"
                className={`nav-link${isItemActive('elearning') ? ' active' : ''}`}
                role="menuitem"
                onClick={() => setMobileOpen(false)}
              >
                eLearning
              </Link>
            </li>

            <li role="none">
              <a
                href="/#customers"
                className={`nav-link${isItemActive('customers') ? ' active' : ''}`}
                role="menuitem"
                onClick={(e) => handleAnchorClick(e, '/#customers')}
              >
                Customers
              </a>
            </li>

            <li role="none">
              <Link
                to="/contact"
                className={`nav-link nav-btn-cta${isItemActive('contact') ? ' active' : ''}`}
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
