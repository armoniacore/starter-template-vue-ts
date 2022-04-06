import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter as createVueRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import routes from './routes'

export function createRouter(): Router {
  return createVueRouter({
    routes,

    history:
      // in SSR, use memory history
      import.meta.env.SSR
        ? createMemoryHistory()
        : // in electron, use web hash history
        import.meta.env.ELECTRON
        ? createWebHashHistory()
        : createWebHistory(),

    scrollBehavior(to) {
      if (to.hash) {
        return { selector: to.hash }
      }

      return { left: 0, top: 0 }
    },

    linkActiveClass: 'current-page',
    linkExactActiveClass: 'current-page'
  })
}
