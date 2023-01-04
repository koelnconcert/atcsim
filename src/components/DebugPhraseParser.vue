<script setup>
import Sound from '@/libs/Sound'
import GenericButton from './generic/GenericButton.vue'
import { PlayIcon } from '@heroicons/vue/24/solid'
import SoundStatus from './SoundStatus.vue'

const isSoundActive = Sound.isActive

const replay = () => {
  Sound.replayRecording()
}
</script>

<template>
  <SoundStatus class="w-36 mb-2"/>
  <GenericButton
    :disabled="isSoundActive"
    :icon="PlayIcon"
    @click="replay"
  >
    Replay
  </GenericButton>
</template>
