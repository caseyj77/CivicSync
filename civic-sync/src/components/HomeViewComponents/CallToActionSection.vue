<script setup>
import BaseButton from '../UI/BaseButton.vue';

</script>

<template>
    <section class="cta-section">
        <div class="cta-content">
            <h1 class="cta-title"> Lets Do This</h1>
            <p class="cta-subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore iure facere sint dolorum minima reiciendis maxime iusto, recusandae reprehenderit ex nam inventore corrupti. Soluta quam excepturi ab unde necessitatibus voluptates.
            </p>
            <BaseButton variant="primary">Create Your Account</BaseButton>
        </div>
    </section>
</template>
<style scoped>
.cta-section {
  padding: var(--space-xl);
  background-color: var(--color-background);
  color: var(--color-text);
  text-align: center;
}
.cta-title {
  font-size: var(--font-xxl);
  margin-bottom: var(--space-md);
}
.cta-subtitle {
  font-size: var(--font-lg);
  margin-bottom: var(--space-lg);
}
</style>