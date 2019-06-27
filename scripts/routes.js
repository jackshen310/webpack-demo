import { lazy, Suspense } from 'react';

export default [
  {
    path: '/A',
    component: lazy(() => import(/* webpackChunkName:"a"*/ './a')),
  },
  {
    path: '/C',
    component: lazy(() => import(/* webpackChunkName:"c"*/ './c')),
    routes: [
      {
        path: '/C/D',
        component: lazy(() => import(/* webpackChunkName:"d"*/ './d')),
      },
    ],
  },
];
