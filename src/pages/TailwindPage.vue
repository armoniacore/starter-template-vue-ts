<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    //
  }
})
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="This is a placeholder text"
      class="disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-2 dark:focus:ring-pink-500 w-80 p-2 appearance-none rounded-md caret-pink-500 ring-2 ring-gray-500 hover:ring-slate-300 dark:hover:bg-slate-700 dark:bg-slate-800 dark:highlight-white/5 dark:focus:bg-slate-900"
    />
  </div>
</template>
