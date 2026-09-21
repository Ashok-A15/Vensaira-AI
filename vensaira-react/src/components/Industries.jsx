import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INDUSTRIES } from '../data/industries';
import '../styles/sections.css';
import '../styles/cards.css';

export default function Industries() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.ind-animate');
    
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
        el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const featuredIndustry = INDUSTRIES[0];
  const listIndustries = INDUSTRIES.slice(1);

  return (
    <section className="section section-ivory" id="industries" ref={sectionRef} aria-labelledby="industries-title" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div className="section-header ind-animate" style={{ textAlign: 'left', marginBottom: '60px' }}>
          <span className="section-eyebrow">INDUSTRIES</span>
          <h2 className="corporate-title" id="industries-title">Technology Solutions Across Industries</h2>
          <p className="corporate-desc" style={{ maxWidth: 700, margin: '16px 0 0' }}>
            We help organizations across industries use software, cloud, data and AI to improve operations, create better experiences and build scalable digital solutions.
          </p>
        </div>

        <div className="industries-layout" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '60px',
          alignItems: 'start'
        }}>
          
          {/* Featured Industry (Left) */}
          <Link to={featuredIndustry.route} className="ind-featured-card ind-animate" style={{
            display: 'block',
            textDecoration: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#FFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            color: 'inherit'
          }}>
            <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
              <img 
                src={featuredIndustry.image} 
                alt={featuredIndustry.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                className="ind-featured-img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 60%)'
              }} />
            </div>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '24px', color: '#0F172A', fontWeight: 700, marginBottom: '12px' }}>
                {featuredIndustry.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                {featuredIndustry.shortDescription}
              </p>
              <span style={{ color: '#1769D1', fontWeight: 600, fontSize: '15px' }}>Explore Industry &rarr;</span>
            </div>
          </Link>

          {/* Industry Navigation Grid (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {listIndustries.map((ind) => (
              <Link 
                to={ind.route} 
                key={ind.id}
                className="ind-list-card ind-animate"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                  background: '#FFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.02)'
                }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', marginBottom: '16px', flexShrink: 0 }}>
                  <img src={ind.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '18px', color: '#0F172A', fontWeight: 600, marginBottom: '8px' }}>
                  {ind.title}
                </h4>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  {ind.shortDescription}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
