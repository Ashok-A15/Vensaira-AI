import ServiceDetailPage from './ServiceDetailPage';
import { MAIN_SERVICES } from '../../data/services';

export default function AutomationIntegrationPage() {
  const service = MAIN_SERVICES.find(s => s.id === 'automation-integration');
  return <ServiceDetailPage service={service} />;
}
