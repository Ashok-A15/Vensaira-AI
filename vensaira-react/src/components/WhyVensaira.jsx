import { useRef, useEffect } from 'react';
import '../styles/cards.css';

const VALUES = [
  { num: '01', title: 'Innovation First',      text: 'We explore emerging technologies and transform promising ideas into practical solutions.' },
  { num: '02', title: 'Business-Focused AI',   text: 'We focus on solving real business problems rather than implementing AI for the sake of technology.' },
  { num: '03', title: 'Scalable Architecture', text: 'Our solutions are designed to evolve with your business and technology requirements.' },
  { num: '04', title: 'Responsible AI',        text: 'We emphasize reliability, security, privacy, governance, transparency, and responsible deployment.' },
  { num: '05', title: 'End-To-End Expertise',  text: 'From strategy and architecture to development, deployment, and maintenance, we provide complete AI technology services.' },
  { num: '06', title: 'Future Ready',          text: 'We continuously explore emerging areas such as Agentic AI, Generative AI, LLMs, and Quantum Machine Learning.' },
];

export default function WhyVensaira() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = sectionRef.current.querySelectorAll('.value-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!prefersReduced) entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    cards.forEach((card, i) => {
      if (!prefersReduced) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
      }
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="why-vensaira" ref={sectionRef} aria-labelledby="why-title">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gradient-text" id="why-title">Why Vensaira AI Innovations?</h2>
        </div>

        <div className="values-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.num}>
              <span className="value-subtitle">{v.num}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-text">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
