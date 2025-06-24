<script setup lang="ts">
import { useRouter } from 'vue-router'
import { posts, type Post } from '../../data/posts'
import './styles/retro-future.css'
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

<template>
  <div class="retro-future-theme">
    <div class="crt-overlay"></div>
    <AppHeader theme-class="retro-future-theme" />
    <main class="retro-future-container">
      <div class="hero">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="moon"></div>
        <div class="hero-content">
          <h1>Exploring Tomorrow<br />With Yesterday's Tools</h1>
          <p>
            A personal chronicle of space exploration and the<br />beautiful contradiction of
            retro-futurism
          </p>
        </div>
      </div>
      <div class="content-background-gradient">
        <div class="blog-posts" style="margin-bottom: 500px">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <img
              :src="getImageUrl(post.image)"
              :alt="post.title"
              style="width: 100%; height: 150px; object-fit: cover"
            />
            <h3>{{ post.title }}</h3>
            <p class="meta">作者：{{ post.author }}　日期：{{ post.date }}</p>
            <p>{{ post.excerpt }}</p>
            <button @click="viewPost(post)">阅读全文</button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter theme-class="retro-future-theme" />
  </div>
</template>

<style scoped>
.hero-content h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 0.8rem;
}

h2 {
  font-size: 1.2rem;
  margin: 2rem 0;
}

.post-card h3 {
  font-size: 0.9rem;
  margin: 1rem 0;
}

.post-card p {
  font-size: 0.7rem;
  line-height: 1.8;
}

.post-card button {
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
}

.moon {
  position: absolute;
  margin-left: 3%;
  top: 30px;
  right: 40px;
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  border-radius: 50%;
  box-shadow: 0 0 20px #ffffff, inset 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
