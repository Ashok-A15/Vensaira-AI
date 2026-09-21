import { useRef, useEffect } from 'react';
import '../styles/cards.css';

const ITEMS = [
  {
    title: 'Agentic AI',
    text: 'Explore intelligent AI agents capable of reasoning, planning, using tools, and executing multi-step tasks.',
    icon: '🤖',
  },
  {
    title: 'Generative AI & LLMs',
    text: 'Explore next-generation applications powered by Generative AI and Large Language Models.',
    icon: '✨',
  },
  {
    title: 'Quantum Machine Learning',
    text: 'Explore the intersection of quantum computing and artificial intelligence through emerging Quantum Machine Learning approaches.',
    icon: '⚛️',
  },
  {
    title: 'Experimental AI',
    text: 'Experiment with emerging AI technologies, architectures, and intelligent systems to discover new possibilities.',
    icon: '🔬',
  },
  {
    title: 'Intelligent Automation',
    text: 'Transform repetitive and complex workflows through intelligent automation and AI-powered systems.',
    icon: '⚡',
  },
];

export default function Innovation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = sectionRef.current.querySelectorAll('.innovation-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!prefersReduced) entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach((card, i) => {
      if (!prefersReduced) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(28px)';
        card.style.transition = `opacity 0.65s ease ${i * 0.09}s, transform 0.65s ease ${i * 0.09}s`;
      }
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="innovation" ref={sectionRef} aria-labelledby="innovation-title">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gradient-text" id="innovation-title">Innovation Hub</h2>
          <p className="section-description" style={{ maxWidth: 720, margin: '16px auto 0' }}>
            We continuously explore emerging technologies and transform promising ideas into practical solutions.
          </p>
        </div>

        <div className="values-grid">
          {ITEMS.map((item) => (
            <div className="innovation-card" key={item.title}>
              <div style={{ fontSize: '2rem', lineHeight: 1, marginBottom: 4 }} aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="value-title">{item.title}</h3>
              <p className="value-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
