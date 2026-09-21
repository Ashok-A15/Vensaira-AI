import ServiceDetailPage from './ServiceDetailPage';
import { AI_SOLUTIONS } from '../../data/aiSolutions';

export default function AgenticAiPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'agentic-ai');
  return <ServiceDetailPage service={service} />;
}
