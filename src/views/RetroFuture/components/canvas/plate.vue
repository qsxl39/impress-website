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

// 核心引用和变量：移除自动旋转相关变量（isAutoRotating、watch监听）
const canvasRef = ref<HTMLCanvasElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let model: THREE.Object3D | null = null
let animationId: number

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
  renderer.shadowMap.enabled = true

  // 3. 保留基础灯光系统（确保盘子模型有立体感）
  scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 6))
  const pointLight = new THREE.PointLight(0xffffff, 80)
  pointLight.position.set(0, 0, 0)
  pointLight.castShadow = false
  scene.add(pointLight)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(-20, 50, 10)
  spotLight.angle = 0.12
  spotLight.penumbra = 1
  spotLight.castShadow = true
  spotLight.shadow.mapSize.set(1024, 1024)
  scene.add(spotLight)

  // 4. 控制器配置：开启手动拖拽旋转（核心修改点）
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = true // 允许平移（可选：根据需求决定是否保留）
  controls.enableRotate = true // 开启手动旋转（核心：支持鼠标拖拽旋转）
  controls.enableZoom = true // 允许缩放（可选：方便查看盘子细节）
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
      model.scale.set(3, 3, 3) // 优化：适合盘子模型的缩放比例（根据实际模型尺寸调整）

      // 模型居中逻辑（保留：确保盘子在场景中心，拖拽旋转更自然）
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.set(-center.x, -center.y, -center.z)

      // 控制器围绕盘子中心旋转（核心：确保拖拽时以盘子为中心）
      controls.target.copy(center)
      controls.update()

      model.rotation.set(0, 0, 0) // 盘子初始角度（重置为正方向，可按需调整）
      scene.add(model)
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
  // 移除：canvas 点击切换自转的事件监听（与手动拖拽逻辑冲突）
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationId)
  controls.dispose()
  renderer.dispose()
  // 移除：canvas 点击事件的解绑（已在 onMounted 中删除绑定，此处同步清理）
})
</script>

<style scoped>
/* 1. 类名同步修改为 plate，语义化适配盘子组件 */
.plate-canvas-container {
  width: 100px;
  height: 100px;
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
    width: 250px;
    height: 250px;
  }
}
</style>
