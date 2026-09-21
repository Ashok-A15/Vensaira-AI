import ServiceDetailPage from './ServiceDetailPage';
import { MAIN_SERVICES } from '../../data/services';

export default function DataIntelligencePage() {
  const service = MAIN_SERVICES.find(s => s.id === 'data-analytics');
  return <ServiceDetailPage service={service} />;
}
