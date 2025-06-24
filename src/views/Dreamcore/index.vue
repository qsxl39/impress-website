<template>
  <div class="dreamcore-theme">
    <AppHeader theme-class="dreamcore-theme" />
    <main class="dreamcore-container">
      <div class="hero">
        <div class="hero-content">
          <h1>梦核</h1>
          <p>潜入潜意识的边缘</p>
        </div>
      </div>
      <div class="content-section">
        <div class="post-grid">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <img :src="getImageUrl(post.image)" :alt="post.title" />
            <h3>{{ post.title }}</h3>
            <p class="meta">{{ post.author }} · {{ post.date }}</p>
            <p>{{ post.excerpt }}</p>
            <button @click="viewPost(post)">探索深渊</button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter theme-class="dreamcore-theme" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { posts, type Post } from '../../data/posts'
import './styles/dreamcore.css'
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
.dreamcore {
  padding: 20px;
}
</style>
