import { useRef, useEffect } from 'react';
import '../styles/cards.css';
import '../styles/sections.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = sectionRef.current.querySelectorAll('.company-box, .company-card');
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
        el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
      }
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="container">
        <div className="company-card">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <h2 className="section-title gradient-text" id="about-title">About Vensaira AI Innovations</h2>
            <p className="section-description" style={{ maxWidth: 800, margin: '16px auto 0' }}>
              Vensaira AI Innovations is an AI and emerging-technology company focused on building intelligent,
              scalable, and practical solutions for businesses and organizations. We combine Artificial Intelligence,
              Machine Learning, Generative AI, Large Language Models, Agentic AI, Quantum Machine Learning, and
              AI-powered eLearning to create next-generation technology solutions. Our approach combines innovation,
              practical engineering, responsible AI, and business-focused problem solving.
            </p>
          </div>

          <div className="company-grid">
            {/* Mission */}
            <div className="company-box">
              <div className="company-box-content">
                <span className="company-tag">Our Mission</span>
                <h3 className="company-box-title">
                  &ldquo;To make advanced artificial intelligence practical, accessible, and valuable for businesses and society.&rdquo;
                </h3>
                <p className="company-box-desc">
                  We aim to help organizations leverage AI to automate processes, enhance decision-making, improve
                  customer experiences, accelerate innovation, and create new possibilities.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="company-box">
              <div className="company-box-content">
                <span className="company-tag">Our Vision</span>
                <h3 className="company-box-title">
                  &ldquo;To build a globally recognized AI innovation company delivering intelligent technologies that shape the future.&rdquo;
                </h3>
                <p className="company-box-desc">
                  We envision a future where intelligent systems work alongside people to solve complex problems,
                  accelerate innovation, and create meaningful impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
