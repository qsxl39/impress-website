<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { posts, type Post } from '../data/posts' // Use relative path

const router = useRouter()

function viewPost(post: Post) {
  router.push({ name: 'post', params: { id: post.id } })
}

// Function to resolve image paths assuming they are in public/assets/images/
// Vite handles public assets relative to the root.
const getImageUrl = (imgPath: string) => {
  // Expects imgPath like './assets/images/post1.jpg'
  // Needs to be relative to the public folder, e.g., /assets/images/post1.jpg
  return imgPath.replace('./', '/')
}
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="moon"></div>
      <!-- Assuming moon is styled via CSS -->
      <div class="hero-content">
        <h1>Chronicles from the Retro-Future</h1>
        <p>Exploring yesterday's tomorrows, today.</p>
      </div>
    </div>

    <!-- Apply gradient background potentially here or on a wrapper -->
    <div class="content-background-gradient">
      <h2>Latest Transmissions</h2>
      <div class="blog-posts">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <img
            :src="getImageUrl(post.image)"
            :alt="post.title"
            style="width: 100%; height: 150px; object-fit: cover"
          />
          <h3>{{ post.title }}</h3>
          <p class="meta">By {{ post.author }} on {{ post.date }}</p>
          <p>{{ post.excerpt }}</p>
          <button @click="viewPost(post)">Read Transmission</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add component-specific styles if needed */
.hero {
  /* Styles moved to global style.css, but can override here */
}

.blog-posts {
  /* Styles moved to global style.css, but can override here */
}

.post-card img {
  margin-bottom: 1rem;
  border-radius: 2px;
}
</style>
