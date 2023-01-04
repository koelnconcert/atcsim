<script setup>
import { ref } from 'vue'
import ModalDialog from '@/components/ModalDialog.vue'
import DebugVoices from '@/components/DebugVoices.vue'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'

const showDebugVoices = ref(false)
</script>

<template>
  <button
    class="flex items-center"
    @click="showDebugVoices = true"
  >
    <AdjustmentsHorizontalIcon class="w-6 h-6 mr-1"/>
    Options
  </button>
  <ModalDialog v-model:open="showDebugVoices">
    <DebugVoices/>
  </ModalDialog>
</template>
