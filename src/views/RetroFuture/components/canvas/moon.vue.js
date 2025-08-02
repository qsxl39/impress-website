/// <reference types="../../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 核心引用和变量
const canvasRef = ref(null);
let isAutoRotating = ref(false); // 控制是否自动旋转
let scene;
let camera;
let renderer;
let controls;
let model = null;
let animationId;
// 响应式尺寸处理
const isMobile = ref(window.innerWidth <= 500);
// 初始化Three.js场景
function initScene() {
    if (!canvasRef.value)
        return;
    // 创建基础场景元素
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(25, getAspectRatio(), 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
    });
    // 配置相机和渲染器
    camera.position.set(20, 3, 5); // 确保相机位置能完整看到模型
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
    renderer.shadowMap.enabled = true;
    // 添加基础灯光
    scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 6));
    const pointLight = new THREE.PointLight(0xffffff, 80);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = false;
    scene.add(pointLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-20, 50, 10);
    spotLight.angle = 0.12;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.set(1024, 1024);
    scene.add(spotLight);
    // 配置控制器（禁用所有手动交互）
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enableDamping = false;
    controls.autoRotate = false; // 初始不自转
    controls.autoRotateSpeed = 1.0; // 适当调快旋转速度
    // 加载月球模型
    new GLTFLoader().load('/moon/scene.gltf', (gltf) => {
        model = gltf.scene;
        model.scale.set(8, 8, 8);
        // 计算模型中心并居中
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3()); // 模型中心坐标
        model.position.set(-center.x, -center.y, -center.z); // 模型移到原点
        // 关键：控制器围绕模型中心旋转
        controls.target.copy(center); // 旋转目标 = 模型中心
        controls.update(); // 立即更新控制器状态
        model.rotation.set(0.01, 1.4, 0); // 初始角度
        scene.add(model);
    }, undefined, () => console.error('月球模型加载失败'));
    // 启动动画循环
    animate();
}
// 动画循环：始终更新控制器，确保 autoRotate 生效
function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update(); // 必须持续调用，autoRotate 才会生效
    renderer.render(scene, camera);
}
// 监听 isAutoRotating 变化，同步控制器自动旋转状态
watch(isAutoRotating, (newVal) => {
    if (controls) {
        controls.autoRotate = newVal;
    }
});
// 计算宽高比
function getAspectRatio() {
    if (!canvasRef.value)
        return 1;
    return canvasRef.value.clientWidth / canvasRef.value.clientHeight;
}
// 响应窗口大小变化
function handleResize() {
    isMobile.value = window.innerWidth <= 500;
    if (!canvasRef.value)
        return;
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();
    renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
}
// 生命周期管理
onMounted(() => {
    initScene();
    window.addEventListener('resize', handleResize);
    // 点击 canvas 切换自转状态
    if (canvasRef.value) {
        canvasRef.value.addEventListener('click', () => {
            isAutoRotating.value = !isAutoRotating.value;
        });
    }
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationId);
    controls.dispose();
    renderer.dispose();
    if (canvasRef.value) {
        canvasRef.value.removeEventListener('click', () => {
            isAutoRotating.value = !isAutoRotating.value;
        });
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['moon-canvas-container']} */ ;
/** @type {__VLS_StyleScopedClasses['moon-canvas-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "moon-canvas-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ref: "canvasRef",
});
/** @type {typeof __VLS_ctx.canvasRef} */ ;
/** @type {__VLS_StyleScopedClasses['moon-canvas-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            canvasRef: canvasRef,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=moon.vue.js.map