import { Link } from 'react-router-dom';
import '../../styles/elearning-footer.css';

const currentYear = new Date().getFullYear();

export default function ElearningFooter() {
  return (
    <footer className="el-footer" role="contentinfo">
      <div className="el-footer-main">
        <div className="el-footer-container">
          <div className="el-footer-grid">

            {/* Brand Column */}
            <div className="el-footer-brand">
              <Link to="/elearning/courses" className="el-footer-logo" aria-label="Vensaira eLearning">
                <span className="el-footer-logo-text">
                  VENSAIRA AI <span>eLearning</span>
                </span>
              </Link>
              <p className="el-footer-tagline">
                Empowering the next generation of professionals with practical, industry-leading technology education.
              </p>
            </div>

            {/* Platform Column */}
            <div>
              <h4 className="el-footer-col-title">Platform</h4>
              <ul className="el-footer-links">
                <li><Link to="/elearning/courses">Courses</Link></li>
                <li><Link to="/elearning/projects">Projects</Link></li>
                <li><Link to="/elearning/dashboard">Dashboard</Link></li>
              </ul>
            </div>

            {/* Learning Column */}
            <div>
              <h4 className="el-footer-col-title">Learning</h4>
              <ul className="el-footer-links">
                <li><Link to="/elearning/courses/ai-machine-learning">AI & Machine Learning</Link></li>
                <li><Link to="/elearning/courses/generative-ai">Generative AI</Link></li>
                <li><Link to="/elearning/courses/cloud-computing">Cloud Computing</Link></li>
                <li><Link to="/elearning/courses/web-development">Full Stack Dev</Link></li>
                <li><Link to="/elearning/courses/data-analytics">Data Analytics</Link></li>
                <li><Link to="/elearning/courses/agentic-ai">Agentic AI</Link></li>
              </ul>
            </div>

            {/* Account & Legal Column */}
            <div>
              <h4 className="el-footer-col-title">Account</h4>
              <ul className="el-footer-links">
                <li><Link to="/elearning/login">Login</Link></li>
                <li><Link to="/elearning/signup">Sign Up</Link></li>
              </ul>
              <h4 className="el-footer-col-title" style={{ marginTop: '32px' }}>Legal</h4>
              <ul className="el-footer-links">
                <li><Link to="#">Terms & Conditions</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="el-footer-bottom-bar">
        <div className="el-footer-container">
          <div className="el-footer-bottom">
            <span>&copy; {currentYear} Vensaira AI. All rights reserved.</span>
            <Link to="/" className="el-footer-back-link">
              Back to main site &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
