<script setup lang="ts">
// Author data could be imported or defined here
const author = {
  name: 'Commander Alex Novak',
  bio: 'Space explorer, vintage technology enthusiast, and chronicler of the retro-future. Commander Novak has piloted vessels through nebulae forgotten by time and debugged systems older than most planets. When not charting the unknown, he tinkers with salvaged analog synths and documents the peculiar intersection of past dreams and future realities.',
  avatar: '/assets/images/author-avatar.jpg', // Assuming avatar is in public/assets/images/
}
</script>

<template>
  <section class="about-page">
    <h2>About the Chronicler</h2>
    <div class="author-info">
      <img :src="author.avatar" :alt="author.name" class="avatar" />
      <h3>{{ author.name }}</h3>
      <p>{{ author.bio }}</p>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  /* Styles moved to global style.css */
  text-align: center;
}
.author-info {
  margin-top: 2rem;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  margin-bottom: 1rem;
}
h3 {
  color: var(--secondary-color);
  font-family: var(--font-display);
  font-size: 1.8rem;
}
p {
  line-height: 1.6;
  max-width: 600px;
  margin: 1rem auto 0;
}
</style>
