import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { armonia, minify } from '@armonia/vite'

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
