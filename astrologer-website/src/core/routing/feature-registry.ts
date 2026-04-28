/// Feature registry for React Router.
/// Generated features register their routes here.
import type { RouteObject } from 'react-router-dom';

// GENERATED:imports BEGIN
import { BookingRoutes, BookingDescriptor } from '../../features/booking/booking.module';
import { ServiceRoutes, ServiceDescriptor } from '../../features/service/service.module';
import { PublicRoutes, PublicDescriptor } from '../../features/public/public.module';
import { AdminRoutes, AdminDescriptor } from '../../features/admin/admin.module';
// GENERATED:imports END

export interface FeatureDescriptor {
  id: string;
  title: string;
  path: string;
  icon?: string;
}

export const FeatureRegistry = {
  descriptors: [] as FeatureDescriptor[],

  register(descriptor: FeatureDescriptor) {
    this.descriptors.push(descriptor);
  },

  get all(): FeatureDescriptor[] {
    return this.descriptors;
  },
};

// GENERATED:registrations BEGIN
FeatureRegistry.register(BookingDescriptor);
FeatureRegistry.register(ServiceDescriptor);
FeatureRegistry.register(PublicDescriptor);
FeatureRegistry.register(AdminDescriptor);
// GENERATED:registrations END

export const routes: RouteObject[] = [
  // GENERATED:entries BEGIN
    ...PublicRoutes,
    ...AdminRoutes,
    ...BookingRoutes,
    ...ServiceRoutes,
  // GENERATED:entries END
];
