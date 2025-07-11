<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

defineProps({
  variant: {
    type: String,
    default: 'text',
  },
  disabled: Boolean,
})
</script>

<template>
  <button v-bind="attrs" :class="['card-button', variant]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.card-button {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-sm);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Variants */
.card-button.info {
  background-color: var(--color-info);
  color: var(--color-text);
}

.card-button.text {
  background-color: transparent;
  color: var(--color-text);
}

.card-button.primary {
  background-color: var(--color-primary);
  color: white;
}

.card-button.danger {
  background-color: var(--color-danger);
  color: white;
}

.card-button:hover:not(:disabled) {
  opacity: 0.85;
}

.card-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
