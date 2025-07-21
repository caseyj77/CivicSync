<script setup>
import MindElixir from 'mind-elixir'
import 'mind-elixir/style'
import example from 'mind-elixir/example'
import { onMounted, ref } from 'vue'

// Refs
const mapRef = ref(null)
const mindInstance = ref(null)

// On mount, initialize map
onMounted(() => {
  mindInstance.value = new MindElixir({
    el: mapRef.value,
    direction: MindElixir.LEFT,
    draggable: true,
    contextMenu: true,
    toolBar: true,
    nodeMenu: true,
    keypress: true,
  })
  mindInstance.value.init(example) // replace with DB data later
})

// Placeholder save/load methods
const saveMap = () => {
  const data = mindInstance.value.getData()
  console.log('Saving map:', data)
  // TODO: save to Firestore
}

const loadMap = () => {
  // TODO: load from Firestore
  console.log('Would load map from Firestore')
}
</script>

<template>
  <div class="mindmap-wrapper">
    <div ref="mapRef" class="mindmap-canvas"></div>
    <div class="mindmap-actions">
      <button @click="saveMap">Save Map</button>
      <button @click="loadMap">Load Map</button>
    </div>
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
