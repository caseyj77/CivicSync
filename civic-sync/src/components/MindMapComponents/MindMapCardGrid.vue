<script setup>
import { computed } from 'vue'
import { mindMapStore } from '@/stores/mindMapStore'
import MindMapCard from '../UI/MindMapCard.vue'

const useMindMapStore = mindMapStore()

// Pull mind maps from store (adjust if you're passing props instead)
const mindMaps = computed(() => useMindMapStore.mindMaps)
</script>

<template>
  <div class="entry-grid">
    <MindMapCard
      v-for="map in mindMaps"
      :key="map.id"
      :id="map.id"
      :title="map.title"
      :updated-at="map.updatedAt"
      :tags="map.tags"
    />
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
