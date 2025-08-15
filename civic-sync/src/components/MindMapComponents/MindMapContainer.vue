<script setup>
import MindElixir from 'mind-elixir'
import 'mind-elixir/style'
import example from 'mind-elixir/example'
import { onMounted, ref } from 'vue'
import { mindMapStore } from '@/stores/mindMapStore'
import MindMapCardGrid from './MindMapCardGrid.vue'

const useMindMapStore = mindMapStore()

// Refs
const mapRef = ref(null)
const mindInstance = ref(null)
const mapTitle = ref('')

// On mount, initialize MindElixir and load latest map
onMounted(() => {
  (async () => {
    mindInstance.value = new MindElixir({
      el: mapRef.value,
      direction: MindElixir.LEFT,
      draggable: true,
      contextMenu: true,
      toolBar: true,
      nodeMenu: true,
      keypress: true,
    })
    mindInstance.value.init(example) // Initial placeholder

    await useMindMapStore.loadAllMindMaps()

    const latest = useMindMapStore.mindMaps[0]
    if (latest) {
      mapTitle.value = latest.mapId
      const data = await useMindMapStore.loadMindMap(latest.mapId)
      if (data) mindInstance.value.init(data)
    }
  })()
})

// Save map to Firestore
const saveMap = () => {
  if (!mapTitle.value.trim()) {
    alert('Please enter a map title.')
    return
  }

  const data = mindInstance.value.getData()
  useMindMapStore.saveMindMap(mapTitle.value.trim(), data)
}

// Load map by title
const loadMap = async () => {
  if (!mapTitle.value.trim()) {
    alert('Please enter a map title to load.')
    return
  }

  const data = await useMindMapStore.loadMindMap(mapTitle.value.trim())

  if (data && mindInstance.value) {
    mindInstance.value.init(data)
  } else {
    alert('Map not found')
  }
}

// Clear current map
const clearMap = () => {
  const confirmed = confirm('This will clear your current Mind Map. Do you want to continue?')
  if (!confirmed) return

  const emptyMap = {
    nodeData: {
      id: 'me-root',
      topic: 'New Map',
      root: true,
      children: [],
    },
  }
  mindInstance.value.init(emptyMap)
  console.log('🧹 Map content cleared')
}
</script>

<template>
  <div class="mindmap-wrapper">
    <div ref="mapRef" class="mindmap-canvas"></div>
    <div class="mindmap-actions">
      <input class="input" placeholder="title" v-model="mapTitle" />
      <button @click="saveMap">Save Map</button>
      <button @click="loadMap">Load Map</button>
      <button @click="clearMap">Clear Map</button>
    </div>
  </div>
  <div>
    <MindMapCardGrid />
  </div>
</template>

<style scoped>
.mindmap-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mindmap-canvas {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  border-radius: 8px;
}

.mindmap-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
