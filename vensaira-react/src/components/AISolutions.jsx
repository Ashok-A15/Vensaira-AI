import ServiceCard from './ServiceCard';
import { MAIN_SERVICES } from '../data/services';
import '../styles/sections.css';

export default function AISolutions() {
  return (
    <section className="section section-ivory" id="ai-solutions" aria-labelledby="services-title">
      <div className="container">
        
        {/* Clean Corporate Heading */}
        <div className="section-header">
          <span className="section-eyebrow">OUR SERVICES</span>
          <h2 className="section-title corporate-title" id="services-title">Technology Solutions Built for Business</h2>
          <p className="section-description corporate-desc" style={{ maxWidth: 720, margin: '16px auto 0' }}>
            We combine engineering, cloud, data and AI capabilities to build reliable technology solutions that help businesses modernize, scale and grow.
          </p>
        </div>

        {/* 3-Column Image Service Grid */}
        <div className="services-grid">
          {MAIN_SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
