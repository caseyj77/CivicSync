// mind map store

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase'
import { useAuthStore } from './authStore'
import { doc, setDoc, getDoc } from 'firebase/firestore'



export const mindMapStore = defineStore('mindMap', () => {
  const mindMaps = ref([])
  const currentMapId = ref('default')
  const loadedMapData = ref(null)
  async function saveMindMap(mapId, mapData) {
    const authStore = useAuthStore()
    const uid = authStore.user?.uid
    if (!uid) {
      console.error('Cannot save mind map: User not authenticated.')
      return
    }

    const mapRef = doc(db, 'users', uid, 'mindMaps', mapId)

    try {
      const existingDoc = await getDoc(mapRef)

      if (existingDoc.exists()) {
        const confirmed = confirm(`A mind map titled "${mapId}" already exists. Overwrite it?`)
        if (!confirmed) return
      }

      await setDoc(
        mapRef,
        {
          uid,
          mapId,
          data: mapData,
          updatedAt: Date.now(),
        },
        { merge: true },
      )

      console.log(`✅ Mind map "${mapId}" saved to Firestore!`)
    } catch (err) {
      console.error('❌ Error saving mind map:', err)
    }
  }

  async function loadMindMap(mapId) {
    const authStore = useAuthStore()
    const uid = authStore.user?.uid

    if(!uid) {
      console.error('Cannot load mind map: User not authenticated.')
      return null
    }

    const mapRef = doc(db, 'users', uid, 'mindMaps', mapId) 

    try{
      const mapDoc = await getDoc(mapRef)
      if(mapDoc.exists()) {
        const data = mapDoc.data()
        loadedMapData.value = data.data
        currentMapId.value = mapId
        console.log(`📥 Loaded mind map "${mapId}" from Database`)
        return data.data
      } else {
        console.warn(`⚠️ No mind map found with ID "${mapId}"`)
      }
    } catch(err) {
      console.error(`error loading mind map:`, err)
      return null
    }
  }

  return {
    mindMaps,
    currentMapId,
    saveMindMap,
    loadMindMap,
    loadedMapData,
  }
}) // closing brackets
