<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="page-fade" mode="out-in">
      <div :key="route.name" class="component-wrapper">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>

<style>
/* 页面切换动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 确保在切换时布局稳定 */
.component-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
