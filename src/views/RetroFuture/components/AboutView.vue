<script setup lang="ts">
// Author data could be imported or defined here
const author = {
  name: '指挥官 亚历克斯·诺瓦克',
  bio: '太空探索者、复古科技爱好者、复古未来编年史作者。诺瓦克指挥官驾驶飞船穿越过被时间遗忘的星云，调试过比大多数行星还要古老的系统。在不探索未知领域时，他喜欢摆弄回收的模拟合成器，记录过去梦想与未来现实之间奇特的交汇点。',
  avatar: '/assets/images/author-avatar.jpg', // Assuming avatar is in public/assets/images/
}
</script>

<template>
  <section class="about-page">
    <h2>关于作者</h2>
    <div class="author-info">
      <img :src="author.avatar" :alt="author.name" class="avatar" />
      <h3>{{ author.name }}</h3>
      <p>{{ author.bio }}</p>
    </div>
  </section>
</template>

<style scoped>
.about-page {
  text-align: center;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 2rem;
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
  font-family: var(--font-main);
  font-size: 1rem;
  margin: 1rem 0;
}

p {
  line-height: 1.8;
  max-width: 600px;
  margin: 1rem auto 0;
  font-size: 0.7rem;
}
</style>
