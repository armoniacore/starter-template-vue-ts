import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { armonia, minify } from '@armonia/vite'
import type { render, createApp } from './src/entry-server'

type Module = {
  render: typeof render
  createApp: typeof createApp
}

export default defineConfig({
  plugins: [
    vue(),
    armonia({
      electron: {
        config: {
          build: {
            outDir: 'dist-electron'
          }
        }
      },

      ssr: {
        async staticRender(ssr) {
          const { render, createApp } = ssr as unknown as Module

          const app = createApp()
          const routes = app.router.getRoutes()
          const files = []

          for (const route of routes) {
            const url = route.path
            const req = {
              originalUrl: url
            }

            const html = await render(req as any)
            const id = `${url === '/' ? '/index' : url}.html`

            files.push({
              id,
              code: html
            })
          }

          return files
        },
        transformTemplate: minify(),
        config: {
          build: {
            outDir: 'dist-ssr'
          }
        }
      }
    })
  ],

  server: {
    port: 3000,
    strictPort: true,

    proxy: {
      '/graphql': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true
      },

      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[hash:base64:4]'
    }
  },

  build: {
    assetsDir: '_',
    rollupOptions: {
      output: {
        entryFileNames: '_/[hash].js',
        chunkFileNames: '_/[hash].js',
        assetFileNames: '_/[hash].[ext]'
      }
    },

    minify: 'terser',
    terserOptions: {
      mangle: {
        properties: false
      }
    }
  }
})
