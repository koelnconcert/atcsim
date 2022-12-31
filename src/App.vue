<script setup>
import DebugVoices from '@/components/DebugVoices.vue'
import MicrophoneControl from '@/components/MicrophoneControl.vue'
import CommHistory from '@/components/CommHistory.vue'

</script>

<template>
  <div class="grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] h-screen w-screen">
    <main class="p-2 overflow-scroll">
      <DebugVoices/>
    </main>
    <aside class="row-span-2 w-64 h-full right-0 bg-zinc-800 p-2 overflow-scroll">
      <MicrophoneControl/>
    </aside>
    <footer class="w-full h-24 bg-zinc-800 p-2 overflow-hidden">
      <CommHistory class="h-full"/>
    </footer>
  </div>
</template>
