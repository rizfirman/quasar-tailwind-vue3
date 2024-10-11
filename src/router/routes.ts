import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/movie-list',
    component: () => import('layouts/BasicLayout.vue'),
    children: [{ path: '', component: () => import('pages/MovieList.vue') }],
  },

  {
    path: '/add-movie',
    component: () => import('layouts/BasicLayout.vue'),
    children: [{ path: '', component: () => import('pages/AddAndEditMovie.vue') }],
  },
  {
    path: '/movie-list/:id',
    component: () => import('layouts/BasicLayout.vue'),
    children: [{ path: '', component: () => import('pages/AddAndEditMovie.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
