import { lazy } from 'react';

const Users = lazy(() => import('../pages/Users'));
const Settings = lazy(() => import('../pages/Settings'));
const EndingQ = lazy(() => import('../pages/EndingQ'));
const Images = lazy(() => import('../pages/ImagesManage'));
const Selling = lazy(() => import('../pages/Selling'));
const BotIntro = lazy(() => import('../pages/BotIntro'));

const coreRoutes = [
  {
    path: '/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/botintro',
    title: 'BotIntro',
    component: BotIntro,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/questions',
    title: 'Questions',
    component: EndingQ,
  },
  {
    path: '/images',
    title: 'Images',
    component: Images,
  },
  {
    path: '/selling',
    title: 'selling',
    component: Selling,
  },
];

const routes = [...coreRoutes];
export default routes;
