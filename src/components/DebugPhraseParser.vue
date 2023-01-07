<script setup>
import Sound from '@/libs/Sound'
import GenericButton from './generic/GenericButton.vue'
import { PlayIcon } from '@heroicons/vue/24/solid'
import SoundStatus from './SoundStatus.vue'
import MicrophoneControl from '@/libs/MicrophoneControl'

MicrophoneControl.init({
  afterRecording: async () => {
    const text = await Sound.transcribeRecording()
    await Sound.say({ text })
  }
})

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
