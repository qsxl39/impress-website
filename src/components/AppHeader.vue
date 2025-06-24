<template>
  <header :class="themeClass">
    <div class="header-content">
      <div class="logo">Impress</div>
      <nav class="desktop-nav">
        <ul>
          <li v-for="item in navItems" :key="item.path">
            <RouterLink :to="item.path" active-class="active">{{ item.name }}</RouterLink>
          </li>
        </ul>
      </nav>
      <button class="mobile-menu-button" @click="toggleMobileMenu">
        <span>☰</span>
      </button>
    </div>
    <nav v-if="showMobileMenu" class="mobile-nav">
      <ul>
        <li v-for="item in navItems" :key="item.path">
          <RouterLink :to="item.path" @click="closeMobileMenu">{{ item.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  themeClass: String,
})

const navItems = ref([
  { name: 'RetroFuture', path: '/retro-future' },
  { name: 'Dreamcore', path: '/dreamcore' },
  { name: 'Railway', path: '/railway' },
  { name: 'EscapeReality', path: '/escape-reality' },
])

const showMobileMenu = ref(false)

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function closeMobileMenu() {
  showMobileMenu.value = false
}
</script>

<style scoped>
/* Scoped styles ensure these only apply within this component */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column; /* For mobile nav */
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
}

.logo {
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  text-shadow: 2px 2px 0px var(--border-color, #000);
  color: var(--primary-color, #fff);
}

.desktop-nav ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.desktop-nav a {
  font-family: var(--font-display, monospace);
  font-size: 1.2rem;
  color: var(--text-color, #fff);
  padding: 0.3rem 0;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
}

.desktop-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color, #fff);
  transition: width 0.3s ease;
}

.desktop-nav a:hover::after,
.desktop-nav a.active::after {
  width: 100%;
}

.desktop-nav a.active {
  color: var(--primary-color, #fff);
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  color: var(--primary-color, #fff);
  font-size: 2rem;
  cursor: pointer;
  z-index: 110;
}

.mobile-nav {
  display: none;
  width: 100%;
  background-color: var(--panel-color, rgba(0, 0, 0, 0.9));
}

.mobile-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  margin: 0;
  border-top: 1px solid var(--border-color, #333);
}

.mobile-nav li {
  text-align: center;
}

.mobile-nav a {
  display: block;
  padding: 1rem;
  color: var(--text-color, #fff);
  text-decoration: none;
  font-family: var(--font-display, monospace);
  font-size: 1.2rem;
  text-transform: uppercase;
}

.mobile-nav a:hover,
.mobile-nav a.active {
  color: var(--primary-color, #fff);
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-menu-button {
    display: block;
  }
  .mobile-nav {
    display: flex;
  }
}
</style>
