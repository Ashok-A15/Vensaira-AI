import { Link } from 'react-router-dom';
import '../../styles/elearning.css';

export default function ElearningFooter() {
  return (
    <footer className="elearning-footer">
      <div className="container">
        <div className="elearning-footer-content">
          <div className="elearning-footer-brand">
            <h2 className="elearning-footer-logo">VENSAIRA AI <span>eLearning</span></h2>
            <p className="elearning-footer-desc">
              Empowering the next generation of professionals with practical, industry-leading AI education.
            </p>
          </div>
          <div className="elearning-footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <ul>
                <li><Link to="/elearning/courses">Courses</Link></li>
                <li><Link to="/elearning/about">About</Link></li>
                <li><Link to="/elearning/contact">Contact</Link></li>
                <li><Link to="/elearning/account">Account</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><Link to="#">Terms & Conditions</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="elearning-footer-bottom">
          <p>&copy; 2026 Vensaira AI Innovations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
