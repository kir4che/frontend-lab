import type { ReactElement } from 'react';
import Home from '@/pages';
import GSAPParallax from '@/pages/gsap-parallax';
import { routeMeta, type RouteMeta } from './meta';

export type RouteDefinition = RouteMeta & {
  element: ReactElement;
};

const componentMap: Partial<Record<RouteMeta['id'], ReactElement>> = {
  home: <Home />,
  'gsap-parallax': <GSAPParallax />,
};

export const appRoutes: RouteDefinition[] = routeMeta.map((meta) => ({
  ...meta,
  element: componentMap[meta.id]!,
}));
