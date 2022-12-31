<script setup>
import { ref } from 'vue'
import ModalDialog from '@/components/ModalDialog.vue'
import DebugVoices from '@/components/DebugVoices.vue'
const showDebugVoices = ref(false)
</script>

<template>
  <button @click="showDebugVoices = true">
    Options
  </button>
  <ModalDialog v-model:show="showDebugVoices">
    <DebugVoices/>
  </ModalDialog>
</template>
