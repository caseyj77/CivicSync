<script setup>
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}
</style>
