import ServiceDetailPage from './ServiceDetailPage';
import { MAIN_SERVICES } from '../../data/services';

export default function SoftwareEngineeringPage() {
  const service = MAIN_SERVICES.find(s => s.id === 'software-engineering');
  return <ServiceDetailPage service={service} />;
}
