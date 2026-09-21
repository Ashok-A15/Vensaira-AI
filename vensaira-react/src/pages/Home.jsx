import { useEffect } from 'react';
import Hero from '../components/Hero';
import AISolutions from '../components/AISolutions';
import Approach from '../components/Approach';
import WhyVensaira from '../components/WhyVensaira';
import Industries from '../components/Industries';
import Innovation from '../components/Innovation';
import ELearning from '../components/ELearning';
import Customers from '../components/Customers';
import About from '../components/About';
import TechnologyFocus from '../components/TechnologyFocus';
import ContactCTA from '../components/ContactCTA';

export default function Home() {
  useEffect(() => {
    document.title = 'Vensaira AI Innovations | Building Intelligent Solutions for a Smarter Future';
  }, []);

  return (
    <main id="main-content">
      <Hero />
      <AISolutions />
      <Approach />
      <WhyVensaira />
      <Industries />
      <Innovation />
      <ELearning />
      <Customers />
      <About />
      <TechnologyFocus />
      <ContactCTA />
    </main>
  );
}
