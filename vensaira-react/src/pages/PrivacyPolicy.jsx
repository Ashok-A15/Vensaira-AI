import { useEffect } from 'react';
import '../styles/legal.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Vensaira AI';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="legal-page-wrapper">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Vensaira AI Privacy Policy</h1>

          <div className="legal-effective-date">Effective Date: October 1, 2026</div>
        </header>

        <div className="legal-content">
          <section className="legal-section" style={{ marginTop: 0 }}>
            <h2 className="legal-section-title">Our Commitment to You</h2>
            <p>
              Vensaira AI treats the personal data you share with us as a matter of trust. This Privacy Policy describes what data we gather, why we gather it, how we safeguard it, and the choices available to you.
            </p>
            <p>
              This policy covers our website, AI-powered products, applications, APIs, and any related offerings (together, the &quot;Services&quot;). By accessing or using the Services, you acknowledge the practices described here.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">1. Data We Gather</h2>
            <p>
              <strong>Details you share directly.</strong> When you reach out, sign up, or engage with the Services, you may give us:
            </p>
            <ul>
              <li>Your full name and job title</li>
              <li>Email address and contact number</li>
              <li>Business or institution name</li>
              <li>Messages sent via our enquiry or support forms</li>
              <li>Requests for demos, partnerships, or custom solutions</li>
              <li>Suggestions, reviews, and other correspondence</li>
              <li>Login credentials and profile details for registered accounts</li>
              <li>Prompts, files, and other inputs you provide to our AI tools</li>
            </ul>
            <p>
              <strong>Details captured automatically.</strong> As you browse or use the Services, our systems may record:
            </p>
            <ul>
              <li>IP address and approximate location</li>
              <li>Browser name and version</li>
              <li>Device model and operating system</li>
              <li>Screens and pages viewed, and time spent on them</li>
              <li>The site or link that directed you to us</li>
              <li>Timestamps of your visits</li>
              <li>Clicks, feature usage, and similar interaction patterns</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">2. Why We Use Your Data</h2>
            <p>
              We put the data we gather to work for the following purposes:
            </p>
            <ul>
              <li>Delivering, personalising, and enhancing the Services</li>
              <li>Answering your questions and resolving support tickets</li>
              <li>Contacting you about your account, product updates, or collaboration opportunities</li>
              <li>Running, troubleshooting, and maintaining our website and platforms</li>
              <li>Studying usage trends to make the Services faster and easier to use</li>
              <li>Building and refining our AI models, features, and solutions</li>
              <li>Spotting and stopping fraud, misuse, security threats, and unauthorised activity</li>
              <li>Meeting our obligations under applicable laws and regulations</li>
            </ul>
            <p>
              Vensaira never sells your personal data to anyone.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">3. Cookies and Tracking Tools</h2>
            <p>
              We rely on cookies, pixels, and comparable tools to keep the site working smoothly, save your settings, measure traffic, and learn which features people find useful.
            </p>
            <p>
              You can block or delete cookies from your browser at any time. Note that turning them off may cause some parts of the site to behave unexpectedly or stop working.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">4. Service Partners</h2>
            <p>
              To run the Services, we work with trusted outside vendors for hosting, cloud infrastructure, analytics, data storage, identity verification, AI model access, email delivery, billing, cybersecurity, and system monitoring.
            </p>
            <p>
              These partners handle data under their own privacy terms. We are not accountable for how independent third-party sites or services manage your information.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">5. How Our AI Handles Your Inputs</h2>
            <p>
              Many Vensaira offerings are powered by artificial intelligence, machine learning, and early-stage or beta technologies.
            </p>
            <p>
              Anything you enter into these tools may be processed to generate results, keep the platform secure, boost accuracy and performance, or support approved research and product development.
            </p>
            <p>
              AI-generated output can be incomplete or inaccurate, so please review it before relying on it. Unless a specific feature clearly states otherwise, avoid entering confidential, sensitive, proprietary, or personally identifying information, especially into beta or experimental tools.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">6. Keeping Your Data Safe</h2>
            <p>
              We apply sensible technical, administrative, and organisational protections to shield your data from unauthorised access, accidental loss, misuse, tampering, or exposure.
            </p>
            <p>
              That said, no online transfer, digital platform, or storage method is entirely risk-free, and we cannot promise absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">7. How Long We Keep Data</h2>
            <p>
              We hold personal data only as long as we genuinely need it: to deliver the Services, serve legitimate business needs, settle disputes, protect our systems, and satisfy legal requirements. Once it is no longer needed, we delete or anonymise it.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">8. Your Choices and Rights</h2>
            <p>
              Subject to the laws that apply to you, you may be entitled to:
            </p>
            <ul>
              <li>Obtain a copy of the personal data we hold about you</li>
              <li>Have incorrect or outdated details fixed</li>
              <li>Ask us to erase certain personal data</li>
              <li>Take back consent you gave earlier, where consent is our basis for processing</li>
              <li>Voice a complaint about how your data is being handled</li>
            </ul>
            <p>
              To exercise any of these rights, write to us using the details in the Contact section below.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">9. Protecting Minors</h2>
            <p>
              The Services are designed for adults and are not aimed at children. We do not knowingly gather personal data from minors. If you believe a child has shared data with us, please contact us and we will remove it promptly.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">10. Links to Other Sites</h2>
            <p>
              Our Services may point to outside websites, tools, or resources that we neither own nor operate. Vensaira is not answerable for their content, safety, terms, or privacy practices, so we encourage you to read their policies separately.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">11. Updates to This Policy</h2>
            <p>
              We may revise this Privacy Policy from time to time as our Services, technology, operations, or legal requirements evolve. The current version will always be available on our website, with the &quot;Effective Date&quot; at the top showing when it last changed.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">12. Get in Touch</h2>
            <p>For any privacy questions, requests, or concerns, reach us at:</p>
            <div className="legal-contact-block">
              <p><strong>Vensaira AI Innovations</strong></p>
              <p>Email: info@vensaira.ai</p>
              <p>Website: www.vensaira.ai</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
