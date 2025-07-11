<script setup>
import { useJournalStore } from '@/stores/journalStore'
import JournalEntryCard from '@/components/UI/JournalEntryCard.vue'

const journalStore = useJournalStore()
</script>

<template>
  <div v-if="journalStore.journalEntries.length === 0">
    <p>No journal entries yet.</p>
  </div>
  <div v-else class="entry-grid">
    <JournalEntryCard v-for="entry in journalStore.journalEntries" :key="entry.id" :entry="entry" />
  </div>
</template>

<style scoped>
.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  padding: var(--space-md);
}
</style>
