<script setup>
import { ref } from 'vue'
import GenericDialog from './GenericDialog.vue'
import GenericButton from './GenericButton.vue'

defineProps({
  icon: {
    type: Object,
    required: false
  },
  text: {
    type: String,
    required: false
  }
})

const show = ref(false)
</script>

<template>
  <GenericButton :icon="icon" @click="show = true">
    <slot name="button"/>
    {{ text }}
    <GenericDialog v-model:open="show">
      <slot/>
    </GenericDialog>
  </GenericButton>
</template>
