<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

//activate authStore
const authStore = useAuthStore()

const userLoginData = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  await authStore.login(userLoginData.value.email, userLoginData.value.password)
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
  padding: 2rem;
  border-radius: 8px;
  background-color: #fff;
}

label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  box-sizing: border-box;
}

.button-container {
  margin-top: 1.5rem;
  text-align: center;
}

button {
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.error {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>
