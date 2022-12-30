import { ref } from 'vue'

const url = 'http://localhost:8080'
const isActive = ref(false)

function call (path) {
  isActive.value = true
  return fetch(url + path)
    .finally(() => {
      isActive.value = false
    })
}

class SoundApiClient {
  isActive = isActive

  listVoices () {
    return call('/tts/voices').then(res => res.json())
  }

  say ({ text, voice = 'mb/mb-de4-en', speed = 130, pitch = 50 }) {
    const query = new URLSearchParams({ text, voice, speed, pitch })
    call('/tts/speak?' + query)
  }
}

export default new SoundApiClient()
