<script setup>
import { ref } from 'vue'
import { useKeypress } from 'vue3-keypress'
import Sound from '@/libs/Sound'
import { useCommHistoryStore } from '@/stores/commHistory'

const commHistory = useCommHistoryStore()
const state = Sound.state

const keySpaceActive = ref(true)

useKeypress({
  keyEvent: 'keydown',
  keyBinds: [
    {
      keyCode: 'space',
      success: () => {
        keySpaceActive.value = false
        Sound.startRecording()
      }
    }
  ],
  isActive: keySpaceActive
})

useKeypress({
  keyEvent: 'keyup',
  keyBinds: [
    {
      keyCode: 'space',
      success: async () => {
        await Sound.stopRecording()
        const text = await Sound.transcribeRecording()
        commHistory.add('ASR', null, text)
        await Sound.say({ text })
        keySpaceActive.value = true
      }
    }
  ]
})

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
