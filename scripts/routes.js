import { lazy, Suspense } from 'react';

export default [
  {
    path: '/A',
    component: lazy(() => import('./a')),
  },
  {
    path: '/C',
    component: lazy(() => import('./c')),
    routes: [
      {
        path: '/C/D',
        component: lazy(() => import('./d')),
      },
    ],
  },
];
