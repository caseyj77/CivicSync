// journalstore.js
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import { db } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const useJournalStore = defineStore('journal', {
  state: () => ({
    journalEntries: [],
  }),

  actions: {
    addEntry(entry) {
  console.log('📌 journalStore.addEntry called')

  const authStore = useAuthStore()
  const user = authStore.user

  this.journalEntries.push(entry)

  if (user?.uid) {
    console.log('📤 Attempting to save to Firestore...')
    try {
      addDoc(collection(db, 'journalEntries'), {
        ...entry,
        uid: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      console.error('Failed to save entry to Database', err)
    }
  } else {
    console.warn('User not logged in - entry saved locally only')
  }
  }

  }
  })
