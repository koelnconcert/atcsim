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
const speed = ref(1)

Sound.listVoices().then(data => {
  voices.value = data.voices
})

function play (voice) {
  commHistory.add('System Debug (' + voice + ')', null, text.value)
  Sound.say({
    text: text.value,
    speed: speed.value,
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
        min="0.1"
        max="1.9"
        step="0.1"
      >
      {{ speed }}
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
      :key="voice"
      class="flex items-center mb-1"
    >
      <GenericButton
        class="mr-1"
        :disabled="isActive"
        @click="play(voice)"
      >
        <PlayIcon class="w-4 h-4"/>
      </GenericButton>
      {{ voice }}
    </li>
  </ul>
</template>
