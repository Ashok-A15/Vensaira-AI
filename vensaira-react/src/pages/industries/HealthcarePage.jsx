import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function HealthcarePage() {
  const industry = INDUSTRIES.find(i => i.id === 'healthcare');
  return <IndustryDetailPage industry={industry} />;
}
