import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-container">

          {/* ── Left: Logo + Tagline ── */}
          <div className="footer-left">
            <Link to="/" className="footer-logo-link" aria-label="VENSAIRA AI Home">
              <img src="/assets/logo-footer-clean.png" alt="VENSAIRA AI Logo" loading="lazy" />
            </Link>
            <p className="footer-tagline">Your vision, powered by AI.</p>
          </div>

          {/* ── Center: Company & Solutions columns ── */}
          <div className="footer-center">
            <div className="footer-col">
              <h3 className="footer-col-title">Company</h3>
              <ul>
                <li><a href="/#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({behavior:'smooth'}); }}>About</a></li>
                <li><a href="/#innovation" onClick={(e) => { e.preventDefault(); document.getElementById('innovation')?.scrollIntoView({behavior:'smooth'}); }}>Innovation</a></li>
                <li><Link to="/mission-vision">Mission &amp; Vision</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3 className="footer-col-title">Solutions</h3>
              <ul>
                <li><a href="/#ai-solutions" onClick={(e) => { e.preventDefault(); document.getElementById('ai-solutions')?.scrollIntoView({behavior:'smooth'}); }}>AI Solutions</a></li>
                <li><a href="/#industries" onClick={(e) => { e.preventDefault(); document.getElementById('industries')?.scrollIntoView({behavior:'smooth'}); }}>Industries</a></li>
                <li><a href="/#elearning" onClick={(e) => { e.preventDefault(); document.getElementById('elearning')?.scrollIntoView({behavior:'smooth'}); }}>eLearning</a></li>
              </ul>
            </div>
          </div>

          {/* ── Right: Get in Touch ── */}
          <div className="footer-right">
            <div className="footer-col">
              <h3 className="footer-col-title">Get in touch</h3>
              <ul>
                <li><Link to="/contact">Contact us</Link></li>
                <li><a href="https://www.linkedin.com/company/vensaira-ai/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 Vensaira AI Innovations. All rights reserved.</p>
          <div className="footer-bottom-links" aria-label="Footer legal links">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>&middot;</span>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
