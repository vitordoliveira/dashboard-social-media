import React, { ComponentType } from 'react';
import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import type { AppRoutes, CommonPageProps, RouteConfig } from '../types/ui/routes';

// Lazy loading dos componentes de página com tipagem correta
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const AnalyticsPage = lazy(() => import('../pages/Analytics'));
const SettingsPage = lazy(() => import('../pages/Settings'));

// Configuração das rotas
export const routes: RouteConfig[] = [
  {
    path: '/',
    title: 'Dashboard',
    breadcrumbs: [{ path: '/', label: 'Dashboard' }],
    component: DashboardPage,
    icon: React.createElement(DashboardIcon)
  },
  {
    path: '/analytics',
    title: 'Analytics',
    breadcrumbs: [
      { path: '/', label: 'Dashboard' },
      { path: '/analytics', label: 'Analytics' }
    ],
    component: AnalyticsPage,
    icon: React.createElement(AnalyticsIcon)
  },
  {
    path: '/settings',
    title: 'Configurações',
    breadcrumbs: [
      { path: '/', label: 'Dashboard' },
      { path: '/settings', label: 'Configurações' }
    ],
    component: SettingsPage,
    icon: React.createElement(SettingsIcon)
  }
];

// Helper para encontrar configuração da rota atual
export const findRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};