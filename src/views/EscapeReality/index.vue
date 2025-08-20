<template>
  <div class="escape-reality-theme">
    <AppHeader theme-class="escape-reality-theme" />
    <main class="escape-reality-container">
      <div class="hero">
        <div class="hero-content">
          <h1>逃离现实</h1>
          <p>在虚拟与幻想中寻找慰藉</p>
        </div>
      </div>
      <div class="content-section">
        <div class="post-grid">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <img :src="getImageUrl(post.image)" :alt="post.title" />
            <h3>{{ post.title }}</h3>
            <p class="meta">{{ post.author }} · {{ post.date }}</p>
            <p>{{ post.excerpt }}</p>
            <button @click="viewPost(post)">开始旅程</button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter theme-class="escape-reality-theme" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { posts } from '../RetroFuture/data/posts.js'
import type { Post } from '../RetroFuture/data/posts.d.ts'
import './styles/escape-reality.css'
import AppHeader from '../../components/AppHeader.vue'
import AppFooter from '../../components/AppFooter.vue'

const router = useRouter()

function viewPost(post: Post) {
  router.push({ name: 'post', params: { id: post.id } })
}

const getImageUrl = (imgPath: string) => {
  return imgPath
}
</script>

<style scoped>
.escape-reality {
  padding: 20px;
}
</style>
