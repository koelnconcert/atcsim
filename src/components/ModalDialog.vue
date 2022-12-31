<script setup>
import { useKeypress } from 'vue3-keypress'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])

function close () {
  emit('update:show', false)
}

useKeypress({
  keyEvent: 'keydown',
  keyBinds: [
    {
      keyCode: 'esc',
      success: close
    }
  ],
  isActive: props.show
})
</script>

<template>
  <template v-if="show">
    <Teleport to="body">
      <div class="absolute inset-0 bg-black/80"/>
      <div
        class="absolute inset-0 grid place-items-center overflow-scroll p-8"
        @click.self="close"
      >
        <div class="bg-zinc-800 w-auto p-2">
          <slot/>
        </div>
      </div>
    </Teleport>
  </template>
</template>
