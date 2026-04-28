/* eslint-disable react-refresh/only-export-components */
/// Module exports for Admin pages.
export { AdminLoginPage } from './presentation/pages/AdminLoginPage';
export { AdminDashboardPage } from './presentation/pages/AdminDashboardPage';

import { AdminLoginPage } from './presentation/pages/AdminLoginPage';
import { AdminDashboardPage } from './presentation/pages/AdminDashboardPage';

export const AdminDescriptor = {
  id: 'admin',
  title: 'Admin',
  path: '/admin',
};

export const AdminRoutes = [
  {
    path: '/admin',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
];
