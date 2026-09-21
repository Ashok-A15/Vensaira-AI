import ServiceDetailPage from './ServiceDetailPage';
import { AI_SOLUTIONS } from '../../data/aiSolutions';

export default function QuantumMachineLearningPage() {
  const service = AI_SOLUTIONS.find(s => s.id === 'quantum-machine-learning');
  return <ServiceDetailPage service={service} />;
}
