import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleAnchorClick = (e, id) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-corporate">
      <div className="footer-main-section">
        <div className="container">
          <div className="footer-main-grid">
            
            {/* Column 1: Brand */}
            <div className="footer-brand-col">
              <Link to="/" className="footer-logo" aria-label="VENSAIRA AI Home">
                <img src="/assets/logo-footer-clean.png" alt="VENSAIRA AI Logo" />
              </Link>
              <p className="footer-tagline">
                Your Vision, Powered by AI
              </p>
              <p className="footer-mission">
                Building practical technology solutions with AI, software, cloud and data.
              </p>
            </div>

            {/* Column 2: Company */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">COMPANY</h4>
              <ul className="footer-links">
                <li>
                  <a href="/#about" onClick={(e) => handleAnchorClick(e, 'about')}>About Us</a>
                </li>
                <li>
                  <a href="/#customers" onClick={(e) => handleAnchorClick(e, 'customers')}>Customers</a>
                </li>
                <li>
                  <a href="/#innovation" onClick={(e) => handleAnchorClick(e, 'innovation')}>Innovation</a>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">SERVICES</h4>
              <ul className="footer-links">
                <li><Link to="/services/software-engineering">Software Engineering</Link></li>
                <li><Link to="/ai-solutions/ai-machine-learning">AI & Machine Learning</Link></li>
                <li><Link to="/services/cloud-infrastructure">Cloud & Infrastructure</Link></li>
                <li><Link to="/services/data-intelligence">Data & Analytics</Link></li>
              </ul>
            </div>

            {/* Column 4: AI Solutions */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">AI SOLUTIONS</h4>
              <ul className="footer-links">
                <li><Link to="/ai-solutions/ai-machine-learning">AI & Machine Learning</Link></li>
                <li><Link to="/ai-solutions/generative-ai-llms">Generative AI & LLMs</Link></li>
                <li><Link to="/ai-solutions/agentic-ai">Agentic AI</Link></li>
                <li><Link to="/ai-solutions/ai-chatbots">AI Chatbots</Link></li>
                <li><Link to="/ai-solutions/conversational-ai">Conversational AI</Link></li>
                <li><Link to="/ai-solutions/quantum-machine-learning">Quantum Machine Learning</Link></li>
                <li><Link to="/ai-solutions/ai-elearning">AI eLearning</Link></li>
              </ul>
            </div>

            {/* Column 5: Industries */}
            <div className="footer-link-col">
              <h4 className="footer-col-title">INDUSTRIES</h4>
              <ul className="footer-links">
                <li><Link to="/industries/healthcare">Healthcare</Link></li>
                <li><Link to="/industries/education">Education & eLearning</Link></li>
                <li><Link to="/industries/logistics">Logistics & Transportation</Link></li>
                <li><Link to="/industries/financial-services">Financial Services</Link></li>
                <li><Link to="/industries/retail-ecommerce">Retail & E-Commerce</Link></li>
                <li><Link to="/industries/manufacturing">Manufacturing</Link></li>
                <li><Link to="/industries/technology-saas">Technology & SaaS</Link></li>
                <li><Link to="/industries/professional-services">Professional Services</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container">
          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; {currentYear} Vensaira AI. All rights reserved.
            </div>
            <div className="footer-legal">
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
