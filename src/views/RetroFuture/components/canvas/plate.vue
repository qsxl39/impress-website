<template>
  <div class="plate-canvas-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

// 核心引用和变量：移除自动旋转相关变量（isAutoRotating、watch监听）
const canvasRef = ref<HTMLCanvasElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let model: THREE.Object3D | null = null
let animationId: number
let plateGroup: THREE.Group | null = null
let isDragging = false
let lastAngle = 0
const angleSensitivity = 1.0 // 角度灵敏度，1.0为等比，<1更慢，>1更快

// 响应式尺寸处理：保留窗口适配逻辑
const isMobile = ref(window.innerWidth <= 500)

// 初始化Three.js场景：调整控制器配置为“支持手动拖拽”
function initScene() {
  if (!canvasRef.value) return

  // 1. 创建基础场景元素（保留原逻辑，确保场景基建可用）
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(25, getAspectRatio(), 0.1, 1000)
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  })

  // 2. 配置相机和渲染器（可根据盘子模型尺寸微调相机位置）
  camera.position.set(15, 5, 8) // 优化：更适合盘子模型的初始视角（可按需调整）
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  renderer.shadowMap.enabled = false
  ;(renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.6

  // 3. Newsfeed查看器风格：基于环境贴图（IBL）的室内均匀光照
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  // scene.background = new THREE.Color(0xedeff2) // 中性浅灰背景

  // 4. 控制器配置：开启手动拖拽旋转（核心修改点）
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false // 禁止平移
  controls.enableRotate = false // 禁用OrbitControls自带旋转，改为自定义仅绕Z轴旋转
  controls.enableZoom = false // 禁用缩放
  controls.enableDamping = true // 开启阻尼（优化拖拽手感：旋转后有惯性减速）
  controls.dampingFactor = 0.05 // 阻尼系数（值越小惯性越弱，可按需调整）
  controls.autoRotate = false // 彻底关闭自动旋转（与手动拖拽冲突）
  controls.minDistance = 5 // 限制最小缩放距离（避免过度靠近模型）
  controls.maxDistance = 30 // 限制最大缩放距离（避免看不到模型）

  // 5. 加载盘子模型（替换原月球模型路径，调整缩放适配盘子尺寸）
  new GLTFLoader().load(
    '/plate/scene.gltf', // 注意：替换为你的盘子模型实际路径（需放在public目录下）
    (gltf) => {
      model = gltf.scene
      model.scale.set(0.2, 0.2, 0.2) // 缩小盘子

      // 将模型移动到原点（以模型自身中心为参考）
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)

      // 可选：提升环境光对材质的影响（如果偏暗可提高此值）
      model.traverse((obj: any) => {
        if (obj.isMesh && obj.material && 'envMapIntensity' in obj.material) {
          obj.material.envMapIntensity = 1.0
        }
      })

      // 使用父级分组以便整体旋转到正面朝屏幕
      plateGroup = new THREE.Group()
      plateGroup.add(model)
      scene.add(plateGroup)

      // 让盘面法线朝向 +Z（面向屏幕）
      plateGroup.rotation.set(Math.PI / 2, 0, 0)

      // 重新计算大小，调整相机距离以完整显示
      const groupBox = new THREE.Box3().setFromObject(plateGroup)
      const size = groupBox.getSize(new THREE.Vector3())
      const maxSize = Math.max(size.x, size.y, size.z)

      // 下移盘子：让其中心靠近屏幕下方，使下半部分更接近底部
      plateGroup.position.set(0, -maxSize * 0.51, 0)

      camera.position.set(0, 0, maxSize * 1.1) // 调远相机，整体更小
      controls.target.set(0, 0, 0)
      controls.update()
    },
    undefined,
    () => console.error('盘子模型加载失败') // 错误提示同步修改为“盘子”
  )

  // 6. 启动动画循环（保留：确保控制器和渲染实时更新）
  animate()
}

// 动画循环：移除自动旋转相关依赖，仅保留基础渲染更新
function animate() {
  animationId = requestAnimationFrame(animate)
  controls.update() // 阻尼效果和手动拖拽需依赖此更新（必须保留）
  renderer.render(scene, camera)
}

function getPointerAngle(e: PointerEvent) {
  if (!canvasRef.value) return 0
  const rect = canvasRef.value.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  // 屏幕坐标到相对中心的向量
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  return Math.atan2(dy, dx)
}

function normalizeDelta(delta: number) {
  // 归一化到 [-PI, PI]，避免跨越边界时跳变
  if (delta > Math.PI) delta -= Math.PI * 2
  if (delta < -Math.PI) delta += Math.PI * 2
  return delta
}

function onPointerDown(e: PointerEvent) {
  if (!renderer) return
  isDragging = true
  lastAngle = getPointerAngle(e)
  renderer.domElement.setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging || !plateGroup) return
  const current = getPointerAngle(e)
  let delta = normalizeDelta(current - lastAngle)
  lastAngle = current
  // 围绕世界Z轴旋转（垂直于盘面法线），根据指针极角增量转动
  const worldZ = new THREE.Vector3(0, 0, 1)
  plateGroup.rotateOnWorldAxis(worldZ, -delta * angleSensitivity)
}

function onPointerUp(e: PointerEvent) {
  if (!renderer) return
  isDragging = false
  try {
    renderer.domElement.releasePointerCapture?.(e.pointerId)
  } catch {}
}

// 计算宽高比（保留：确保窗口 resize 时相机比例正确）
function getAspectRatio() {
  if (!canvasRef.value) return 1
  return canvasRef.value.clientWidth / canvasRef.value.clientHeight
}

// 响应窗口大小变化（保留：确保移动端/桌面端适配）
function handleResize() {
  isMobile.value = window.innerWidth <= 500
  if (!canvasRef.value) return

  camera.aspect = getAspectRatio()
  camera.updateProjectionMatrix()
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
}

// 生命周期管理：移除自动旋转相关事件（点击切换自转）
onMounted(() => {
  initScene()
  window.addEventListener('resize', handleResize)
  // 注册pointer事件（仅盘子Z轴旋转）
  if (canvasRef.value) {
    const el = canvasRef.value
    el.style.touchAction = 'none'
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    window.addEventListener('pointerleave', onPointerUp)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationId)
  controls.dispose()
  renderer.dispose()
  if (canvasRef.value) {
    const el = canvasRef.value
    el.removeEventListener('pointerdown', onPointerDown)
    el.removeEventListener('pointermove', onPointerMove)
  }
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointercancel', onPointerUp)
  window.removeEventListener('pointerleave', onPointerUp)
})
</script>

<style scoped>
/* 1. 类名同步修改为 plate，语义化适配盘子组件 */
.plate-canvas-container {
  width: 90%;
  height: 90%;
  background: transparent;
  position: relative;
}

.plate-canvas-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

/* 2. 移动端尺寸适配（保留原逻辑，可根据盘子展示需求调整尺寸） */
@media (max-width: 500px) {
  .plate-canvas-container {
    width: 100%;
    height: 100%;
  }
}
</style>
