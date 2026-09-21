import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sections.css';

export default function ELearning() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.el-home-animate');
    
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
    <section className="section section-ivory" id="elearning" ref={sectionRef} aria-labelledby="elearning-title" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          
          {/* LEFT: Content */}
          <div className="el-home-content">
            <span className="section-eyebrow el-home-animate" style={{ display: 'block', marginBottom: '16px' }}>
              eLEARNING
            </span>
            <h2 className="corporate-title el-home-animate" id="elearning-title" style={{ marginBottom: '24px', textAlign: 'left', lineHeight: 1.2 }}>
              Learn. Build. Grow.
            </h2>
            
            <p className="corporate-desc el-home-animate" style={{ marginBottom: '32px', textAlign: 'left', fontSize: '1.1rem', color: '#475569' }}>
              Build practical technology skills through structured learning experiences designed around today's software, cloud, data and AI technologies.
            </p>
            
            <div className="el-home-animate">
              <Link to="/elearning" style={{ 
                display: 'inline-flex', 
                alignItems: 'center',
                gap: '8px',
                background: '#0B1F3A', 
                color: '#FFF', 
                padding: '14px 28px', 
                borderRadius: '6px', 
                textDecoration: 'none', 
                fontWeight: 600,
                transition: 'background 0.2s',
                fontSize: '15px'
              }}>
                Explore eLearning &rarr;
              </Link>
            </div>
          </div>

          {/* RIGHT: Visual & Categories */}
          <div className="el-home-visual el-home-animate">
            <div style={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(11, 31, 58, 0.08)',
              marginBottom: '24px'
            }}>
              <img 
                src="/assets/elearning/elearning-home.jpg" 
                alt="Vensaira eLearning Platform"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '16/10' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['AI & Machine Learning', 'Generative AI', 'Cloud Computing', 'Software Engineering'].map((cat, i) => (
                <span key={i} style={{
                  padding: '8px 16px',
                  background: '#F4F7FB',
                  color: '#2563EB',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid #E2E8F0'
                }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
