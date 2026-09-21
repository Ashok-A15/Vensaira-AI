import ServiceDetailPage from './ServiceDetailPage';
import { MAIN_SERVICES } from '../../data/services';

export default function DigitalSolutionsPage() {
  const service = MAIN_SERVICES.find(s => s.id === 'digital-solutions');
  return <ServiceDetailPage service={service} />;
}
