import { useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { AI_SOLUTIONS } from '../data/aiSolutions';
import '../styles/sections.css';

export default function AiSolutionsLanding() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main id="main-content" className="ai-solutions-landing">
      <section className="section section-ivory" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
        <div className="container">
          
          <div className="section-header">
            <span className="section-eyebrow">AI SOLUTIONS</span>
            <h1 className="section-title corporate-title">Intelligent Technology Built for Business</h1>
            <p className="section-description corporate-desc" style={{ maxWidth: 760, margin: '16px auto 0' }}>
              We help organizations apply artificial intelligence, machine learning and emerging technologies to solve business challenges, improve operations and create new digital experiences.
            </p>
          </div>

          <div className="services-grid" style={{ marginTop: '80px' }}>
            {AI_SOLUTIONS.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
