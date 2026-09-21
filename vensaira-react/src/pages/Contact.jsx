import { useState, useEffect } from 'react';
import '../styles/contact.css';

const INTERESTS = [
  'AI & Machine Learning',
  'Generative AI & LLMs',
  'Agentic AI & Intelligent Automation',
  'AI Chatbots & Conversational AI',
  'Quantum Machine Learning',
  'AI-Powered eLearning',
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    document.title = 'Contact Us | Vensaira AI Innovations';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleInterest = (val) => {
    setInterests(prev =>
      prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    // Append interests as repeated fields
    interests.forEach(i => formData.append('interests', i));

    try {
      const response = await fetch('https://formspree.io/f/myezywlo', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setInterests([]);
        setTimeout(() => setSuccess(false), 7000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page-main">
      {/* Ambient background */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
        <div className="cyber-grid" />
      </div>

      <section className="contact-cream-section">
        <div className="container">
          <div className="contact-cream-card">

            <div className="contact-cream-header">
              <span className="cream-eyebrow">Get in Touch</span>
              <h1 className="cream-title">Let&apos;s Build the Future with AI</h1>
              <p className="cream-description">
                Whether you are exploring your first AI initiative or looking to scale an existing AI
                ecosystem, Vensaira AI Innovations can help transform your ideas into intelligent,
                production-ready solutions.
              </p>
              <p className="cream-description highlight" style={{ marginTop: 10 }}>
                Have an AI idea? Let&apos;s turn it into reality.
              </p>
            </div>

            <form
              id="contact-cream-form"
              className="cream-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Name + Email */}
              <div className="form-row grid-2">
                <div className="form-group">
                  <label htmlFor="contact-name" className="cream-label">
                    Name <span className="cream-star" aria-hidden="true">*</span>
                  </label>
                  <input type="text" id="contact-name" name="name" className="cream-input"
                    placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="cream-label">
                    Email <span className="cream-star" aria-hidden="true">*</span>
                  </label>
                  <input type="email" id="contact-email" name="email" className="cream-input"
                    placeholder="you@company.com" required />
                </div>
              </div>

              {/* Company + Phone */}
              <div className="form-row grid-2">
                <div className="form-group">
                  <label htmlFor="contact-company" className="cream-label">
                    Company <span className="cream-star" aria-hidden="true">*</span>
                  </label>
                  <input type="text" id="contact-company" name="company" className="cream-input"
                    placeholder="Your organization" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone" className="cream-label">Phone</label>
                  <input type="tel" id="contact-phone" name="phone" className="cream-input"
                    placeholder="Optional" />
                </div>
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="contact-location" className="cream-label">
                  Location <span className="cream-star" aria-hidden="true">*</span>
                </label>
                <input type="text" id="contact-location" name="location" className="cream-input"
                  placeholder="City, Country" required />
              </div>

              {/* Interests */}
              <div className="form-group">
                <span className="cream-label">We are interested in</span>
                <div className="cream-checkbox-grid">
                  {INTERESTS.map((interest) => (
                    <label className="cream-checkbox" key={interest}>
                      <input
                        type="checkbox"
                        checked={interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                        aria-label={interest}
                      />
                      <span className="cream-checkbox-box" aria-hidden="true" />
                      <span className="cream-checkbox-text">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="contact-message" className="cream-label">
                  Your Message <span className="cream-star" aria-hidden="true">*</span>
                </label>
                <textarea id="contact-message" name="message" className="cream-textarea"
                  rows={4} placeholder="Tell us a little about your goals..." required />
              </div>

              {/* Submit */}
              <div className="cream-form-actions">
                <button type="submit" className="cream-submit-btn" disabled={loading}
                  aria-busy={loading}>
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </div>

              {/* Success */}
              {success && (
                <div className="cream-success-msg show" role="alert">
                  <div className="cream-success-icon" aria-hidden="true">✓</div>
                  <p>Thank you for contacting Vensaira AI Innovations. Your message has been received. We&apos;ll get back to you soon.</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="cream-error-msg show" role="alert">
                  <div className="cream-success-icon" style={{ background: '#d9534f' }} aria-hidden="true">✕</div>
                  <p>Something went wrong while sending your message. Please try again.</p>
                </div>
              )}

            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
