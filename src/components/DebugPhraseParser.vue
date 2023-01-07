<script setup>
import { ref } from 'vue'
import Sound from '@/libs/Sound'
import GenericButton from './generic/GenericButton.vue'
import { PlayIcon } from '@heroicons/vue/24/solid'
import SoundStatus from './SoundStatus.vue'
import MicrophoneControl from '@/libs/MicrophoneControl'

const isSoundActive = Sound.isActive
const text = ref('')

MicrophoneControl.init({
  afterRecording: async () => {
    text.value = await Sound.transcribeRecording()
  }
})

const replay = () => {
  Sound.replayRecording()
}

const say = () => {
  Sound.say({ text: text.value })
}
</script>

<template>
  <div class="grid gap-2">
    <SoundStatus class="w-36"/>
    <GenericButton
      class="w-min"
      :disabled="isSoundActive"
      :icon="PlayIcon"
      @click="replay"
    >
      Replay
    </GenericButton>
    <textarea v-model="text"/>
    <GenericButton
        class="w-min"
        :disabled="isSoundActive"
        :icon="PlayIcon"
        @click="say"
    >
      Say
    </GenericButton>
  </div>
</template>
