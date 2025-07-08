// src/stores/authStore.js
import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const authStore = defineStore('auth', () => {
  const user = ref(null)

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
  }

  const init = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
    })
  }

  return { user, login, logout, init }
})
