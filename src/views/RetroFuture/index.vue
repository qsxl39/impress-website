<template>
  <div class="retro-future-theme">
    <div class="crt-overlay"></div>
    <AppHeader theme-class="retro-future-theme" />
    <main class="retro-future-container">
      <div class="hero">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <!-- 模拟的月球，添加点击事件和响应式控制 -->
        <div
          class="moon"
          @click="handleMoonClick"
          v-show="showSimulatedMoon"
          :style="{ opacity: simulatedMoonOpacity }"
        ></div>
        <!-- 3D 月球组件，始终存在，默认被模拟月球覆盖或在下层 -->
        <div class="three-moon">
          <moonView :style="{ opacity: threeMoonOpacity }" />
        </div>
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

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { posts, type Post } from './data/posts'
import './styles/retro-future.css'
import AppHeader from '../../components/AppHeader.vue'
import AppFooter from '../../components/AppFooter.vue'
import moonView from './components/canvas/moon.vue'
import { ref } from 'vue'
// 控制模拟月球是否显示（点击后隐藏）
const showSimulatedMoon = ref(true)
// 模拟月球的透明度（用于渐变消失效果）
const simulatedMoonOpacity = ref(1)
// 3D 月球的透明度（渐变显示）
const threeMoonOpacity = ref(0)

const handleMoonClick = () => {
  // 渐变步数（控制动画速度）
  let step = 0
  const totalSteps = 50 // 总步数，越大越慢

  const fadeInterval = setInterval(() => {
    if (step < totalSteps) {
      // 模拟月球：每步降低 1/totalSteps
      simulatedMoonOpacity.value -= 1 / totalSteps
      // 3D 月球：每步提升 1/totalSteps
      threeMoonOpacity.value += 1 / totalSteps
      step++
    } else {
      showSimulatedMoon.value = false // 隐藏模拟月球
      clearInterval(fadeInterval)
    }
  }, 20) // 每 20ms 执行一次，可调整速度
}

const router = useRouter()

function viewPost(post: Post) {
  router.push({ name: 'post', params: { id: post.id } })
}

const getImageUrl = (imgPath: string) => {
  return imgPath
}
</script>
<style scoped>
/* 原有样式保持不变 */
.moon {
  /* 原有样式... */
  cursor: pointer; /* 添加鼠标指针，提示可点击 */
  transition: opacity 0.3s ease; /* 配合渐变效果 */
}
.three-moon {
  position: absolute;
  margin-left: 3%;
  top: 80px;
  right: 80px;
  width: 100px;
  height: 100px;
  /* 确保 3D 月球默认在模拟月球下层，可根据实际调整层级 */
  z-index: 0;
}
/* ---------------------
  主题基础变量定义
   --------------------- */
.retro-future-theme {
  /* 色彩变量 */
  --primary-color: #f4d03f; /* 主色调：亮黄色 */
  --secondary-color: #16a085; /* 辅助色：蓝绿色 */
  --text-color: #e0e0e0; /* 文本色：浅灰色 */
  --background-color: #0a1128; /* 背景色：深蓝色 */
  --panel-color: rgba(10, 17, 40, 0.85); /* 面板色：半透明深蓝色 */
  --border-color: #2c3e50; /* 边框色：深灰蓝色 */
  --accent-color: #e74c3c; /* 强调色：红色 */
  --glow-color: rgba(0, 191, 255, 0.7); /* 发光色：青色光晕 */

  /* 字体变量 */
  --font-mono: 'Space Mono', monospace; /* 等宽字体 */
  --font-display: 'VT323', monospace; /* 显示字体 */
}

/* ---------------------
   英雄区域整体样式
   --------------------- */
.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #000103; /* 确保星星背景为深色 */
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  background-color: rgba(10, 17, 40, 0.7);
  padding: 2rem 3rem;
  max-width: 600px;
  font-family: var(--font-display);
}

.retro-future-theme .hero-content {
  text-align: center;
  z-index: 2;
  padding: 2.5rem 3rem;
  border-radius: 2px;
  border: 2px solid var(--primary-color);
  display: inline-block;
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
  font-family: var(--font-mono);
  color: var(--text-color);
  letter-spacing: 1px;
  line-height: 1.5;
}

.hero-content p:first-of-type {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.hero-content p:last-of-type {
  font-size: 1rem;
  margin-top: 0.5rem;
}

/* ---------------------
   星空背景效果
   --------------------- */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 1;
  animation: twinkle-stars 4s ease-in-out infinite;
  background-color: #000103; /* 与hero背景色保持一致 */
}

.twinkling {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  animation: move-twink-back 200s linear infinite;
}

/* 星空动画定义 */
@keyframes twinkle-stars {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

.moon {
  position: absolute;
  margin-left: 3%;
  top: 80px;
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
  z-index: 12; /* 大幅提高层级，确保在星空、内容区等之上 */
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.three-moon {
  position: absolute;
  margin-left: 3%;
  top: 80px;
  right: 80px;
  width: 100px;
  height: 100px;
  /* 3D 月球容器的 z-index 比模拟月球稍高或相同，根据需求调整 */
  z-index: 11;
}
/* ---------------------
   内容区渐变背景
   --------------------- */
.content-background-gradient {
  position: relative;
  background: linear-gradient(
    to bottom,
    #000103 5%,
    #0a1636 15%,
    #0c1a3d 20%,
    #1a3a6c 35%,
    #7c5e9b 55%,
    #e06377 75%,
    #f9ad6a 90%,
    #f4d03f 95%,
    #fefc2d 100%
  );
  background-size: 100% 100%;
  padding: 4rem 2rem;
}

/* ---------------------
   博客文章列表样式
   --------------------- */
.blog-posts {
  position: relative;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-size: 100% 100%;
  margin-bottom: 500px;
}

.post-card {
  background: rgba(10, 17, 40, 0.7);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(244, 208, 63, 0.2);
}

.post-card h3 {
  color: var(--primary-color);
  font-family: var(--font-display);
  margin-top: 0;
  font-size: 0.9rem;
  margin: 1rem 0;
}

.post-card .meta {
  font-size: 0.8rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.post-card p {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.post-card p:last-of-type {
  font-size: 0.7rem;
  line-height: 1.8;
}

.post-card button {
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: var(--font-mono);
  border-radius: 2px;
  transition: background-color 0.3s ease;
  font-size: 0.7rem;
}

.post-card button:hover {
  background: var(--accent-color);
  color: var(--text-color);
}
</style>
