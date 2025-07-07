<script setup>
import { RouterLink } from 'vue-router'

// Placeholder for future DB-loaded user name
const userName = 'Casey';
</script>

<template>
  <header class="site-header">
    <nav class="nav-container">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" exact-active-class="active-link">Home</RouterLink>
        <RouterLink to="/journal" class="nav-link" exact-active-class="active-link">Journal</RouterLink>
        <RouterLink to="/mindmap" class="nav-link" exact-active-class="active-link">Mind Map</RouterLink>
        <RouterLink to="/resources" class="nav-link" exact-active-class="active-link">Resources</RouterLink>
      </div>

      <!-- User Card -->
      <div class="user-card">
        <span class="user-name">{{ userName }}</span>
        <div class="avatar-icon">👤</div>
      </div>
    </nav>
  </header>
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
</style>
