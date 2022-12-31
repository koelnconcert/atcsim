import { ref } from 'vue'
import { defineStore } from 'pinia'

let id = 0

export const useCommHistoryStore = defineStore('commHistory', () => {
  const list = ref([])
  const maxHistoryLength = ref(10)

  function add (from, to, message) {
    list.value.push({
      id: id++,
      timestamp: Date.now(),
      from,
      to,
      message
    })
    if (list.value.length > maxHistoryLength.value) {
      list.value.shift()
    }
  }

  return { list, add }
})
