<!-- RegisterModal.vue -->
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const emit = defineEmits(['close'])


const registerData = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const loading = ref(false)

const handleRegister = async () => {
  errorMessage.value = ''
  if (registerData.value.password !== registerData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  try {
    await authStore.register(registerData.value.email, registerData.value.password)
    // success - emit close event
    emit('close')
  } catch (err) {
    errorMessage.value = 'Registration failed. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Create Account</h2>

      <form @submit.prevent="handleRegister">
        <label>Email</label>
        <input v-model="registerData.email" type="email" required />

        <label>Password</label>
        <input v-model="registerData.password" type="password" required />

        <label>Confirm Password</label>
        <input v-model="registerData.confirmPassword" type="password" required />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
}
.error {
  margin-top: 1rem;
  color: red;
}
</style>
