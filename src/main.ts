import './index.css'

import type { HeadClient } from '@vueuse/head'
import { createHead } from '@vueuse/head'
import type { App as VueApp } from 'vue'
import { createApp as createVueApp, createSSRApp } from 'vue'
import type { Router } from 'vue-router'

import App from './App.vue'
import { createRouter } from './router'

export function createApp(): {
  readonly app: VueApp
  readonly head: HeadClient
  readonly router: Router
} {
  const app = import.meta.env.SSR ? createSSRApp(App) : createVueApp(App)

  const head = createHead()
  const router = createRouter()

  app.use(head)
  app.use(router)

  return {
    app,
    head,
    router
  }
}
