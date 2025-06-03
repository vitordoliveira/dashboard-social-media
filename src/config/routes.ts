import React, { ComponentType } from 'react';
import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ScheduleIcon from '@mui/icons-material/Schedule';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import type { AppRoutes, CommonPageProps, RouteConfig } from '../types/ui/routes';

// Lazy loading dos componentes de página com tipagem correta
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const AnalyticsPage = lazy(() => import('../pages/Analytics'));
const SettingsPage = lazy(() => import('../pages/Settings'));

// Para páginas temporárias/em desenvolvimento
const ComingSoonPage = lazy(() => import('../pages/ComingSoon'));

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
    path: '/schedule',
    title: 'Agendar Posts',
    breadcrumbs: [
      { path: '/', label: 'Dashboard' },
      { path: '/schedule', label: 'Agendar Posts' }
    ],
    component: ComingSoonPage,
    icon: React.createElement(ScheduleIcon)
  },
  {
    path: '/monitoring',
    title: 'Monitoramento',
    breadcrumbs: [
      { path: '/', label: 'Dashboard' },
      { path: '/monitoring', label: 'Monitoramento' }
    ],
    component: ComingSoonPage,
    icon: React.createElement(NotificationsIcon)
  },
  {
    path: '/audience',
    title: 'Audiência',
    breadcrumbs: [
      { path: '/', label: 'Dashboard' },
      { path: '/audience', label: 'Audiência' }
    ],
    component: ComingSoonPage,
    icon: React.createElement(PeopleIcon)
  },
  {
    path: '/reports',
    title: 'Relatórios',
    breadcrumbs: [
      { path: '/', label: 'Dashboard' },
      { path: '/reports', label: 'Relatórios' }
    ],
    component: ComingSoonPage,
    icon: React.createElement(AssessmentIcon)
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