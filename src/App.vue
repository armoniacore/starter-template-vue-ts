<script lang="ts">
import { useHead } from '@vueuse/head'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    useHead({
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Vite App',
      meta: [{ name: 'description', content: 'Vite App Description' }]
    })
  }
})
</script>

<template>
  <RouterView />
</template>
