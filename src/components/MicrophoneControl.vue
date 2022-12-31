<script setup>
import { ref } from 'vue'
import { useKeypress } from 'vue3-keypress'
import Sound from '@/libs/Sound'

const state = Sound.state

const keySpaceActive = ref(true)

useKeypress({
  keyEvent: 'keydown',
  keyBinds: [
    {
      keyCode: 'space',
      success: () => {
        console.log('keydown')
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
      success: () => {
        console.log('keyup')
        Sound.stopRecordingAndTranscribe().then(text => {
          Sound.say({ text }).then(() => {
            keySpaceActive.value = true
          })
        })
      }
    }
  ]
})

</script>

<template>
  <div
    class="text-white p-2 text-center"
    :class="{
      'bg-blue-400': state === 'idle',
      'bg-red-400': state === 'recording',
      'bg-yellow-400': state === 'processing',
      'bg-green-400': state === 'playing'
    }"
  >
    {{ state }}
  </div>
</template>
