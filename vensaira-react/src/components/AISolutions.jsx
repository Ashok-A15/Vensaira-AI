import { useEffect, useRef } from 'react';
import '../styles/cards.css';
import '../styles/sections.css';

const SOLUTIONS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'AI Integration & Automation',
    subtitle: 'Automate with intelligence.',
    text: 'We seamlessly integrate AI models into your existing workflows to automate repetitive tasks, optimize operations, and increase productivity across your organization.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="m9 15 2 2 4-4" />
      </svg>
    ),
    title: 'Custom AI Application Development',
    subtitle: 'Built for your specific needs.',
    text: 'We design and develop bespoke AI-powered web applications and software tailored to solve your unique business problems and provide a competitive advantage.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Conversational AI & Smart Assistants',
    subtitle: 'Enhance customer and employee experiences.',
    text: 'We build intelligent chatbots, virtual assistants, and agentic AI systems that can understand context, answer questions, provide support, and execute complex workflows.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: 'Data Intelligence & Analytics',
    subtitle: 'Turn data into actionable insights.',
    text: 'We leverage machine learning algorithms to analyze large datasets, uncover hidden patterns, predict trends, and provide data-driven recommendations for better decision-making.',
  },
];

function useScrollReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      ref.current.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function AISolutions() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="section" id="ai-solutions" ref={sectionRef} aria-labelledby="ai-solutions-title">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title gradient-text" id="ai-solutions-title">What We Do / AI Solutions</h2>
          <p className="section-description" style={{ maxWidth: 720, margin: '16px auto 0' }}>
            We build specialized artificial intelligence solutions that address real-world business challenges.
          </p>
        </div>

        <div className="what-we-do-grid">
          {SOLUTIONS.map((s, i) => (
            <article className={`wwd-card reveal reveal-delay-${i + 1}`} key={s.title}>
              <div className="wwd-icon" aria-hidden="true">{s.icon}</div>
              <h3 className="wwd-title">{s.title}</h3>
              <p className="wwd-subtitle">{s.subtitle}</p>
              <p className="wwd-text">{s.text}</p>
            </article>
          ))}
        </div>

        {/* Technology Statement */}
        <div className="tech-statement-block reveal" style={{ marginTop: 60 }}>
          <h3 className="tech-statement-title">Powered by intelligent technology</h3>
          <div className="tech-pills-row">
            <span className="tech-pill">Machine Learning</span>
            <span className="tech-pill-dot">&middot;</span>
            <span className="tech-pill">Generative AI</span>
            <span className="tech-pill-dot">&middot;</span>
            <span className="tech-pill">Data Analytics</span>
            <span className="tech-pill-dot">&middot;</span>
            <span className="tech-pill">Intelligent Automation</span>
          </div>
          <p className="tech-statement-desc">
            Our solutions transform complex business problems into scalable, intelligent workflows&mdash;helping
            organizations innovate faster and operate smarter.
          </p>
        </div>
      </div>
    </section>
  );
}
