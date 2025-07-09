// src/stores/authStore.js
import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const errorMessage = ref('')

  const login = async (email, password) => {
    loading.value = true
    errorMessage.value = ''
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
    } catch (error) {
      errorMessage.value = 'Invalid email or password'
      console.error(error)
    } finally {
      loading.value = false
    }
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

  const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
  }

  return {
    user,
    loading,
    errorMessage,
    login,
    logout,
    register,
    init,
  }
})
