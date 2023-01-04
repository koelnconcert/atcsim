<script setup>
import Sound from '@/libs/Sound'
import GenericButton from './generic/GenericButton.vue'
import { PlayIcon } from '@heroicons/vue/24/solid'

const isSoundActive = Sound.isActive

const replay = () => {
  Sound.replayRecording()
}
</script>

<template>
  <GenericButton
    :disabled="isSoundActive"
    :icon="PlayIcon"
    @click="replay"
  >
    Replay
  </GenericButton>
</template>
