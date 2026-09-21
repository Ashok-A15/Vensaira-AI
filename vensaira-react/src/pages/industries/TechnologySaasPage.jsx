import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function TechnologySaasPage() {
  const industry = INDUSTRIES.find(i => i.id === 'technology-saas');
  return <IndustryDetailPage industry={industry} />;
}
