import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function ManufacturingPage() {
  const industry = INDUSTRIES.find(i => i.id === 'manufacturing');
  return <IndustryDetailPage industry={industry} />;
}
