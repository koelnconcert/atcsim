<script setup>
import { ref } from 'vue'
import GenericDialog from './GenericDialog.vue'
const show = ref(false)
</script>

<template>
  <button
    class="flex items-center"
    @click="show = true"
  >
    <slot name="button"/>
  </button>
  <GenericDialog v-model:open="show">
    <slot name="content"/>
  </GenericDialog>
</template>
