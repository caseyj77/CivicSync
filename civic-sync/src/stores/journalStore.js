import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import { db } from '@/firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore'

export const useJournalStore = defineStore('journal', {
  state: () => ({
    journalEntries: [],
  }),

  actions: {
    async addEntry(entry) {
      console.log('📌 journalStore.addEntry called')
      const authStore = useAuthStore()
      const user = authStore.user

      this.journalEntries.push(entry)

      if (user?.uid) {
        try {
          console.log('📤 Saving to Firestore...')
          await addDoc(collection(db, 'journalEntries'), {
            ...entry,
            uid: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
        } catch (err) {
          console.error('❌ Failed to save entry:', err)
        }
      } else {
        console.warn('⚠️ Not logged in — entry saved locally only')
      }
    },

    async loadEntries() {
      console.log('🟡 loadEntries() called')
      const authStore = useAuthStore()
      const user = authStore.user
      console.log('👤 Current user:', user)

      if (!user?.uid) {
        console.warn('⛔ Not logged in — skipping load')
        return
      }

      try {
        const q = query(
          collection(db, 'journalEntries'),
          where('uid', '==', user.uid),
          orderBy('createdAt', 'desc'),
        )
        const querySnapshot = await getDocs(q)
        this.journalEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log('📊 Loaded entries:', this.journalEntries)
      } catch (error) {
        console.error('❌ Error loading entries:', error)
      }
    },
  },
})
