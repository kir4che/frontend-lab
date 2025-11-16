export const categoryConfig = [
  { id: 'gsap', name: 'GSAP', order: 1 },
  { id: 'wip', name: 'WIP', order: 99 },
] as const;

export type SidebarCategory = (typeof categoryConfig)[number]['id'];
export type RouteCategory = 'home' | SidebarCategory;

export type RouteMeta = {
  id: string;
  label: string;
  path: string;
  description: string;
  badge?: string;
  category: RouteCategory;
  showInNav?: boolean;
  showInDirectory?: boolean;
};

export const routeMeta: RouteMeta[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    description: 'Project summary and quick links to each animation lab.',
    category: 'home',
    showInNav: true,
  },
  {
    id: 'gsap-parallax',
    label: '視差滾動',
    path: '/gsap-parallax',
    description:
      '展示以 GSAP 製作的多層視差滾動效果。透過滾動時的景深與位移差異，營造出層次感與動態沉浸感，呈現更具互動的視覺體驗。',
    badge: 'GSAP',
    category: 'gsap',
    showInNav: true,
    showInDirectory: true,
  },
];

export const navItems = routeMeta.filter((meta) => meta.showInNav);

export const showcaseDirectory = routeMeta.filter((meta) => meta.showInDirectory);
