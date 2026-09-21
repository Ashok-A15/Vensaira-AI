import { useState, useEffect } from 'react';
import '../styles/contact.css';

const AI_INTERESTS = [
  'AI & Machine Learning',
  'Generative AI & LLMs',
  'Agentic AI & Intelligent Automation',
  'AI Chatbots & Conversational AI',
  'Quantum Machine Learning',
  'AI-Powered eLearning'
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
    <main className="contact-page-wrapper">
      <div className="contact-container">
        
        <div className="contact-grid">
          
          {/* LEFT SIDE */}
          <div className="contact-left contact-animate-up">
            <span className="contact-eyebrow">CONTACT US</span>
            <h1 className="contact-title">Let's Build the Future with AI</h1>
            <p className="contact-desc">
              Whether you're exploring your first AI initiative or looking to scale an existing AI ecosystem, Vensaira AI Innovations can help transform your ideas into intelligent, production-ready solutions.
            </p>
            <p className="contact-desc highlight">
              Have an AI Idea? Let's turn it into reality.
            </p>
            
            <div className="contact-image-wrapper">
              <img 
                src="/assets/contact/contact-ai.jpg" 
                alt="AI technology integration and professional enterprise solutions" 
                className="contact-image"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right contact-animate-up" style={{ animationDelay: '0.1s' }}>
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} noValidate>
                
                <div className="contact-row">
                  <div className="contact-group">
                    <label htmlFor="name">Name <span className="required-asterisk" aria-hidden="true">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Your full name" />
                  </div>
                  <div className="contact-group">
                    <label htmlFor="email">Email <span className="required-asterisk" aria-hidden="true">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="you@company.com" />
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-group">
                    <label htmlFor="company">Company <span className="required-asterisk" aria-hidden="true">*</span></label>
                    <input type="text" id="company" name="company" required placeholder="Your organization" />
                  </div>
                  <div className="contact-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="Optional" />
                  </div>
                </div>

                <div className="contact-group">
                  <label htmlFor="location">Location <span className="required-asterisk" aria-hidden="true">*</span></label>
                  <input type="text" id="location" name="location" required placeholder="City, Country" />
                </div>

                <div className="contact-group">
                  <label style={{ marginBottom: '16px', display: 'block' }}>We are interested in</label>
                  <div className="contact-interests">
                    {AI_INTERESTS.map((interest) => (
                      <label key={interest} className="interest-label">
                        <input
                          type="checkbox"
                          checked={interests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                        />
                        <span className="interest-box" aria-hidden="true" />
                        <span className="interest-text">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="contact-group">
                  <label htmlFor="message">Your Message <span className="required-asterisk" aria-hidden="true">*</span></label>
                  <textarea id="message" name="message" rows={4} required placeholder="Tell us a little about your goals..." />
                </div>

                <div className="contact-submit-wrapper">
                  <button type="submit" className="contact-submit-btn" disabled={loading} aria-busy={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {/* Alerts */}
                {success && (
                  <div className="contact-alert success" role="alert">
                    <div aria-hidden="true">✓</div>
                    <p>Thank you for contacting Vensaira AI Innovations. Your message has been received. We'll get back to you shortly.</p>
                  </div>
                )}

                {error && (
                  <div className="contact-alert error" role="alert">
                    <div aria-hidden="true">✕</div>
                    <p>Something went wrong while sending your message. Please try again.</p>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
