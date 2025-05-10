import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/RetroFuture/index.vue'),
    },
    {
      path: '/retro-future',
      name: 'retroFuture',
      component: () => import('../views/RetroFuture/index.vue'),
    },
    {
      path: '/escape-reality',
      name: 'escapeReality',
      component: () => import('../views/EscapeReality/index.vue'),
    },
    {
      path: '/railway',
      name: 'railway',
      component: () => import('../views/Railway/index.vue'),
    },
    {
      path: '/dreamcore',
      name: 'dreamcore',
      component: () => import('../views/Dreamcore/index.vue'),
    },
  ],
})

export default router
