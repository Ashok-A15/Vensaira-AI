import ServiceDetailPage from './ServiceDetailPage';
import { AI_SOLUTIONS } from '../../data/aiSolutions';

export default function AiChatbotsPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'ai-chatbots');
  return <ServiceDetailPage service={service} />;
}
