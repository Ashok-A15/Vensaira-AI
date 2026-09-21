import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function LogisticsPage() {
  const industry = INDUSTRIES.find(i => i.id === 'logistics');
  return <IndustryDetailPage industry={industry} />;
}
