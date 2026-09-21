import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INNOVATION_PILLARS, TECHNOLOGY_AREAS } from '../data/innovation';
import '../styles/sections.css';

export default function Innovation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.innov-animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!prefersReduced) entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach((el, i) => {
      if (!prefersReduced) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-white" id="innovation" ref={sectionRef} aria-labelledby="innovation-title" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Intro */}
        <div className="section-header innov-animate" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-eyebrow">INNOVATION</span>
          <h2 className="corporate-title" id="innovation-title">Exploring What’s Next in Technology</h2>
          <p className="corporate-desc" style={{ maxWidth: 700, margin: '16px auto 0' }}>
            We explore emerging technologies and transform promising ideas into practical solutions that create meaningful value for businesses.
          </p>
        </div>

        {/* Large Technology Image */}
        <div className="innov-animate" style={{ 
          width: '100%', 
          height: 'min(500px, 60vh)', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          marginBottom: '60px',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
        }}>
          <img 
            src="/assets/innovation/innovation-main.jpg" 
            alt="Technology Research and Innovation Lab" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Innovation Pillars (4 Columns) */}
        <div className="innov-pillars-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '40px',
          marginBottom: '60px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '60px'
        }}>
          {INNOVATION_PILLARS.map((pillar, idx) => (
            <div key={idx} className="innov-pillar innov-animate" style={{ 
              transition: 'transform 0.3s ease',
              cursor: 'default'
            }}>
              <span className="innov-pillar-num" style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: 800,
                color: '#94A3B8',
                marginBottom: '12px',
                transition: 'color 0.3s ease'
              }}>
                {pillar.num}
              </span>
              <h3 className="innov-pillar-title" style={{ 
                fontSize: '20px', 
                color: '#0F172A', 
                fontWeight: 700, 
                marginBottom: '12px',
                transition: 'transform 0.3s ease'
              }}>
                {pillar.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technology Areas */}
        <div className="innov-animate" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '16px 24px'
          }}>
            {TECHNOLOGY_AREAS.map((tech, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', letterSpacing: '0.02em' }}>
                  {tech}
                </span>
                {idx !== TECHNOLOGY_AREAS.length - 1 && (
                  <span style={{ color: '#CBD5E1', fontSize: '20px', lineHeight: 1 }}>&middot;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="innov-animate" style={{ 
          background: '#F8FAFC', 
          border: '1px solid #E2E8F0', 
          borderRadius: '12px', 
          padding: '60px 40px', 
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)'
        }}>
          <h3 style={{ fontSize: '24px', color: '#0F172A', marginBottom: 12, fontWeight: 700 }}>Have an Idea Worth Exploring?</h3>
          <p style={{ color: '#475569', fontSize: '16px', marginBottom: 28, maxWidth: 600, margin: '0 auto 28px' }}>
            Let's explore how emerging technology could support your next business initiative.
          </p>
          <Link to="/contact" style={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            gap: '8px',
            background: '#1769D1', 
            color: '#FFF', 
            padding: '14px 28px', 
            borderRadius: '6px', 
            textDecoration: 'none', 
            fontWeight: 600,
            transition: 'background 0.2s',
            fontSize: '15px'
          }}>
            Talk to Our Experts &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
