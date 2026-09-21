import { useEffect, useRef } from 'react';
import '../styles/sections.css';

const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understand your business challenge, objectives, data, users, and technology environment.' },
  { num: '02', title: 'Strategize', desc: 'Identify the right AI approach, architecture, models, technologies, and implementation strategy.' },
  { num: '03', title: 'Design', desc: 'Create scalable AI architectures and intuitive user experiences designed around your business requirements.' },
  { num: '04', title: 'Develop', desc: 'Build, train, integrate, test, and optimize AI models and intelligent applications.' },
  { num: '05', title: 'Deploy', desc: 'Deploy AI solutions into production environments with appropriate security, scalability, monitoring, and governance.' },
  { num: '06', title: 'Evolve', desc: 'Continuously monitor, evaluate, improve, and maintain AI systems as business requirements and technologies evolve.' },
];

export default function Approach() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const steps = sectionRef.current.querySelectorAll('.timeline-step');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          } else {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, i * 100);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    steps.forEach((step, i) => {
      if (!prefersReduced) {
        step.style.opacity = '0';
        step.style.transform = 'translateY(24px)';
        step.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
      }
      observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-alt" id="approach" ref={sectionRef} aria-labelledby="approach-title">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gradient-text" id="approach-title">Our End-to-End AI Approach</h2>
          <p className="section-description" style={{ maxWidth: 720, margin: '16px auto 0' }}>
            From idea to intelligent production systems.
          </p>
        </div>

        <div className="timeline-container" role="list">
          {STEPS.map((step) => (
            <div className="timeline-step" key={step.num} role="listitem">
              <div className="timeline-number-container" aria-hidden="true">
                <span className="timeline-number">{step.num}</span>
              </div>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
