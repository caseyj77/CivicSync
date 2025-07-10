<!-- JournalEntryCard.vue -->
<script setup>
defineProps({
  entry: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div class="entry-card">
    <h3 class="entry-title">{{ entry.title }}</h3>
    <p class="entry-date">{{ new Date(entry.date).toLocaleDateString() }}</p>
    <div class="entry-tags">
      <span v-for="tag in entry.tags" :key="tag" class="tag-badge">{{ tag }}</span>
    </div>
    <p class="entry-preview" v-html="entry.content?.content?.[0]?.content?.[0]?.text?.slice(0, 120) + '...'"></p>
    <!-- Add View/Edit buttons here later -->
  </div>
</template>

<style scoped>
.entry-card {
  border: 1px solid var(--color-muted);
  border-radius: var(--radius-base);
  padding: var(--space-md);
  background-color: var(--color-basic);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.entry-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.entry-date {
  font-size: 0.85rem;
  color: gray;
}
.entry-tags {
  margin-top: 0.5rem;
}
.tag-badge {
  background-color: var(--color-secondary);
  color: white;
  padding: 2px 6px;
  margin-right: 4px;
  font-size: 0.75rem;
  border-radius: 4px;
}
.entry-preview {
  margin-top: 0.5rem;
  color: var(--color-text);
  font-size: 0.9rem;
}
</style>
