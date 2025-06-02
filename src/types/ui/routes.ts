import { ReactElement, LazyExoticComponent, ComponentType } from 'react';
import { DateRange } from '../dashboard';

export interface BreadcrumbItem {
  path: string;
  label: string;
}

export interface CommonPageProps {
  dateRange: DateRange;
  dateRangeType: string;
  onDateRangeChange: (type: string, range?: DateRange) => void;
}

export interface RouteConfig {
  path: string;
  title: string;
  breadcrumbs: BreadcrumbItem[];
  icon: ReactElement;
  component: LazyExoticComponent<ComponentType<CommonPageProps>>;
}

export type AppRoutes = readonly RouteConfig[];