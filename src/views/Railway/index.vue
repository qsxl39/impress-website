<template>
  <div class="railway-theme">
    <AppHeader theme-class="railway-theme" />
    <main class="railway-container">
      <div class="hero">
        <div class="gear gear-top-left"></div>
        <div class.bind="gear gear-top-right"></div>
        <div class="hero-content">
          <h1>铁道纪元</h1>
          <p>蒸汽与钢铁的交响曲</p>
        </div>
        <div class="gear gear-bottom-left"></div>
        <div class="gear gear-bottom-right"></div>
      </div>
      <div class="content-section">
        <div class="post-grid">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <img :src="getImageUrl(post.image)" :alt="post.title" />
            <h3>{{ post.title }}</h3>
            <p class="meta">{{ post.author }} · {{ post.date }}</p>
            <p>{{ post.excerpt }}</p>
            <button @click="viewPost(post)">登上列车</button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter theme-class="railway-theme" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { posts } from '../RetroFuture/data/posts.js'
import type { Post } from '../RetroFuture/data/posts.d.ts'
import './styles/railway.css'
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
.railway {
  padding: 20px;
}
</style>
