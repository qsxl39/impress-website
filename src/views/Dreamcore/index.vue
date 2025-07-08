<template>
  <div class="dreamcore-theme">
    <AppHeader theme-class="dreamcore-theme" />
    <main class="dreamcore-container">
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
