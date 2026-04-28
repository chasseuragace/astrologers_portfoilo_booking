/* eslint-disable react-refresh/only-export-components */
/// Module exports for Profile.
export * from './domain/entities/profile.entity';
export * from './domain/repositories/profile.repository';
export * from './domain/usecases/profile.usecases';
export * from './data/models/profile.model';
export * from './data/repositories/profile.repository-impl';
export * from './data/repositories/profile.repository-fake';
export * from './presentation/hooks/profile.hooks';
export * from './presentation/profile.repository-context';
export * from './presentation/pages/profile-list-page';
export * from './presentation/pages/profile-details-page';
export * from './presentation/components/profile-item-row';
export * from './presentation/components/profile-form-dialog';

import { ProfileListPage } from './presentation/pages/profile-list-page';
import { ProfileDetailsPage } from './presentation/pages/profile-details-page';
import { ProfileRepositoryProvider, createDefaultProfileRepository } from './presentation/profile.repository-context';

export const ProfileDescriptor = {
  id: 'profile',
  title: 'Profiles',
  path: '/profile',
};

function ProfileProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProfileRepositoryProvider repository={createDefaultProfileRepository()}>
      {children}
    </ProfileRepositoryProvider>
  );
}

export const ProfileRoutes = [
  {
    path: '/profile',
    element: (
      <ProfileProviderWrapper>
        <ProfileListPage />
      </ProfileProviderWrapper>
    ),
  },
  {
    path: '/profile/:id',
    element: (
      <ProfileProviderWrapper>
        <ProfileDetailsPage />
      </ProfileProviderWrapper>
    ),
  },
];
