import ServiceDetailPage from './ServiceDetailPage';
import { MAIN_SERVICES } from '../../data/services';

export default function CloudInfrastructurePage() {
  const service = MAIN_SERVICES.find(s => s.id === 'cloud-infrastructure');
  return <ServiceDetailPage service={service} />;
}
