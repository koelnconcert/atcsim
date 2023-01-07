<script setup>
import { ref, computed } from 'vue'
import Sound from '@/libs/Sound'
import GenericButton from './generic/GenericButton.vue'
import { PlayIcon } from '@heroicons/vue/24/solid'
import SoundStatus from './SoundStatus.vue'
import MicrophoneControl from '@/libs/MicrophoneControl'

import AtcGrammar from '@/libs/AtcGrammar'

const isSoundActive = Sound.isActive
const text = ref('')
const start = ref(AtcGrammar.defaultStart())
const ruleNames = ref(AtcGrammar.ruleNames()
  .filter(name => !name.includes('$'))
  .filter(name => name.length > 1)
)

const parsedText = computed(() => AtcGrammar.parse(text.value, start.value))

MicrophoneControl.init({
  afterRecording: async () => {
    text.value = await Sound.transcribeRecording()
  }
})

const replay = () => {
  Sound.replayRecording()
}

const say = () => {
  Sound.say({ text: text.value })
}
</script>

<template>
  <div class="grid gap-2 h-full">
    <SoundStatus class="w-36"/>
    <GenericButton
      class="w-min"
      :disabled="isSoundActive"
      :icon="PlayIcon"
      @click="replay"
    >
      Replay
    </GenericButton>
    <textarea v-model.lazy="text"/>
    <GenericButton
      class="w-min"
      :disabled="isSoundActive"
      :icon="PlayIcon"
      @click="say"
    >
      Say
    </GenericButton>
    <select v-model="start" class="p-1">
      <option
        v-for="ruleName in ruleNames"
        :key="ruleName"
      >
        {{ ruleName }}
      </option>
    </select>
    <pre class="w-96 h-96 text-black p-2 bg-zinc-600 overflow-scroll">{{ parsedText }}</pre>
  </div>
</template>
