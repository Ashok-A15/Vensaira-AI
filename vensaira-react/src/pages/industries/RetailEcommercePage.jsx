import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function RetailEcommercePage() {
  const industry = INDUSTRIES.find(i => i.id === 'retail-ecommerce');
  return <IndustryDetailPage industry={industry} />;
}
