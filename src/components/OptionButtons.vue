<script setup>
import DebugVoices from '@/components/DebugVoices.vue'
import { MegaphoneIcon, MicrophoneIcon } from '@heroicons/vue/24/solid'
import GenericButtonForDialog from './generic/GenericButtonForDialog.vue'
</script>

<template>
  <GenericButtonForDialog class="mb-2 w-full" :icon="MegaphoneIcon" text="Voices">
    <DebugVoices/>
  </GenericButtonForDialog>
</template>
