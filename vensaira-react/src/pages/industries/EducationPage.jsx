import IndustryDetailPage from './IndustryDetailPage';
import { INDUSTRIES } from '../../data/industries';

export default function EducationPage() {
  const industry = INDUSTRIES.find(i => i.id === 'education');
  return <IndustryDetailPage industry={industry} />;
}
