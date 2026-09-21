import ServiceDetailPage from './ServiceDetailPage';
import { AI_SOLUTIONS } from '../../data/aiSolutions';

export default function ConversationalAiPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'conversational-ai');
  return <ServiceDetailPage service={service} />;
}
