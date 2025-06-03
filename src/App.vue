<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const navItems = ref([
  { name: '复古未来', path: '/retro-future' },
  { name: '花野异梦', path: '/dreamcore' },
  { name: '海上轨道', path: '/railway' },
  { name: '复古未来', path: '/escape-reality' },
])

const showMobileMenu = ref(false)

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function closeMobileMenu() {
  showMobileMenu.value = false
}
</script>

<template>
  <div class="retro-future-container">
    <div class="crt-overlay"></div>

    <header>
      <div class="header-content">
        <div class="logo">RetroFuture</div>
        <nav class="desktop-nav">
          <ul>
            <li v-for="item in navItems" :key="item.path">
              <RouterLink :to="item.path">{{ item.name }}</RouterLink>
            </li>
          </ul>
        </nav>
        <button class="mobile-menu-button" @click="toggleMobileMenu">
          <span>☰</span>
          <!-- Basic hamburger icon -->
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

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 致敬我们未曾到来的将来</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

@font-face {
  font-family: 'WenQuanDengKuan';
  src: url('https://cdn.jsdelivr.net/npm/wenquanyi-dengxian-ttf@1.0.0/WenQuanDengKuan.ttf');
}

:root {
  --color-bg: #1c1c1c;
  --color-text: #e8e8d5;
  --color-primary: #ffd700;
  --color-secondary: #e67e22;
  --color-accent: #8b4513;
  --font-main: 'WenQuanDengKuan', monospace;
  --font-mono: 'WenQuanDengKuan', monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'WenQuanDengKuan', monospace !important;
  line-height: 2;
  overflow-x: hidden;
  font-size: 16px;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.retro-header {
  background-color: rgba(28, 28, 28, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.logo-container {
  display: flex;
  align-items: center;
}

.retro-logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-primary);
  text-shadow: 3px 3px 0px rgba(139, 69, 19, 0.5);
  letter-spacing: 2px;
  font-family: var(--font-main);
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  font-family: var(--font-main);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
  box-shadow: 0 0 8px var(--color-primary);
}

.router-link-active {
  color: var(--color-primary) !important;
}

.router-link-active::after {
  width: 100%;
  box-shadow: 0 0 8px var(--color-primary);
}

.retro-footer {
  margin-top: auto;
  padding: 2rem;
  text-align: center;
  background-color: rgba(28, 28, 28, 0.9);
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: rgba(232, 232, 213, 0.7);
}

/* Styles specific to App.vue layout */
header {
  /* Global styles in style.css */
  position: sticky; /* Make header sticky */
  top: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-main);
  font-size: 1.2rem;
  color: var(--primary-color);
}

/* Desktop Nav is styled globally, hide mobile button */
.mobile-menu-button {
  display: none;
}
.mobile-nav {
  display: none; /* Hidden by default */
}

/* Responsive overrides for App.vue specifically */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-menu-button {
    display: block;
  }
  /* Mobile nav display is handled by v-if, global styles handle layout */
}

footer {
  /* Global styles in style.css */
}
</style>
