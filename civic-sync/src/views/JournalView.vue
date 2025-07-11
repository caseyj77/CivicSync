<!-- JournalView.vue -->
<script setup>
import JournalEditor from '@/components/JournalViewComponents/JournalEditor.vue'
import JournalEntryCardGrid from '@/components/JournalViewComponents/JournalEntryCardGrid.vue'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useJournalStore } from '@/stores/journalStore'

const authStore = useAuthStore()
const journalStore = useJournalStore()

// 🔁 Load entries once user is available (handles refresh too)
watch(
  () => authStore.user,
  (user) => {
    if (user) {
      journalStore.loadEntries()
    }
  },
  { immediate: true }
)

</script>

<template>
  <div>
    <h1>Journal</h1>
    <JournalEditor />
    <JournalEntryCardGrid />
  </div>
</template>

<style scoped></style>
