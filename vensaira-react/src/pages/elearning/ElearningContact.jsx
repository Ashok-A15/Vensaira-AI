import { useState } from 'react';
import '../../styles/elearning.css';

export default function ElearningContact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <div className="elearning-page">
      <section className="el-hero-split-contact">
        <div className="el-animate-fade-up">
          <span className="el-label">Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', color: 'var(--el-navy)', lineHeight: 1.1, margin: '16px 0 24px' }}>
            Have Questions About Your Learning Journey?
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, marginBottom: '40px' }}>
            Whether you have a question about our courses, enrollment, or the learning platform, we're here to help.
          </p>

          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(8, 120, 201, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--el-primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h4 style={{ margin: 0, color: 'var(--el-navy)', fontSize: '1.1rem' }}>Email Support</h4>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>support@vensaira.ai</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--el-violet)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <div>
                <h4 style={{ margin: 0, color: 'var(--el-navy)', fontSize: '1.1rem' }}>Response Time</h4>
                <p style={{ margin: '4px 0 0', color: '#64748b' }}>We'll get back to you as soon as possible.</p>
              </div>
            </div>
          </div>
          
          {/* Subtle Visual */}
          <div style={{ marginTop: '48px', height: '120px', background: 'linear-gradient(90deg, rgba(8,120,201,0.05), rgba(124,58,237,0.05))', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '80px', height: '80px', background: 'var(--el-accent)', borderRadius: '50%', filter: 'blur(30px)', opacity: 0.5 }}></div>
             <div style={{ position: 'absolute', left: '10%', top: '50%', width: '100px', height: '2px', background: 'var(--el-border)' }}></div>
             <div style={{ position: 'absolute', left: '10%', top: '46%', width: '8px', height: '8px', background: 'var(--el-primary)', borderRadius: '50%' }}></div>
          </div>

        </div>

        <div className="el-animate-slide-right" style={{ animationDelay: '0.2s' }}>
          {sent ? (
            <div className="auth-card" style={{ textAlign: 'center', padding: '60px 40px', background: 'white' }}>
              <div style={{ width: '64px', height: '64px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style={{ color: 'var(--el-navy)', fontSize: '1.5rem', marginBottom: '16px' }}>Message Sent</h3>
              <p style={{ color: '#475569' }}>Thank you for reaching out. Our support team will get back to you shortly.</p>
            </div>
          ) : (
            <form className="auth-card" onSubmit={handleSubmit} style={{ padding: '40px', background: 'white' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input type="text" id="name" className="form-input" required value={formData.name} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email" className="form-input" required value={formData.email} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input type="text" id="subject" className="form-input" required value={formData.subject} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" className="form-input" rows="5" required value={formData.message} onChange={handleChange} style={{ resize: 'vertical' }}></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', background: 'var(--el-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }}>
                Send Message &rarr;
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
