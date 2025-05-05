<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts, type Post } from '../../../data/posts' // Use relative path

const route = useRoute()
const postId = computed(() => Number(route.params.id))

const selectedPost = computed<Post | undefined>(() => {
  return posts.find((p) => p.id === postId.value)
})

// Function to resolve image paths
const getImageUrl = (imgPath: string) => {
  return imgPath.replace('./', '/')
}
</script>

<template>
  <section v-if="selectedPost" class="post-page">
    <img
      :src="getImageUrl(selectedPost.image)"
      :alt="selectedPost.title"
      style="width: 100%; max-height: 300px; object-fit: cover; margin-bottom: 1.5rem"
    />
    <h2>{{ selectedPost.title }}</h2>
    <p class="meta">By {{ selectedPost.author }} on {{ selectedPost.date }}</p>
    <div class="post-content">
      <p>{{ selectedPost.content }}</p>
    </div>
    <div class="tags" v-if="selectedPost.tags?.length">
      Tags: <span v-for="tag in selectedPost.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
    <router-link to="/">Back to Home</router-link>
  </section>
  <section v-else class="post-page">
    <p>Post not found.</p>
    <router-link to="/">Back to Home</router-link>
  </section>
</template>

<style scoped>
.post-page {
  /* Styles moved to global style.css */
}
.meta {
  font-size: 0.9rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
}
.post-content {
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.tags {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.tag {
  display: inline-block;
  background-color: var(--secondary-color);
  color: var(--background-color);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin-right: 0.5rem;
  font-size: 0.8rem;
}

a {
  color: var(--primary-color);
}
a:hover {
  color: var(--accent-color);
}
</style>
