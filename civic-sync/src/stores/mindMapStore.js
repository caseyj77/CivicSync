// mind map store

import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from '@/firebase'

export const mindMapStore = defineStore('mindMap', () => {
    const mindMaps = ref([])

    async function saveMindMap(mapData) {

    }



    return {
        mindMaps
    }
})// closing brackets