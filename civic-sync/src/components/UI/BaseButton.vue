<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // can be 'primary', 'secondary', etc.
  },
  disabled: Boolean,
})
</script>

<template>
  <button :class="['base-button', variant]" :disabled="disabled" @click="$emit('click')">
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
