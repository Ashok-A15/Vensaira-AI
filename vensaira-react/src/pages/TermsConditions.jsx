import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal.css';

export default function TermsConditions() {
  useEffect(() => {
    document.title = 'Terms & Conditions | Vensaira AI';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="legal-page-wrapper">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Vensaira AI Terms &amp; Conditions</h1>

          <div className="legal-effective-date">Effective Date: October 1, 2026</div>
        </header>

        <div className="legal-content">
          <div className="legal-intro">
            <p>
              Thank you for choosing Vensaira AI. These Terms &amp; Conditions (&quot;Terms&quot;) set out the rules for accessing and using the Vensaira AI website, AI products, applications, software, APIs, research tools, and related offerings (together, the &quot;Services&quot;), operated by Vensaira AI Innovations.
            </p>
            <p>
              By visiting our website or using any of the Services, you accept these Terms. If you disagree with any part of them, please stop using the relevant Services.
            </p>
          </div>

          <section className="legal-section">
            <h2 className="legal-section-title">1. Who We Are</h2>
            <p>
              Vensaira AI is a technology company focused on building intelligent software. Our work spans areas such as:
            </p>
            <ul>
              <li>Artificial intelligence and generative AI</li>
              <li>Machine learning and predictive analytics</li>
              <li>Intelligent automation and AI agents</li>
              <li>Natural language processing</li>
              <li>Custom AI model development and integration</li>
              <li>Web and software engineering</li>
              <li>Applied AI research</li>
            </ul>
            <p>
              Some Services may be offered as beta, preview, experimental, or research releases and may change significantly over time.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">2. Acceptable Use</h2>
            <p>
              You agree to use the Services only in ways that are lawful and consistent with these Terms. You must not:
            </p>
            <ul>
              <li>Try to break into, probe, or gain unauthorised access to our systems or data</li>
              <li>Bypass, disable, or weaken any security or access controls</li>
              <li>Upload or spread viruses, malware, or other harmful code</li>
              <li>Search for or take advantage of vulnerabilities in the Services</li>
              <li>Use bots, scrapers, or other automated means that overload or disrupt our infrastructure</li>
              <li>Reproduce, resell, or share protected material without our permission</li>
              <li>Use the Services for fraud, deception, harassment, or any illegal or harmful purpose</li>
              <li>Decompile, disassemble, or reverse engineer our software, except where the law or a written agreement expressly allows it</li>
              <li>Impersonate another person or falsely claim a connection with any organisation</li>
              <li>Use our outputs or Services to build a competing AI product without written consent</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">3. Your Account</h2>
            <p>
              Some Services require you to create an account. You are responsible for keeping your login details private and for everything that happens under your account.
            </p>
            <p>
              If you suspect someone has used your account without permission, let us know right away.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">4. AI-Generated Outputs</h2>
            <p>
              Vensaira offers features built on artificial intelligence, machine learning, generative models, and automation.
            </p>
            <p>
              AI outputs can be wrong, incomplete, outdated, or unexpected. You are responsible for checking any output before you act on it or share it.
            </p>
            <p>
              Nothing produced by our AI should be treated as a substitute for qualified legal, medical, financial, engineering, scientific, or other professional advice.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">5. Beta and Research Features</h2>
            <p>
              We may release experimental models, prototypes, demos, or research tools. These are provided to explore new capabilities and may behave inconsistently, change without notice, or be withdrawn.
            </p>
            <p>
              Results from these features do not guarantee how a finished product will perform. Please verify them independently before using them for academic, commercial, technical, financial, or other important decisions.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">6. Ownership of Our Materials</h2>
            <p>
              Unless stated otherwise, the Vensaira website and Services, including software, models, interfaces, designs, visuals, logos, trademarks, documentation, and research materials, belong to or are licensed to Vensaira AI Innovations.
            </p>
            <p>
              Using the Services does not transfer any of our intellectual property rights to you.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">7. Content You Provide</h2>
            <p>
              Some Services let you upload, enter, or generate content such as prompts, files, and data. You remain responsible for what you submit.
            </p>
            <p>
              You confirm that you hold the rights and permissions needed to submit that content, and that it does not break any law or infringe anyone else&apos;s rights.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">8. Outside Services and Integrations</h2>
            <p>
              The Services may connect with third-party APIs, cloud providers, AI model vendors, login providers, databases, analytics tools, and other external platforms.
            </p>
            <p>
              We do not operate these outside services and cannot promise their uptime, security, accuracy, or performance.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">9. Availability of the Services</h2>
            <p>
              We work to keep the Services dependable, but we cannot promise they will run without interruption or errors. Access may be paused or limited because of:
            </p>
            <ul>
              <li>Scheduled or emergency maintenance</li>
              <li>Software releases and upgrades</li>
              <li>Infrastructure or hardware failures</li>
              <li>Outages at third-party providers</li>
              <li>Security threats or incidents</li>
              <li>Changes to beta or research features</li>
              <li>Circumstances beyond our reasonable control</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">10. No Warranties</h2>
            <p>
              To the fullest extent the law allows, the Services are offered &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind. We do not promise that:
            </p>
            <ul>
              <li>The Services will be accessible at all times</li>
              <li>Our software will be free of bugs or defects</li>
              <li>AI outputs will be accurate, complete, or reliable</li>
              <li>Experimental or research features will deliver any specific result</li>
              <li>The Services will meet your particular needs or expectations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">11. Limits on Our Liability</h2>
            <p>
              To the maximum extent permitted by law, Vensaira AI Innovations and its directors, staff, affiliates, contractors, and partners are not liable for any indirect, incidental, special, consequential, or punitive losses arising from your use of, or inability to use, the Services.
            </p>
            <p>
              These Terms do not exclude or restrict any liability that cannot legally be excluded or restricted.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">12. Your Privacy</h2>
            <p>
              Using the Services may involve us collecting and processing your information. Our Privacy Policy explains how Vensaira handles personal data, and we encourage you to read it.
            </p>
            <p>
              <Link to="/privacy-policy" className="legal-inline-link">
                View our Privacy Policy &rarr;
              </Link>
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">13. Updates to the Services and These Terms</h2>
            <p>
              As our technology and business grow, we may change, add, or retire products and features, and we may revise these Terms.
            </p>
            <p>
              The latest version will always be posted on our website, with the &quot;Effective Date&quot; at the top showing when it last changed. Continuing to use the Services after an update means you accept the revised Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">14. Suspension and Termination</h2>
            <p>
              We may suspend or end your access to any Service when reasonably necessary, including for breaches of these Terms, security concerns, unlawful activity, unpaid fees, misuse of the Services, or the discontinuation of a product.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">15. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by and interpreted under the laws of India.
            </p>
            <p>
              Any dispute arising from these Terms or the Services will fall under the exclusive jurisdiction of the competent courts in India, unless applicable law requires otherwise or a separate written agreement says differently.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-section-title">16. Contact Us</h2>
            <p>Questions about these Terms? Get in touch:</p>
            <div className="legal-contact-block">
              <p><strong>Vensaira AI Innovations</strong></p>
              <p>Email: legal@vensaira.ai</p>
              <p>Website: www.vensaira.ai</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
