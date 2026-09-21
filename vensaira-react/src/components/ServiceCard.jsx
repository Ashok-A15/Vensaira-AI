import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cards.css';

export default function ServiceCard({ service, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cardRef.current.classList.add('in-view');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  // Stagger base delay: 100ms per item in a row of 3
  const baseDelay = (index % 3) * 100;

  return (
    <article className="service-image-card" ref={cardRef}>
      
      {/* Step 1 & 2: Image starts low/transparent, then moves up/fades in */}
      <div 
        className="service-image-wrapper"
        style={{ transitionDelay: `${baseDelay}ms` }}
      >
        <img src={service.image} alt={service.title} className="service-cover-img" />
      </div>

      {/* Step 3 & 4: Panel starts low/transparent, moves up/fades in AFTER image */}
      <div 
        className="service-panel"
        style={{ transitionDelay: `${baseDelay + 250}ms` }}
      >
        <h3 className="sp-title">{service.title}</h3>
        <p className="sp-desc">{service.desc}</p>
        
        <Link to={service.path} className="sp-link">
          Learn More
          <span className="sc-arrow">&rarr;</span>
        </Link>
      </div>

    </article>
  );
}
