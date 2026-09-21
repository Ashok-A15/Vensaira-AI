import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroAnimation } from '../animations/useHeroAnimation';
import '../styles/hero.css';

export default function Hero() {
  const canvasRef = useRef(null);
  useHeroAnimation(canvasRef);

  return (
    <section className="section hero-section" id="home" aria-label="Hero">
      <div className="container">
        <div className="hero-grid">

          {/* ── Left Content ── */}
          <div className="hero-content">
            <span className="hero-eyebrow">Intelligence Beyond Tomorrow</span>

            <h1 className="hero-main-title">Building Intelligent Solutions</h1>
            <h2 className="hero-accent-title gradient-text">for a Smarter Future</h2>

            <p className="hero-description">
              Vensaira AI Innovations builds intelligent, scalable solutions powered by AI and
              emerging technologies to help businesses automate, learn, and make better decisions.
            </p>

            <div className="hero-pills-row">
              <span className="tech-pill">AI &amp; Machine Learning</span>
              <span className="tech-pill-dot">&middot;</span>
              <span className="tech-pill">Generative AI &amp; LLMs</span>
              <span className="tech-pill-dot">&middot;</span>
              <span className="tech-pill">Agentic AI &amp; Intelligent Automation</span>
            </div>

            <p className="hero-subtitle">
              From AI strategy to deployment, we turn ideas into intelligent solutions.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                <span>Let&apos;s Build the Future</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <a href="#ai-solutions" className="btn btn-secondary"
                onClick={(e) => { e.preventDefault(); document.getElementById('ai-solutions')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Explore AI Solutions
              </a>
            </div>
          </div>

          {/* ── Right: Neural Network Canvas ── */}
          <div className="hero-visual-wrapper" role="img" aria-label="Interactive AI neural network visualization">
            <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />
            <div className="hero-canvas-overlay" aria-hidden="true" />

            {/* Floating Badges */}
            <div className="hero-badge hero-badge-tr" aria-hidden="true">
              <div className="badge-icon-box">🤖</div>
              <div>
                <span className="badge-value">Agentic AI</span>
                <span className="badge-label">Autonomous Workflows</span>
              </div>
            </div>

            <div className="hero-badge hero-badge-bl" aria-hidden="true">
              <div className="badge-icon-box">⚡</div>
              <div>
                <span className="badge-value">Generative AI</span>
                <span className="badge-label">Next-Gen Solutions</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
