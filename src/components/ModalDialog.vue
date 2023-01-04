<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue'

defineProps({
  open: Boolean
})
const emit = defineEmits(['update:open'])

function close () {
  emit('update:open', false)
}
</script>

<template>
  <Dialog
    :open="open"
    @close="close"
  >
    <div
      class="fixed inset-0 bg-black/80"
      aria-hidden="true"
    />
    <div class="fixed inset-0 grid place-items-center overflow-y-auto p-8">
      <DialogPanel class="bg-zinc-800 w-auto p-2">
        <slot/>
      </DialogPanel>
    </div>
  </Dialog>
</template>
