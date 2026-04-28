/* eslint-disable react-refresh/only-export-components */
/// Module exports for Service.
export * from './domain/entities/service.entity';
export * from './domain/repositories/service.repository';
export * from './domain/usecases/service.usecases';
export * from './data/models/service.model';
export * from './data/repositories/service.repository-impl';
export * from './data/repositories/service.repository-fake';
export * from './presentation/hooks/service.hooks';
export * from './presentation/service.repository-context';
export * from './presentation/pages/service-list-page';
export * from './presentation/pages/service-details-page';
export * from './presentation/components/service-item-row';
export * from './presentation/components/service-form-dialog';

import { ServiceListPage } from './presentation/pages/service-list-page';
import { ServiceDetailsPage } from './presentation/pages/service-details-page';

export const ServiceDescriptor = {
  id: 'service',
  title: 'Services',
  path: '/service',
};

export const ServiceRoutes = [
  {
    path: '/service',
    element: <ServiceListPage />,
  },
  {
    path: '/service/:id',
    element: <ServiceDetailsPage />,
  },
];
