import ServiceDetailPage from './ServiceDetailPage';
import { AI_SOLUTIONS } from '../../data/aiSolutions';

export default function GenerativeAiPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'generative-ai-llms');
  return <ServiceDetailPage service={service} />;
}
