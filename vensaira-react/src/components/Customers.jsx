import '../styles/cards.css';
import '../styles/sections.css';

export default function Customers() {
  return (
    <section className="section" id="customers" aria-labelledby="customers-title">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gradient-text" id="customers-title">Customers</h2>
          <p className="section-description" style={{ maxWidth: 720, margin: '16px auto 0' }}>
            Building intelligent solutions for organizations across industries.
          </p>
        </div>

      </div>
    </section>
  );
}
