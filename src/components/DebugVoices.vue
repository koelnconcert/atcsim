<script setup>
import { ref } from 'vue'
import Sound from '@/libs/Sound'
import { useCommHistoryStore } from '@/stores/commHistory'
import { PlayIcon } from '@heroicons/vue/24/solid'
import GenericButton from './generic/GenericButton.vue'

const commHistory = useCommHistoryStore()

const isActive = Sound.isActive
const text = ref('This is a test')
const voices = ref([])
const speed = ref(140)
const pitch = ref(50)

Sound.listVoices().then(data => {
  voices.value = data.voices.sort((a, b) => a.voice.localeCompare(b.voice))
})

function play (voice) {
  commHistory.add('System Debug (' + voice + ')', null, text.value)
  Sound.say({
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
      class="flex items-center mb-1"
    >
      <GenericButton
        class="mr-1"
        :disabled="isActive"
        @click="play(voice.voice)"
      >
        <PlayIcon class="w-4 h-4"/>
      </GenericButton>
      {{ voice.voice }}
    </li>
  </ul>
</template>
