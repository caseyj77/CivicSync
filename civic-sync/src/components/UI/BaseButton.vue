<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: Boolean,
})
</script>

<template>
  <button v-bind="attrs" :class="['base-button', variant]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-base);
  border: none;
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: white;
}

.base-button.primary {
  background-color: var(--color-primary);
}
.base-button.secondary {
  background-color: var(--color-secondary);
}
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
