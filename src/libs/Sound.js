import { ref, computed } from 'vue'

const url = 'http://localhost:8080'

const STATE_IDLE = 'idle'
const STATE_RECORDING = 'recording'
const STATE_PROCESSING = 'processing'
const STATE_PLAYING = 'playing'

const state = ref(STATE_IDLE)

function call (stateBefore, path, stateAfter = STATE_IDLE) {
  state.value = stateBefore
  return fetch(url + path)
    .finally(() => {
      if (stateAfter) {
        state.value = stateAfter
      }
    })
}

class Sound {
  state = state

  isActive = computed(() => state.value !== STATE_IDLE)

  listVoices () {
    return call(STATE_IDLE, '/tts/voices').then(res => res.json())
  }

  say ({ text, voice = 'mb/mb-de4-en', speed = 130, pitch = 50 }) {
    const query = new URLSearchParams({ text, voice, speed, pitch })
    return call(STATE_PLAYING, '/tts/speak?' + query)
  }

  startRecording () {
    return call(STATE_RECORDING, '/asr/start', STATE_RECORDING)
  }

  stopRecording () {
    return call(STATE_RECORDING, '/asr/stop')
  }

  transcribeRecording () {
    return call(STATE_PROCESSING, '/asr/transcribe')
      .then(res => res.json())
      .then(json => json.result)
  }

  replayRecording () {
    return call(STATE_PLAYING, '/asr/replay')
  }
}

export default new Sound()
