import { useEffect } from 'react';
import '../styles/cards.css';

// Vensaira AI Mission & Vision — from index.html About section
export default function MissionVision() {
  useEffect(() => {
    document.title = 'Mission & Vision | Vensaira AI';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + 60px)', paddingBottom: 100, minHeight: '100vh' }}>
      {/* Ambient background */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
        <div className="cyber-grid" />
      </div>

      <section className="section" id="mission-vision" style={{ paddingTop: 40 }}>
        <div className="container">

          {/* Header */}
          <div className="section-header">
            <h1 className="section-title gradient-text">Mission &amp; Vision</h1>
            <p className="section-description" style={{ maxWidth: 720, margin: '16px auto 0' }}>
              Clear, aspirational statements that define our purpose and long-term direction.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30, marginTop: 40 }}>

            {/* Mission */}
            <div className="mv-card">
              <div className="mv-card-header">
                <div className="mv-icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h2 className="mv-title">Our Mission</h2>
              </div>
              <div className="mv-content">
                <p>&ldquo;To make advanced artificial intelligence practical, accessible, and valuable for businesses and society.&rdquo;</p>
                <p>We aim to help organizations leverage AI to automate processes, enhance decision-making, improve customer experiences, accelerate innovation, and create new possibilities.</p>
              </div>
            </div>

            {/* Vision */}
            <div className="mv-card">
              <div className="mv-card-header">
                <div className="mv-icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h2 className="mv-title">Our Vision</h2>
              </div>
              <div className="mv-content">
                <p>&ldquo;To build a globally recognized AI innovation company delivering intelligent technologies that shape the future.&rdquo;</p>
                <p>We envision a future where intelligent systems work alongside people to solve complex problems, accelerate innovation, and create meaningful impact.</p>
              </div>
            </div>

          </div>

          {/* Why Vensaira Values */}
          <div style={{ marginTop: 80 }}>
            <div className="section-header" style={{ marginBottom: 40 }}>
              <h2 className="section-title gradient-text" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>What Drives Us</h2>
            </div>

            <div className="values-grid">
              {[
                { n: '01', t: 'Innovation First', d: 'We explore emerging technologies and transform promising ideas into practical solutions.' },
                { n: '02', t: 'Business-Focused AI', d: 'We focus on solving real business problems rather than implementing AI for the sake of technology.' },
                { n: '03', t: 'Scalable Architecture', d: 'Our solutions are designed to evolve with your business and technology requirements.' },
                { n: '04', t: 'Responsible AI', d: 'We emphasize reliability, security, privacy, governance, transparency, and responsible deployment.' },
                { n: '05', t: 'End-To-End Expertise', d: 'From strategy and architecture to development, deployment, and maintenance, we provide complete AI technology services.' },
                { n: '06', t: 'Future Ready', d: 'We continuously explore emerging areas such as Agentic AI, Generative AI, LLMs, and Quantum Machine Learning.' },
              ].map((v) => (
                <div className="value-card" key={v.n}>
                  <span className="value-subtitle">{v.n}</span>
                  <h3 className="value-title">{v.t}</h3>
                  <p className="value-text">{v.d}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
