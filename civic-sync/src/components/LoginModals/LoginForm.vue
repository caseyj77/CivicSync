<!-- LoginForm.vue -->
<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref, onMounted } from 'vue'
import { useJournalStore } from '@/stores/journalStore'

//activate authStore
const authStore = useAuthStore()
const journalStore = useJournalStore()

const userLoginData = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  try {
    await authStore.login(userLoginData.value.email, userLoginData.value.password)

    // ✅ Only load entries if login is successful and user exists
    if (authStore.user) {
      await journalStore.loadEntries()
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleLogin">
      <label for="email">Email</label>
      <input
        v-model="userLoginData.email"
        type="email"
        id="email"
        placeholder="Enter your email"
        required
      />

      <label for="password">Password</label>
      <input
        v-model="userLoginData.password"
        type="password"
        id="password"
        placeholder="Enter your password"
        required
      />

      <div class="button-container">
        <button type="submit" :disabled="authStore.loading">
          <span v-if="authStore.loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </div>
    </form>

    <p v-if="authStore.errorMessage" class="error">{{ authStore.errorMessage }}</p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: var(--space-lg);
  border-radius: var(--radius-base);
  background-color: var(--color-basic);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-top: var(--space-md);
  margin-bottom: var(--space-xs);
  font-weight: bold;
  font-size: var(--font-base);
  color: var(--color-text);
}

input {
  width: 100%;
  padding: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-size: var(--font-base);
  border: 1px solid var(--color-muted);
  border-radius: var(--radius-base);
  box-sizing: border-box;
  background-color: var(--color-basic);
  color: var(--color-text);
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(134, 93, 54, 0.2);
}

.button-container {
  margin-top: var(--space-md);
  text-align: center;
}

button {
  padding: var(--space-sm) var(--space-lg);
  font-weight: bold;
  font-size: var(--font-base);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--color-secondary);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: var(--space-sm);
  color: var(--color-danger);
  text-align: center;
  font-size: var(--font-sm);
}
</style>
