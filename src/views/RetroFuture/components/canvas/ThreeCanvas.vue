<template>
  <div ref="threeContainer" class="three-canvas-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeContainer = ref<HTMLElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let animationId: number | null = null
let model: THREE.Object3D | null = null

const isMobile = ref(false)

function handleResize() {
  if (!threeContainer.value || !camera || !renderer) return
  camera.aspect = threeContainer.value.clientWidth / threeContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
}

function detectMobile() {
  isMobile.value = window.matchMedia('(max-width: 500px)').matches
}

function initThree() {
  if (!threeContainer.value) return
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(25, threeContainer.value.clientWidth / threeContainer.value.clientHeight, 0.1, 1000)
  camera.position.set(20, 3, 5)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  threeContainer.value.appendChild(renderer.domElement)

  // 灯光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.15)
  scene.add(hemiLight)
  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(-20, 50, 10)
  spotLight.angle = 0.12
  spotLight.penumbra = 1
  spotLight.castShadow = true
  spotLight.shadow.mapSize.set(1024, 1024)
  scene.add(spotLight)
  const pointLight = new THREE.PointLight(0xffffff, 1)
  scene.add(pointLight)

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.maxPolarAngle = Math.PI / 2
  controls.minPolarAngle = Math.PI / 2

  // 加载GLTF模型
  const loader = new GLTFLoader()
  loader.load(
    '/desktop_pc/scene.gltf',
    (gltf) => {
      model = gltf.scene
      model.scale.set(isMobile.value ? 0.7 : 0.75, isMobile.value ? 0.7 : 0.75, isMobile.value ? 0.7 : 0.75)
      model.position.set(0, isMobile.value ? -3 : -3.25, isMobile.value ? -2.2 : -1.5)
      model.rotation.set(-0.01, -0.2, -0.1)
      scene!.add(model)
    },
    undefined,
    (error) => {
      // 加载失败时显示一个立方体
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      scene!.add(cube)
    }
  )

  animate()
}

function animate() {
  animationId = requestAnimationFrame(animate)
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

function disposeThree() {
  if (animationId) cancelAnimationFrame(animationId)
  if (controls) controls.dispose()
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
  scene = null
  camera = null
  renderer = null
  controls = null
  model = null
}

onMounted(() => {
  detectMobile()
  window.addEventListener('resize', handleResize)
  window.addEventListener('resize', detectMobile)
  initThree()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('resize', detectMobile)
  disposeThree()
})
</script>

<style scoped>
.three-canvas-container {
  width: 100%;
  height: 400px;
  background: transparent;
}
@media (max-width: 500px) {
  .three-canvas-container {
    height: 250px;
  }
}
</style> 