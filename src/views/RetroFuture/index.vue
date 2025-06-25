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
            A personal chronicle of space exploration and the beautiful contradiction of
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
.retro-future-theme {
  /* 基础变量 */
  --primary-color: #f4d03f; /* Bright yellow */
  --secondary-color: #16a085; /* Teal */
  --text-color: #e0e0e0; /* Light grey */
  --background-color: #0a1128; /* Deep blue */
  --panel-color: rgba(10, 17, 40, 0.85); /* Semi-transparent deep blue */
  --border-color: #2c3e50; /* Darker blue/grey */
  --accent-color: #e74c3c; /* Red */
  --glow-color: rgba(0, 191, 255, 0.7); /* Cyan glow */
  --font-mono: 'Space Mono', monospace;
  --font-display: 'VT323', monospace;
}
.hero-content {
  max-width: none !important;
}
.hero-content h1 {
  font-family: var(--font-display);
  font-size: 3.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 0 10px rgba(244, 208, 63, 0.7);
}


.hero-content p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
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
  top: 50px;
  right: 80px;
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle at 30% 30%,
    #fff 0%,
    #f5f5f5 20%,
    #e0e0e0 40%,
    #d0d0d0 60%,
    #c0c0c0 80%,
    #a0a0a0 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.4);
  z-index: 1;
}

.retro-future-theme .hero-content {
  text-align: center;
  z-index: 2;
  padding: 2.5rem 3rem;
  border-radius: 2px;
  border: 2px solid var(--primary-color);
  display: inline-block;
}
</style>
