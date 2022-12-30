<script setup>
import { ref } from 'vue'
import SoundApiClient from '../libs/SoundApiClient'

const isActive = SoundApiClient.isActive
const text = ref('This is a test')
const voices = ref([])
const speed = ref(180)
const pitch = ref(50)

SoundApiClient.listVoices().then(data => {
  voices.value = data.voices.sort((a, b) => a.voice.localeCompare(b.voice))
})

function play (voice) {
  SoundApiClient.say({
    text: text.value,
    speed: speed.value,
    pitch: pitch.value,
    voice
  })
}

</script>

<template>
  <div class="grid grid-cols-[auto_1fr] gap-2">
    <label>Speed</label>
    <div>
      <input
        v-model="speed"
        type="range"
        class="max-w-xs"
        min="20"
        max="200"
      >
      {{ speed }}
    </div>
    <label>Pitch</label>
    <div>
      <input
        v-model="pitch"
        type="range"
        class="max-w-xs"
        min="0"
        max="99"
      >
      {{ pitch }}
    </div>
    <label>Text</label>
    <input
      v-model="text"
      type="text"
      class="border border-zinc-600 mb-2 bg-zinc-800 px-1"
    >
  </div>
  <ul>
    <li
      v-for="voice in voices"
      :key="voice.voice"
    >
      <button
        class="border border-zinc-600 rounded p-1 my-0.5 mr-1 disabled:text-gray-600 disabled:cursor-not-allowed"
        :disabled="isActive"
        @click="play(voice.voice)"
      >
        Play
      </button>
      {{ voice.voice }}
    </li>
  </ul>
</template>
