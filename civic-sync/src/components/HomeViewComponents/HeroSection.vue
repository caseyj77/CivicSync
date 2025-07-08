<script setup >
import BaseButton from '../UI/BaseButton.vue';


</script>

<template>
 <section class="hero-section">
    <div class="hero-content">
        <h1 class="hero-title"> Build Your Belief System</h1>
        <p class="hero-subtitle">
            CivicSync helps you reflect, map, and grow your political thinking - without partisan noise.
        </p>
        <RouterLink to ='/signup'>
            <BaseButton variant="primary">Get Started</BaseButton>
        </RouterLink>
    </div>
 </section>

</template>

<style scoped>
.hero-section {
  padding: var(--space-xl);
  background-color: var(--color-background);
  color: var(--color-text);
  text-align: center;
}
.hero-title {
  font-size: var(--font-xxl);
  margin-bottom: var(--space-md);
}
.hero-subtitle {
  font-size: var(--font-lg);
  margin-bottom: var(--space-lg);
}
</style>