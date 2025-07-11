<!-- Header.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LoginModal from './LoginModals/LoginModal.vue'
import RegisterModal from './LoginModals/RegisterModal.vue'
import { useJournalStore } from '@/stores/journalStore'

const router = useRouter()
const authStore = useAuthStore()

const showDropdown = ref(false)
const avatarRef = ref(null)

// Toggle dropdown visibility when avatar is clicked
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside of avatar/profile area
const handleClickOutside = (event) => {
  if (avatarRef.value && !avatarRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

// Set up event listener and start Firebase auth tracking
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  authStore.init() // starts listening to Firebase auth state changes
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Computed: true if user is logged in
const isUserLoggedIn = computed(() => !!authStore.user)

// Computed: show user's email if logged in, otherwise "Guest"
const userName = computed(() => authStore.user?.email || 'Guest')

/**
 * Handles clicking Login or Logout in the dropdown
 * - If user is logged in, logs them out and redirects to home
 * - If user is not logged in, redirects to /login page
 */
const handleLoginLogout = async () => {
  showDropdown.value = false

  if (isUserLoggedIn.value) {
    await authStore.logout()
    const journalStore = useJournalStore()
    journalStore.journalEntries = []
    router.push('/') // redirect after logout
    
  } else {
    router.push('/login') // go to login page
  }
}

const showLoginModal = ref(false)

const openLogin = () => {
  showDropdown.value = false
  showLoginModal.value = true
}
</script>

<template>
  <header class="site-header">
    <nav class="nav-container">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" exact-active-class="active-link">Home</RouterLink>
        <RouterLink to="/journal" class="nav-link" exact-active-class="active-link"
          >Journal</RouterLink
        >
        <RouterLink to="/mindmap" class="nav-link" exact-active-class="active-link"
          >Mind Map</RouterLink
        >
        <RouterLink to="/resources" class="nav-link" exact-active-class="active-link"
          >Resources</RouterLink
        >
      </div>

      <!-- User Card -->
      <div class="user-card" ref="avatarRef">
        <span class="user-name">{{ userName }}</span>
        <div class="avatar-icon" @click="toggleDropdown">
          👤
          <ul v-if="showDropdown" class="dropdown-list">
            <li>Profile</li>
            <li v-if="isUserLoggedIn" @click="handleLoginLogout">Logout</li>
            <li v-else @click="openLogin">Login</li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
</template>

<style scoped>
.site-header {
  background-color: #f3f3f3;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.active-link {
  background-color: #d6d6d6;
  color: #000;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #eaeaea;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.user-name {
  font-weight: 600;
  color: #444;
}

.avatar-icon {
  font-size: 1.2rem;
}

.dropdown-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  border-radius: 6px;
  top: 2.5rem; /* adjust depending on avatar position */
  right: 0;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-list li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-list li:hover {
  background-color: #f5f5f5;
}

.avatar-icon {
  position: relative;
  cursor: pointer;
}
</style>
