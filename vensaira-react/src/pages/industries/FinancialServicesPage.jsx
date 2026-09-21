import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function FinancialServicesPage() {
  const industry = INDUSTRIES.find(i => i.id === 'financial-services');
  return <IndustryDetailPage industry={industry} />;
}
