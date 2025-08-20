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
      <div class="wapper" ref="scrollWrapperRef">
        <div class="blog-posts-container">
          <div class="blog-posts" ref="scrollContentRef">
            <div v-for="post in posts" :key="post.id" class="post-card">
              <img
                :src="getImageUrl(post.image)"
                :alt="post.title"
                class="post-image"
                style="
                  width: 1000px;
                  height: 500px;
                  object-fit: cover;
                  display: block; /* 转为块级元素，独占一行，消除基线空白 */
                "
              />
            </div>
          </div>
        </div>
        <div class="three-plate">
          <plateView />
        </div>
      </div>
    </main>
    <AppFooter theme-class="retro-future-theme" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { posts } from './data/posts.js'
import type { Post } from './data/posts.d.ts'
import './styles/retro-future.css'
import AppHeader from '../../components/AppHeader.vue'
import AppFooter from '../../components/AppFooter.vue'
import moonView from './components/canvas/moon.vue'
import plateView from './components/canvas/plate.vue'
import { ref } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// 控制模拟月球是否显示（点击后隐藏）
const showSimulatedMoon = ref(true)
// 模拟月球的透明度（用于渐变消失效果）
const simulatedMoonOpacity = ref(1)
// 3D 月球的透明度（渐变显示）
const threeMoonOpacity = ref(0)

//创建点击音效
const clickSound = new Audio('/sounds/bellding.mp3') // 替换为你的音效文件

const handleMoonClick = () => {
  // 渐变步数（控制动画速度）
  let step = 0
  const totalSteps = 50 // 总步数，越大越慢

  // 播放点击音效
  clickSound.play().catch((err) => {
    console.error('音效播放失败:', err) // 新增这行，查看具体错误
  })
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

//横向滑动
// 横向滚动相关
const scrollWrapperRef = ref<HTMLElement | null>(null)
const scrollContentRef = ref<HTMLElement | null>(null)

// 初始化横向滚动
const initHorizontalScroll = () => {
  const wrapper = scrollWrapperRef.value
  const content = scrollContentRef.value

  if (!wrapper || !content) {
    console.log('DOM elements not found')
    return
  }

  console.log('Found DOM elements:', { wrapper, content })

  // 确保GSAP插件已注册
  gsap.registerPlugin(ScrollTrigger)

  // 等待DOM完全渲染
  setTimeout(() => {
    // 计算滚动距离
    const contentWidth = content.scrollWidth
    const wrapperWidth = wrapper.clientWidth
    const distance = contentWidth - wrapperWidth

    console.log('Dimensions:', {
      contentWidth,
      wrapperWidth,
      distance,
      windowHeight: window.innerHeight,
    })

    if (distance <= 0) {
      console.log('No horizontal scroll needed')
      return
    }

    // 设置足够的高度触发垂直滚动
    const wrapperHeight = distance + window.innerHeight * 2
    wrapper.style.height = `${wrapperHeight}px`
    console.log('Set wrapper height to:', wrapperHeight)

    // 清理可能存在的旧实例
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // 创建滚动触发器
    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: `+=${distance}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const translateX = -progress * distance
        console.log('Scroll progress:', progress, 'TranslateX:', translateX)

        // 添加平滑过渡
        gsap.to(content, {
          x: translateX,
          duration: 0.1,
          ease: 'none',
        })
      },
    })

    console.log('ScrollTrigger created:', trigger)
  }, 100)
}

onMounted(() => {
  console.log('Component mounted, initializing horizontal scroll...')

  // 测试GSAP是否正常工作
  console.log('GSAP version:', gsap.version)

  // 确保GSAP插件已注册
  gsap.registerPlugin(ScrollTrigger)
  console.log('GSAP ScrollTrigger registered')

  // 简单的GSAP测试
  const testElement = scrollContentRef.value
  if (testElement) {
    gsap.to(testElement, {
      x: 100,
      duration: 2,
      ease: 'power2.out',
      onComplete: () => {
        console.log('GSAP test animation completed')
        gsap.to(testElement, { x: 0, duration: 1 })
      },
    })
  }

  // 添加延迟确保DOM完全渲染
  setTimeout(() => {
    console.log('Starting horizontal scroll initialization...')
    initHorizontalScroll()
  }, 1000)

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    console.log('Window resized, reinitializing...')
    setTimeout(initHorizontalScroll, 100)
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  window.removeEventListener('resize', initHorizontalScroll)
})
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
.wapper {
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
  /* 初始高度，会被JS动态调整 */
  min-height: 100vh;
}

/* ---------------------
  博客文章列表样式 - 横向滚动
   --------------------- */
.blog-posts-container {
  position: sticky;
  top: 150px;
  padding: 4rem 0;
  margin-bottom: 900px;
  /* 隐藏滚动条但保持功能 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  /* 平滑滚动效果 */
  scroll-behavior: smooth;
  /* 添加一些内边距确保内容不被遮挡 */
  padding-left: 2rem;
  padding-right: 2rem;
  /* 确保容器有足够的宽度 */
  width: 100%;
  overflow: hidden;
}

.blog-posts-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.blog-posts {
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  min-width: max-content;
  /* 确保内容可以横向滚动 */
  width: max-content;
  /* 确保transform正常工作 */
  will-change: transform;
  transform: translateX(0);
}

.post-card {
  background: rgba(10, 17, 40, 0.7);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* 横向布局的卡片样式 */
  min-width: 350px;
  flex-shrink: 0;
  overflow: hidden;
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

/* 图片样式 */
.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

/* 内容区域样式 */
.post-content {
  padding: 1.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-posts-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .post-card {
    min-width: 280px;
    max-width: 320px;
  }

  .post-content {
    padding: 1rem;
  }

  .post-content h3 {
    font-size: 1.1rem;
  }

  .post-content p {
    font-size: 0.85rem;
  }
}

/* 3D 板块定位样式 */
.three-plate {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* 使用视口高度，确保有足够空间显示整个盘子 */
  z-index: 1000; /* 确保在最上层 */
  pointer-events: auto; /* 允许与3D画布交互 */
}

/* 调整底栏样式，确保与3D板块配合 */
.retro-future-theme footer {
  position: relative;
  z-index: 999; /* 比3D板块稍低 */
}

/* 确保3D盘子容器能够自适应 */
.three-plate .plate-canvas-container {
  width: 100% !important;
  height: 100% !important;
  position: relative;
}

.three-plate .plate-canvas-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
