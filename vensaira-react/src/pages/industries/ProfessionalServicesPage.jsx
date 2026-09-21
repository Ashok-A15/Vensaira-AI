import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function ProfessionalServicesPage() {
  const industry = INDUSTRIES.find(i => i.id === 'professional-services');
  return <IndustryDetailPage industry={industry} />;
}
