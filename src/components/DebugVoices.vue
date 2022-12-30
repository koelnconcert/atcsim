<script setup>
import { ref } from 'vue'
import SoundApiClient from '../libs/SoundApiClient'

const isActive = SoundApiClient.isActive
const text = ref('This is a test')
const voices = ref([])

SoundApiClient.listVoices().then(data => {
  voices.value = data.voices.sort((a, b) => a.voice.localeCompare(b.voice))
})

function play (voice) {
  SoundApiClient.say({ text: text.value, voice })
}

</script>

<template>
  <input v-model="text"/>
  <ul>
    <li
      v-for="voice in voices"
      :key="voice.voice"
    >
      <button @click="play(voice.voice)" :disabled="isActive">Play</button>
      {{ voice.voice }}

    </li>
  </ul>
</template>
