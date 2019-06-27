import LazyLoad from './LazyLoad';
export default [
  {
    path: '/A',
    component: LazyLoad(() => import('./a')),
  },
  {
    path: '/C',
    component: LazyLoad(() => import('./c')),
    routes: [
      {
        path: '/C/D',
        component: LazyLoad(() => import('./d')),
      },
    ],
  },
];
