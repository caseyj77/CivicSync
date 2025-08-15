<!-- MindMapCard.vue -->
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: [String, Object], // Accepts a timestamp string or Firestore Timestamp
    default: '',
  },
  tags: {
    type: Array,
    default: () => [],
  },
})

// Format timestamp safely
function formatDate(ts) {
  if (!ts) return ''
  const date = typeof ts === 'string' ? new Date(ts) : ts.toDate?.() || new Date(ts)
  return date.toLocaleDateString()
}

</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-date" v-if="updatedAt">
        Last updated: {{ formatDate(updatedAt) }}
      </p>
    </div>

    <div class="card-tags">
      <span
        class="tag"
        v-for="(tag, index) in tags"
        :key="index"
      >
        {{ tag }}
      </span>
    </div>

    <div class="card-actions">
      <button class="view-button">View</button>
      <!-- Add Edit/Delete later if needed -->
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-basic);
  border: 1px solid var(--color-muted);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  margin-bottom: var(--space-sm);
}

.card-title {
  font-size: var(--font-lg);
  color: var(--color-primary);
  margin: 0;
}

.card-date {
  font-size: var(--font-sm);
  color: var(--color-muted);
}

.card-tags {
  margin: var(--space-sm) 0;
}

.tag {
  display: inline-block;
  background-color: var(--color-accent);
  color: var(--color-basic);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  margin-right: 6px;
  margin-bottom: 4px;
}

.card-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.view-button {
  background-color: var(--color-secondary);
  color: var(--color-basic);
  border: none;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.view-button:hover {
  background-color: var(--color-primary);
}
</style>
