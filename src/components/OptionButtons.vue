<script setup>
import DebugVoices from '@/components/DebugVoices.vue'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
import GenericButtonForDialog from './GenericButtonForDialog.vue'
</script>

<template>
  <GenericButtonForDialog>
    <template #button>
      <AdjustmentsHorizontalIcon class="w-6 h-6 mr-1"/>
      Voices
    </template>
    <template #content>
      <DebugVoices/>
    </template>
  </GenericButtonForDialog>
</template>
