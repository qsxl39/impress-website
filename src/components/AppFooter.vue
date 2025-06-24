<template>
  <footer :class="themeClass">
    <p>&copy; 2024 Your Blog Name. All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
defineProps({
  themeClass: String,
})
</script>

<style scoped>
footer {
  padding: 2rem;
  text-align: center;
  background-color: var(--panel-color, rgba(10, 17, 40, 0.9));
  border-top: 1px solid var(--border-color, rgba(44, 62, 80, 0.5));
  margin-top: auto;
  font-size: 0.9rem;
  font-family: var(--font-mono, monospace);
  color: var(--text-color, #e0e0e0);
}
</style>
