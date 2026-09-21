import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sections.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.about-animate');
    
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
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const principles = [
    { num: '01', title: 'Technology', desc: 'Building practical technology solutions around real business requirements.' },
    { num: '02', title: 'Innovation', desc: 'Applying modern technologies to create meaningful digital improvements.' },
    { num: '03', title: 'Engineering', desc: 'Developing reliable, scalable and maintainable software systems.' },
    { num: '04', title: 'Partnership', desc: 'Working closely with organizations to understand challenges and deliver solutions.' }
  ];

  return (
    <section className="section section-white" id="about" ref={sectionRef} aria-labelledby="about-title" style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        <div className="about-container">
          
          {/* LEFT: Image */}
          <div className="about-animate about-image-wrapper">
            <img 
              src="/assets/about-us.jpg" 
              alt="Technology Consulting Professionals" 
              className="about-image" 
            />
          </div>

          {/* RIGHT: Content */}
          <div className="about-content">
            <span className="section-eyebrow about-animate" style={{ display: 'block', marginBottom: '16px' }}>
              ABOUT US
            </span>
            <h2 className="corporate-title about-animate" id="about-title" style={{ marginBottom: '24px', textAlign: 'left', lineHeight: 1.2 }}>
              Building Technology That Creates Business Value
            </h2>
            
            <p className="corporate-desc about-animate" style={{ marginBottom: '16px', textAlign: 'left', margin: '0 0 16px 0', fontSize: '1.1rem', color: '#334155' }}>
              Vensaira AI Innovations is a technology company focused on helping organizations use modern software, cloud, data and artificial intelligence to solve business challenges and create scalable digital solutions.
            </p>
            
            <p className="corporate-desc about-animate" style={{ textAlign: 'left', margin: '0 0 32px 0', fontSize: '1.05rem' }}>
              We bring together technology expertise, practical engineering and business-focused problem solving to help organizations build, modernize and improve digital solutions.
            </p>

            {/* Principles */}
            <div className="about-principles">
              {principles.map((p, idx) => (
                <div key={idx} className="about-principle about-animate">
                  <h4><span className="about-principle-num">{p.num}</span> {p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="about-animate" style={{ marginTop: '48px' }}>
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
                Work With Us &rarr;
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
