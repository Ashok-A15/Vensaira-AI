import { Link } from 'react-router-dom';
import '../styles/sections.css';

// Particle data for CTA banner
const PARTICLES = [
  { style: { width: 180, height: 180, top: '10%', left: '5%', '--dur': '10s', '--dy': '-40px', '--dx': '20px', '--sc': '1.1' } },
  { style: { width: 100, height: 100, top: '60%', left: '15%', '--dur': '7s', '--dy': '-25px', '--dx': '-15px', '--sc': '0.9' } },
  { style: { width: 220, height: 220, top: '5%', right: '8%', '--dur': '12s', '--dy': '-35px', '--dx': '-25px', '--sc': '1.05' } },
  { style: { width: 80, height: 80, bottom: '15%', right: '20%', '--dur': '9s', '--dy': '-20px', '--dx': '10px', '--sc': '1.15' } },
  { style: { width: 140, height: 140, top: '40%', right: '5%', '--dur': '8s', '--dy': '-30px', '--dx': '-10px', '--sc': '1.0' } },
];

export default function ContactCTA() {
  return (
    <section className="section section-alt" id="contact-cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-banner">
          {/* Animated Particles */}
          <div className="cta-particles" aria-hidden="true">
            {PARTICLES.map((p, i) => (
              <div key={i} className="cta-particle" style={p.style} />
            ))}
          </div>

          <div className="cta-banner-inner">
            <h2 className="cta-banner-title" id="cta-title">Let&apos;s Build the Future with AI</h2>
            <p className="cta-banner-desc">
              Whether you are exploring your first AI initiative or looking to scale an existing AI ecosystem,
              Vensaira AI Innovations can help transform your ideas into intelligent, production-ready solutions.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ margin: '0 auto' }}>
              <span>Contact Us</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
