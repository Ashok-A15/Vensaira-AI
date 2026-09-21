import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AI_SOLUTIONS } from '../../data/aiSolutions';
import { AI_CAPABILITIES } from '../../data/services';
import '../../styles/sections.css';
import '../../styles/cards.css'; // For the service-image-card classes

export default function AiMachineLearningPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'ai-machine-learning');
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Replicate the intersection observer for the local capability cards
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
    }

    const cards = document.querySelectorAll('.ai-cap-card');
    cards.forEach(card => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  if (!service) return null;

  return (
    <main id="main-content" className="service-detail-page">
      
      {/* 1. AI DETAIL PAGE HERO (450-550px) */}
      <section className="service-hero" style={{ 
        backgroundImage: `linear-gradient(to right, rgba(9, 22, 38, 0.9) 20%, rgba(9, 22, 38, 0.5) 100%), url(${service.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '120px 5% 80px',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        color: '#FFF'
      }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Link to="/ai-solutions" style={{ color: '#1769D1', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: 24, fontSize: '15px' }}>
            &larr; Back to AI Solutions
          </Link>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 700, marginBottom: 24, maxWidth: 800, lineHeight: 1.1 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: '20px', color: '#E2E8F0', maxWidth: 650, lineHeight: 1.6 }}>
            {service.desc}
          </p>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION (No excessive whitespace) */}
      <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', color: '#0F172A', fontWeight: 700, marginBottom: 16 }}>
            Intelligent technology designed around real business needs.
          </h2>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
            Vensaira applies artificial intelligence and machine learning to drive automation, power custom applications, enhance conversational experiences, and unlock deep data intelligence across your organization.
          </p>
        </div>
      </section>

      {/* 3. OUR AI CAPABILITIES */}
      <section className="section section-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-eyebrow">CAPABILITIES</span>
            <h2 className="corporate-title">Our AI Capabilities</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {AI_CAPABILITIES.map((cap, i) => (
              <article 
                key={i} 
                className="service-image-card ai-cap-card" 
                style={{ width: '100%' }}
              >
                <div 
                  className="service-image-wrapper"
                  style={{ transitionDelay: `${(i % 2) * 100}ms`, height: '280px' }}
                >
                  <img src={cap.image} alt={cap.title} className="service-cover-img" />
                </div>

                <div 
                  className="service-panel"
                  style={{ transitionDelay: `${(i % 2) * 100 + 200}ms`, width: '90%', marginTop: '-70px' }}
                >
                  <h3 className="sp-title" style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{cap.title}</h3>
                  <p style={{ color: '#1769D1', fontWeight: 700, fontSize: '0.9rem', marginBottom: '16px', letterSpacing: '0.02em' }}>
                    {cap.subtitle}
                  </p>
                  <p className="sp-desc" style={{ marginBottom: 0 }}>{cap.text}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. HOW WE APPLY AI */}
      <section style={{ padding: '80px 0', background: '#0F172A', color: '#FFF' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#FFF' }}>How We Apply AI</h2>
            <p style={{ color: '#A0ABB6', fontSize: '18px', maxWidth: 600, margin: '16px auto 0' }}>
              Delivering measurable impact through targeted implementation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {[
              { title: 'AI Strategy & Integration', text: 'Aligning AI capabilities with business objectives for seamless adoption.' },
              { title: 'Custom AI Applications', text: 'Building proprietary models and tools for unique operational needs.' },
              { title: 'Intelligent Automation', text: 'Streamlining complex workflows to reduce manual effort.' },
              { title: 'Data & Decision Intelligence', text: 'Enhancing forecasting and operational decision-making.' }
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: '#FFF' }}>{item.title}</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ 
            background: '#FFFFFF', 
            border: '1px solid #E2E8F0', 
            borderRadius: 12, 
            padding: '60px 40px', 
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)'
          }}>
            <h2 style={{ fontSize: '32px', color: '#0F172A', fontWeight: 700, marginBottom: 16 }}>
              Build Intelligent Solutions for Your Business
            </h2>
            <p style={{ color: '#475569', fontSize: '18px', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
              Talk to our team about applying AI and machine learning to your next business challenge.
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
              transition: 'background 0.2s, transform 0.2s'
            }}>
              Talk to Our Experts
              <span style={{ fontSize: '18px' }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
