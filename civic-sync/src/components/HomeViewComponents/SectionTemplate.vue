<script setup>

defineProps({
    layout: {
        type: String,
        default: 'a' //chooses your layout
    },
    background: {
        type: String,
        default: 'var(--color-background)' // sets the default background for the section
    }
})

</script>

<template>
     <section :class="['section-wrapper', layout]" :style="{ backgroundColor: background }">
    <div class="section-content">
      <h1 class="section-title">
        <slot name="title">Default Title</slot>
      </h1>
      <p class="section-subtitle">
        <slot name="subtitle">Default description</slot>
      </p>
      <slot name="action" />
    </div>
  </section> 
</template>

<style scoped>
.section-wrapper {
  padding: var(--space-xl);
  color: var(--color-text);
  text-align: center;
}

/* .section-wrapper.a {
  border-left: 6px solid var(--color-primary);
}

.section-wrapper.b {
  border-top: 3px dotted var(--color-secondary);
} */

.section-title {
  font-size: var(--font-xxl);
  margin-bottom: var(--space-md);
}

.section-subtitle {
  font-size: var(--font-lg);
  margin-bottom: var(--space-lg);
}
</style>