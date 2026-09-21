import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sections.css';

export default function ServiceDetailPage({ service, children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [service]);

  if (!service) return null;

  return (
    <main id="main-content" className="service-detail-page">
      {/* Hero Section */}
      <section className="service-hero" style={{ 
        backgroundImage: `linear-gradient(to right, rgba(9, 22, 38, 0.9) 30%, rgba(9, 22, 38, 0.4) 100%), url(${service.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '160px 5% 100px',
        color: '#FFF'
      }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link to="/" style={{ color: '#1769D1', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: 24 }}>
            &larr; Back to Home
          </Link>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 700, marginBottom: 24, maxWidth: 800 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: '20px', color: '#A0ABB6', maxWidth: 600, lineHeight: 1.6 }}>
            {service.desc}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section section-white">
        <div className="container" style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 0' }}>
          
          <div style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: '32px', color: '#0F172A', marginBottom: 24 }}>Overview</h2>
            <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
              Vensaira AI Innovations brings industry-leading expertise in {service.title.toLowerCase()}. 
              We partner with organizations to build secure, resilient, and scalable systems that drive long-term business value.
            </p>
          </div>

          {children}

          {/* Generic CTA */}
          <div style={{ 
            marginTop: 80, 
            background: '#F8FAFC', 
            border: '1px solid #E2E8F0', 
            borderRadius: 12, 
            padding: 60, 
            textAlign: 'center' 
          }}>
            <h3 style={{ fontSize: '28px', color: '#0F172A', marginBottom: 16 }}>Ready to transform your business?</h3>
            <p style={{ color: '#475569', fontSize: '18px', marginBottom: 32 }}>Let's discuss how our {service.title} solutions can help you achieve your goals.</p>
            <Link to="/contact" style={{ 
              display: 'inline-block', 
              background: '#1769D1', 
              color: '#FFF', 
              padding: '16px 32px', 
              borderRadius: 6, 
              textDecoration: 'none', 
              fontWeight: 600,
              transition: 'background 0.2s'
            }}>
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
