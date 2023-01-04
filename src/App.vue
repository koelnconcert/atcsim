<script setup>
import MicrophoneControl from '@/components/MicrophoneControl.vue'
import CommHistory from '@/components/CommHistory.vue'
import OptionButtons from './components/OptionButtons.vue'
import SoundStatus from './components/SoundStatus.vue'

</script>

<template>
  <div class="grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] h-screen w-screen">
    <main class="p-2 overflow-hidden">
      <div class="w-full h-full grid place-items-center">
        Here comes the radar scope
      </div>
    </main>
    <aside class="row-span-2 w-64 h-full right-0 bg-zinc-800 p-2 overflow-hidden">
      <SoundStatus/>
      <MicrophoneControl class="mb-2"/>
      <h2 class="mt-4 mb-2 text-lg">
        Debugging
      </h2>
      <OptionButtons/>
    </aside>
    <footer class="w-full h-24 bg-zinc-800 p-2 overflow-hidden">
      <CommHistory class="h-full"/>
    </footer>
  </div>
</template>
