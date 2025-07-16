import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import { db } from '@/firebase'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

export const useJournalStore = defineStore('journal', {
  state: () => ({
    journalEntries: [],
    currentEntry: null,
  }),

  actions: {
    async addEntry(entry) {
      console.log('📌 journalStore.addEntry called')
      const authStore = useAuthStore()
      const user = authStore.user

      this.journalEntries.push(entry)

      if (user?.uid) {
        try {
          console.log('📤 Saving to Firestore (custom ID)...')
          const entryRef = doc(db, 'journalEntries', entry.id)
          await setDoc(entryRef, {
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

    updateEntry(entry) {
      this.currentEntry = entry
    },

    async saveEditedEntry(id, updatedEntry) {
      console.log('🛠 Updating entry:', id)

      try {
        const entryRef = doc(db, 'journalEntries', id)
        await updateDoc(entryRef, {
          ...updatedEntry,
          updatedAt: serverTimestamp(),
        })

        const index = this.journalEntries.findIndex((entry) => entry.id === id)
        if (index !== -1) {
          this.journalEntries[index] = {
            ...this.journalEntries[index],
            ...updatedEntry,
            updatedAt: new Date(),
          }
        }

        this.currentEntry = null
        console.log('✅ Entry updated successfully')
      } catch (error) {
        console.error('❌ Failed to update entry:', error)
      }
    },
  },
})
