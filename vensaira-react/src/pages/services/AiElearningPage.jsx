import ServiceDetailPage from './ServiceDetailPage';
import { AI_SOLUTIONS } from '../../data/aiSolutions';

export default function AiElearningPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'ai-elearning');
  return <ServiceDetailPage service={service} />;
}
