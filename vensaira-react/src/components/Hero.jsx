import { Link } from 'react-router-dom';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero-section" id="home" aria-label="Hero">
      {/* Massive integrated 3D visual fading into the background via CSS masks */}
      <div className="hero-visual-bg" aria-hidden="true" />
      
      <div className="hero-content-container">
        <div className="hero-content">
          <span className="hero-eyebrow">Technology &bull; Engineering &bull; Innovation</span>

          <h1 className="hero-main-title">
            Technology That Moves Business Forward.
          </h1>

          <p className="hero-description">
            We build software, cloud, data and AI solutions that help businesses modernize, scale and grow.
          </p>

          <div className="hero-actions">
            <a href="#services" className="btn-hero-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById('ai-solutions')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Explore Our Services
            </a>
            <Link to="/contact" className="btn-hero-secondary">
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
