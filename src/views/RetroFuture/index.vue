<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { posts, type Post } from '../../data/posts'

const router = useRouter()

function viewPost(post: Post) {
  router.push({ name: 'post', params: { id: post.id } })
}

const getImageUrl = (imgPath: string) => {
  return imgPath.replace('./', '/')
}
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="moon"></div>
      <div class="hero-content">
        <h1>RETROSPEKTA ESTONTO</h1>
        <p>"Omaĝo al ĉiuj neniam venontaj estontecoj"</p>
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
