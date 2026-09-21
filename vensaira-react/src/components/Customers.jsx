import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CUSTOMER_FOCUS_AREAS, WORK_PROCESS } from '../data/customerFocus';
import '../styles/sections.css';

export default function Customers() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.customer-animate');
    
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

  return (
    <section className="section section-ivory" id="customers" ref={sectionRef} aria-labelledby="customers-title" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Section Intro */}
        <div className="section-header customer-animate" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-eyebrow">CUSTOMERS</span>
          <h2 className="corporate-title" id="customers-title">Technology Built Around Business Needs</h2>
          <p className="corporate-desc" style={{ maxWidth: 740, margin: '16px auto 0' }}>
            We work closely with organizations to understand their challenges, design practical technology solutions and build digital capabilities that support their business goals.
          </p>
        </div>

        {/* Business Impact Visual Flow */}
        <div className="customer-animate" style={{ marginBottom: '80px' }}>
          <div className="impact-flow-container" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            background: '#FFF',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)'
          }}>
            <div className="impact-step" style={{ fontWeight: 700, color: 'var(--navy-dark)' }}>BUSINESS CHALLENGE</div>
            <div className="impact-arrow" style={{ color: 'var(--electric-blue)' }}>&rarr;</div>
            <div className="impact-step" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>DISCOVER</div>
            <div className="impact-arrow" style={{ color: 'var(--text-muted)' }}>&rarr;</div>
            <div className="impact-step" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>DESIGN</div>
            <div className="impact-arrow" style={{ color: 'var(--text-muted)' }}>&rarr;</div>
            <div className="impact-step" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>BUILD</div>
            <div className="impact-arrow" style={{ color: 'var(--text-muted)' }}>&rarr;</div>
            <div className="impact-step" style={{ fontWeight: 700, color: 'var(--electric-blue)' }}>MEASURABLE VALUE</div>
          </div>
        </div>

        {/* Editorial Layout: Image + Focus Areas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', marginBottom: '80px', alignItems: 'center' }}>
          
          <div className="customer-animate">
            <div style={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
            }}>
              <img 
                src="/assets/customers/customer-collaboration.jpg" 
                alt="Technology consulting and business collaboration"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
              />
            </div>
          </div>

          <div className="customer-focus-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
            {CUSTOMER_FOCUS_AREAS.map((area, idx) => (
              <div key={idx} className="customer-animate focus-area-item" style={{ 
                display: 'flex', 
                gap: '24px', 
                padding: '24px',
                background: '#FFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--electric-blue)' }}>
                  {area.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: '8px' }}>
                    {area.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* How We Work With Clients */}
        <div className="customer-animate" style={{ marginBottom: '80px', paddingTop: '60px', borderTop: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '40px', textAlign: 'center' }}>
            How We Work With Clients
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '24px' 
          }}>
            {WORK_PROCESS.map((step, idx) => (
              <div key={idx} style={{ padding: '24px', background: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#CBD5E1', marginBottom: '16px' }}>{step.num}</div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy-dark)', marginBottom: '12px' }}>{step.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="customer-animate" style={{ 
          background: 'var(--navy-dark)', 
          borderRadius: '12px', 
          padding: '60px 40px', 
          textAlign: 'center',
          color: '#FFF'
        }}>
          <h3 style={{ fontSize: '24px', color: '#FFF', marginBottom: 12, fontWeight: 700 }}>Let's Build Something That Matters</h3>
          <p style={{ color: '#94A3B8', fontSize: '16px', marginBottom: 28, maxWidth: 600, margin: '0 auto 28px' }}>
            Have a business challenge you'd like to explore? Let's discuss how technology can support your goals.
          </p>
          <Link to="/contact" style={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            gap: '8px',
            background: 'var(--electric-blue)', 
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
