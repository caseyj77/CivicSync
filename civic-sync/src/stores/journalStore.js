import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journal', {
  state: () => ({
    journalEntries: [],
  }),

  actions: {
    addEntry(entry) {
      this.journalEntries.push(entry)
    },
  },
})
