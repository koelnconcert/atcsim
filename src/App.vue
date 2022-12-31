<script setup>
import MicrophoneControl from '@/components/MicrophoneControl.vue'
import CommHistory from '@/components/CommHistory.vue'
import OptionButtons from './components/OptionButtons.vue'

</script>

<template>
  <div class="grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] h-screen w-screen">
    <main class="p-2 overflow-hidden">
    </main>
    <aside class="row-span-2 w-64 h-full right-0 bg-zinc-800 p-2 overflow-hidden">
      <MicrophoneControl class="mb-2"/>
      <OptionButtons/>
    </aside>
    <footer class="w-full h-24 bg-zinc-800 p-2 overflow-hidden">
      <CommHistory class="h-full"/>
    </footer>
  </div>
</template>
