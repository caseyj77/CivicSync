<!-- LoginModal.vue -->
<script setup>
import LoginForm from './LoginForm.vue'
import { useAuthStore } from '@/stores/authStore'
import { watch, toRef } from 'vue'

const authStore = useAuthStore()
const emit = defineEmits(['close'])
const userRef = toRef(authStore, 'user')

// Close modal when user successfully logs in
watch(
  () => userRef.value,
  (newUser) => {
    if (newUser) emit('close')
  },
)
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <LoginForm />
      <button class="close-btn" @click="$emit('close')">×</button>
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
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
}
</style>
