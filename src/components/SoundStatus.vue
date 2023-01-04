<script setup>
import Sound from '@/libs/Sound'

const state = Sound.state
</script>

<template>
  <div
    class="text-white p-2 text-center"
    :class="{
      'bg-sky-900': state === 'idle',
      'bg-red-900': state === 'recording',
      'bg-yellow-700': state === 'processing',
      'bg-green-900': state === 'playing'
    }"
  >
    {{ state }}
  </div>
</template>
