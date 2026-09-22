import { useEffect } from 'react';
import Hero from '../components/Hero';
import AISolutions from '../components/AISolutions';
import About from '../components/About';
import Industries from '../components/Industries';
import Innovation from '../components/Innovation';
import ELearning from '../components/ELearning';
import Customers from '../components/Customers';

export default function Home() {
  useEffect(() => {
    document.title = 'VENSAIRA AI | AI Solutions, Software & Cloud Services';
  }, []);

  return (
    <main id="main-content">
      <Hero />
      <AISolutions />
      <About />
      <Industries />
      <Innovation />
      <ELearning />
      <Customers />
    </main>
  );
}
