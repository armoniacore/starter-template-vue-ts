import type { RouteRecordRaw } from 'vue-router'

import Index from '../pages/IndexPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/tailwind',
    component: () => import('../pages/TailwindPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

export default routes
