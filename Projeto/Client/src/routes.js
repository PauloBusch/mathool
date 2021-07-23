import { createRouter, createWebHashHistory } from 'vue-router';

import publicRoutes from './public/routes';
import restrictRoutes from './restrict/routes';
import PublicLayout from './public/Layout.vue';
import RestrictLayout from './restrict/Layout.vue';

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: publicRoutes
  },
  {
    path: '/mathool',
    component: RestrictLayout,
    children: restrictRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
