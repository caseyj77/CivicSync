<script setup>
import SectionTemplate from '@/components/HomeViewComponents/SectionTemplate.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
</script>

<template>
  <!-- Hero Section (Layout A) -->
  <SectionTemplate layout="a" background="var(--color-accent)">
    <template #title>Build Your Belief System</template>
    <template #subtitle>
      CivicSync helps you reflect, map, and grow your political thinking — without partisan noise.
    </template>
    <template #action>
      <BaseButton variant="primary">Get Started</BaseButton>
    </template>
  </SectionTemplate>

  <!-- Features (Layout B) -->
  <SectionTemplate layout="b" >
    <template #title>Features of CivicSync</template>
    <template #subtitle>
      Explore journaling, mind maps, and curated resources to better understand your civic values and how they connect.
    </template>
    
  </SectionTemplate>

  <!-- Journal (Layout A) -->
  <SectionTemplate layout="a" background="var(--color-accent)">
    <template #title>Journal Your Journey</template>
    <template #subtitle>
      Reflect on your experiences, beliefs, and personal growth over time in a private, structured space.
    </template>
    <template #action>
      <BaseButton variant="primary">Start Journaling</BaseButton>
    </template>
  </SectionTemplate>

  <!-- Mind Map (Layout B) -->
  <SectionTemplate layout="b">
    <template #title>Mind Map Your Beliefs</template>
    <template #subtitle>
      Visually explore how your values connect across different issues and political ideas.
    </template>
    <template #action>
      <BaseButton variant="primary">Launch Map Tool</BaseButton>
    </template>
  </SectionTemplate>
</template>

<style scoped>
/* Add spacing or transitions later if needed */
</style>
