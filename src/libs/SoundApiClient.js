const url = 'http://localhost:8080'
class SoundApiClient {
  listVoices () {
    return fetch(url + '/tts/voices').then(res => res.json())
  }

  say ({ text, voice = 'mb/mb-de4-en', speed = 130, pitch = 50 }) {
    const query = new URLSearchParams({ text, voice, speed, pitch })
    fetch(url + '/tts/speak?' + query)
  }
}

export default new SoundApiClient()
