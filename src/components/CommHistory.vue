<script setup>
import { watch, ref, nextTick } from 'vue'
import { useCommHistoryStore } from '@/stores/commHistory'

const commHistory = useCommHistoryStore()

const container = ref(null)

watch(commHistory.list, () => {
  nextTick(() => {
    container.value.scrollTop = container.value.scrollHeight
  })
})
</script>

<template>
  <div
    ref="container"
    class="overflow-scroll"
  >
    <div
      v-for="comm in commHistory.list"
      :key="comm.id"
      :title="comm.timestamp"
    >
      [{{ new Date(comm.timestamp).toLocaleTimeString() }}]
      {{ comm.from }} -> {{ comm.to }}: {{ comm.message }}
    </div>
  </div>
</template>
