/// Feature registry for React Router.
/// Generated features register their routes here.
import type { RouteObject } from 'react-router-dom';

// GENERATED:imports BEGIN
import { BookingRoutes, BookingDescriptor } from '../../features/booking/booking.module';
import { ProfileRoutes, ProfileDescriptor } from '../../features/profile/profile.module';
import { ServiceRoutes, ServiceDescriptor } from '../../features/service/service.module';
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
FeatureRegistry.register(ProfileDescriptor);
FeatureRegistry.register(ServiceDescriptor);
// GENERATED:registrations END

export const routes: RouteObject[] = [
  // GENERATED:entries BEGIN
    ...BookingRoutes,
    ...ProfileRoutes,
    ...ServiceRoutes,
  // GENERATED:entries END
];
