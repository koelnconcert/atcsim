<script setup>
defineProps({
  icon: {
    type: Function, // Component
    required: false
  }
})
</script>

<template>
  <button
    class="
      border border-zinc-500 rounded p-1 flex items-center
      hover:bg-zinc-700
      active:bg-zinc-600
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    <component :is="icon" v-if="icon" class="w-4 h-4 mr-0.5"/>
    <slot/>
  </button>
</template>
