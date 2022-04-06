import type { RouteRecordRaw } from 'vue-router'

import Index from '../pages/IndexPage.vue'
import Tailwind from '../pages/TailwindPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/tailwind',
    component: Tailwind
  }
]

export default routes
