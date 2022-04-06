<script lang="ts">
import { defineComponent } from 'vue'

import HelloWorld from '../components/HelloWorld.vue'

export default defineComponent({
  components: {
    HelloWorld
  },
  setup() {
    //
  }
})
</script>

<template>
  <div class="text-center pt-40">
    <RouterLink
      class="inline-flex items-center px-4 py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700 overflow-hidden"
      to="/tailwind"
      >Tailwind</RouterLink
    >

    <div class="flex items-center justify-center">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>

    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
</template>
