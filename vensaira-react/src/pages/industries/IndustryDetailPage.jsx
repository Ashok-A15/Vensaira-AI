import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sections.css';

export default function IndustryDetailPage({ industry }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (industry?.title) {
      document.title = `${industry.title} | VENSAIRA AI`;
    }
  }, [industry]);

  if (!industry) return null;

  return (
    <main id="main-content" className="industry-detail-page">
      {/* 1. Professional Hero */}
      <section className="service-hero" style={{ 
        backgroundImage: `linear-gradient(to right, rgba(9, 22, 38, 0.9) 30%, rgba(9, 22, 38, 0.4) 100%), url(${industry.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '160px 5% 100px',
        color: '#FFF',
        minHeight: '450px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Link to="/#industries" style={{ color: '#1769D1', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: 24 }}>
            &larr; Back to Industries
          </Link>
          <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1769D1', marginBottom: 12 }}>
            Industry Focus
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 700, marginBottom: 24, maxWidth: 800 }}>
            {industry.title}
          </h1>
          <p style={{ fontSize: '20px', color: '#A0ABB6', maxWidth: 650, lineHeight: 1.6 }}>
            {industry.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. Content Layout */}
      <section className="section section-white" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginBottom: '80px' }}>
            
            {/* Challenges */}
            <div>
              <h2 style={{ fontSize: '28px', color: '#0F172A', fontWeight: 700, marginBottom: 24 }}>Industry Challenges</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {industry.challenges.map((challenge, i) => (
                  <li key={i} style={{ 
                    position: 'relative', 
                    paddingLeft: '28px', 
                    marginBottom: '16px', 
                    color: '#475569', 
                    fontSize: '16px', 
                    lineHeight: 1.6 
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: '6px',
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#1769D1' 
                    }} />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* How We Help */}
            <div>
              <h2 style={{ fontSize: '28px', color: '#0F172A', fontWeight: 700, marginBottom: 24 }}>How We Help</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {industry.solutions.map((solution, i) => (
                  <li key={i} style={{ 
                    position: 'relative', 
                    paddingLeft: '28px', 
                    marginBottom: '16px', 
                    color: '#475569', 
                    fontSize: '16px', 
                    lineHeight: 1.6 
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: '6px',
                      color: '#1769D1',
                      fontWeight: 'bold'
                    }}>✓</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* CTA */}
          <div style={{ 
            background: '#F8FAFC', 
            border: '1px solid #E2E8F0', 
            borderRadius: 12, 
            padding: '60px 40px', 
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)'
          }}>
            <h3 style={{ fontSize: '28px', color: '#0F172A', marginBottom: 16 }}>Talk to Our Experts</h3>
            <p style={{ color: '#475569', fontSize: '18px', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
              Learn how Vensaira can help your organization leverage modern technology to solve {industry.title.toLowerCase()} challenges.
            </p>
            <Link to="/contact" style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '8px',
              background: '#1769D1', 
              color: '#FFF', 
              padding: '16px 32px', 
              borderRadius: 6, 
              textDecoration: 'none', 
              fontWeight: 600,
              transition: 'background 0.2s'
            }}>
              Talk to Our Team &rarr;
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
