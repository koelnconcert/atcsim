import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useKeypress } from 'vue3-keypress'
import Sound from '@/libs/Sound'

const instances = ref({})
const activeUuid = computed(() => {
  const entries = Object.entries(instances.value)
  if (entries.length === 0) {
    return null
  }
  entries.sort(([uuid1, time1], [uuid2, time2]) => time2 - time1)
  return entries[0][0]
})

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
  const uuid = crypto.randomUUID()

  onMounted(() => {
    instances.value[uuid] = Date.now()
  })

  onUnmounted(() => {
    delete instances.value[uuid]
  })

  useKeypress({
    keyEvent: 'keydown',
    keyBinds: [
      {
        keyCode: 'space',
        preventDefault: false,
        success: async (event) => {
          if (!isInputLikeElementFocus()) {
            await Sound.startRecording()
            unfocusIfDisabled()
            event.preventDefault = true
          }
        }
      }
    ],
    isActive: computed(() => Sound.state.value === 'idle' && activeUuid.value === uuid)
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
    isActive: computed(() => Sound.state.value === 'recording' && activeUuid.value === uuid)
  })
}

export default { init }
