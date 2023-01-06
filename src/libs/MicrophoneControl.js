import { computed, nextTick } from 'vue'
import { useKeypress } from 'vue3-keypress'
import Sound from '@/libs/Sound'

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

function init ({ afterRecording }) {
  useKeypress({
    keyEvent: 'keydown',
    keyBinds: [
      {
        keyCode: 'space',
        success: async () => {
          if (!isInputLikeElementFocus()) {
            await Sound.startRecording()
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
          if (afterRecording) {
            await afterRecording()
          }
          unfocusIfDisabled()
        }
      }
    ],
    isActive: computed(() => Sound.state.value === 'recording')
  })
}

export default { init }
