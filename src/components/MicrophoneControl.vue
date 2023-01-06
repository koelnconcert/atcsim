<script setup>
import { computed, nextTick } from 'vue'
import { useKeypress } from 'vue3-keypress'
import Sound from '@/libs/Sound'
import { useCommHistoryStore } from '@/stores/commHistory'

const commHistory = useCommHistoryStore()

function unfocusIfDisabled () {
  // unfocus current element if it is disabled; otherwiese event keyup will not trigger
  nextTick(() => {
    if (document.activeElement.disabled) {
      document.activeElement.blur()
    }
  })
}

function isInputLikeElementFocus () {
  return ['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())
}

useKeypress({
  keyEvent: 'keydown',
  keyBinds: [
    {
      keyCode: 'space',
      success: () => {
        if (!isInputLikeElementFocus()) {
          Sound.startRecording()
          unfocusIfDisabled()
        }
      }
    }
  ],
  isActive: computed(() => Sound.state.value === 'idle')
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
        unfocusIfDisabled()
      }
    }
  ],
  isActive: computed(() => Sound.state.value === 'recording')
})

</script>

<template>
  <template/>
</template>
