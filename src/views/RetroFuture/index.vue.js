/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useRouter } from 'vue-router';
import { posts } from './data/posts.js';
import './styles/retro-future.css';
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import moonView from './components/canvas/moon.vue';
import { ref } from 'vue';
import { onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 控制模拟月球是否显示（点击后隐藏）
const showSimulatedMoon = ref(true);
// 模拟月球的透明度（用于渐变消失效果）
const simulatedMoonOpacity = ref(1);
// 3D 月球的透明度（渐变显示）
const threeMoonOpacity = ref(0);
//创建点击音效
const clickSound = new Audio('/sounds/bellding.mp3'); // 替换为你的音效文件
const handleMoonClick = () => {
    // 渐变步数（控制动画速度）
    let step = 0;
    const totalSteps = 50; // 总步数，越大越慢
    // 播放点击音效
    clickSound.play().catch((err) => {
        console.error('音效播放失败:', err); // 新增这行，查看具体错误
    });
    const fadeInterval = setInterval(() => {
        if (step < totalSteps) {
            // 模拟月球：每步降低 1/totalSteps
            simulatedMoonOpacity.value -= 1 / totalSteps;
            // 3D 月球：每步提升 1/totalSteps
            threeMoonOpacity.value += 1 / totalSteps;
            step++;
        }
        else {
            showSimulatedMoon.value = false; // 隐藏模拟月球
            clearInterval(fadeInterval);
        }
    }, 20); // 每 20ms 执行一次，可调整速度
};
const router = useRouter();
function viewPost(post) {
    router.push({ name: 'post', params: { id: post.id } });
}
const getImageUrl = (imgPath) => {
    return imgPath;
};
//横向滑动
// 横向滚动相关
const scrollWrapperRef = ref(null);
const scrollContentRef = ref(null);
// 初始化横向滚动
const initHorizontalScroll = () => {
    const wrapper = scrollWrapperRef.value;
    const content = scrollContentRef.value;
    if (!wrapper || !content) {
        console.log('DOM elements not found');
        return;
    }
    console.log('Found DOM elements:', { wrapper, content });
    // 确保GSAP插件已注册
    gsap.registerPlugin(ScrollTrigger);
    // 等待DOM完全渲染
    setTimeout(() => {
        // 计算滚动距离
        const contentWidth = content.scrollWidth;
        const wrapperWidth = wrapper.clientWidth;
        const distance = contentWidth - wrapperWidth;
        console.log('Dimensions:', {
            contentWidth,
            wrapperWidth,
            distance,
            windowHeight: window.innerHeight,
        });
        if (distance <= 0) {
            console.log('No horizontal scroll needed');
            return;
        }
        // 设置足够的高度触发垂直滚动
        const wrapperHeight = distance + window.innerHeight * 2;
        wrapper.style.height = `${wrapperHeight}px`;
        console.log('Set wrapper height to:', wrapperHeight);
        // 清理可能存在的旧实例
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        // 创建滚动触发器
        const trigger = ScrollTrigger.create({
            trigger: wrapper,
            start: 'top top',
            end: `+=${distance}`,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const translateX = -progress * distance;
                console.log('Scroll progress:', progress, 'TranslateX:', translateX);
                // 添加平滑过渡
                gsap.to(content, {
                    x: translateX,
                    duration: 0.1,
                    ease: 'none',
                });
            },
        });
        console.log('ScrollTrigger created:', trigger);
    }, 100);
};
onMounted(() => {
    console.log('Component mounted, initializing horizontal scroll...');
    // 测试GSAP是否正常工作
    console.log('GSAP version:', gsap.version);
    // 确保GSAP插件已注册
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP ScrollTrigger registered');
    // 简单的GSAP测试
    const testElement = scrollContentRef.value;
    if (testElement) {
        gsap.to(testElement, {
            x: 100,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => {
                console.log('GSAP test animation completed');
                gsap.to(testElement, { x: 0, duration: 1 });
            },
        });
    }
    // 添加延迟确保DOM完全渲染
    setTimeout(() => {
        console.log('Starting horizontal scroll initialization...');
        initHorizontalScroll();
    }, 1000);
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        console.log('Window resized, reinitializing...');
        setTimeout(initHorizontalScroll, 100);
    });
});
onBeforeUnmount(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    window.removeEventListener('resize', initHorizontalScroll);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['retro-future-theme']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['moon']} */ ;
/** @type {__VLS_StyleScopedClasses['three-moon']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-posts-container']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-posts-container']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-content']} */ ;
/** @type {__VLS_StyleScopedClasses['post-content']} */ ;
/** @type {__VLS_StyleScopedClasses['post-content']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "retro-future-theme" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "crt-overlay" },
});
/** @type {[typeof AppHeader, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AppHeader, new AppHeader({
    themeClass: "retro-future-theme",
}));
const __VLS_1 = __VLS_0({
    themeClass: "retro-future-theme",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "retro-future-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "stars" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "twinkling" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleMoonClick) },
    ...{ class: "moon" },
    ...{ style: ({ opacity: __VLS_ctx.simulatedMoonOpacity }) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showSimulatedMoon) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "three-moon" },
});
/** @type {[typeof moonView, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(moonView, new moonView({
    ...{ style: ({ opacity: __VLS_ctx.threeMoonOpacity }) },
}));
const __VLS_4 = __VLS_3({
    ...{ style: ({ opacity: __VLS_ctx.threeMoonOpacity }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "wapper" },
    ref: "scrollWrapperRef",
});
/** @type {typeof __VLS_ctx.scrollWrapperRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "blog-posts-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "blog-posts" },
    ref: "scrollContentRef",
});
/** @type {typeof __VLS_ctx.scrollContentRef} */ ;
for (const [post] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (post.id),
        ...{ class: "post-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.getImageUrl(post.image)),
        alt: (post.title),
        ...{ class: "post-image" },
        ...{ style: {} },
    });
}
/** @type {[typeof AppFooter, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(AppFooter, new AppFooter({
    themeClass: "retro-future-theme",
}));
const __VLS_7 = __VLS_6({
    themeClass: "retro-future-theme",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['retro-future-theme']} */ ;
/** @type {__VLS_StyleScopedClasses['crt-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['retro-future-container']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['stars']} */ ;
/** @type {__VLS_StyleScopedClasses['twinkling']} */ ;
/** @type {__VLS_StyleScopedClasses['moon']} */ ;
/** @type {__VLS_StyleScopedClasses['three-moon']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['wapper']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-posts-container']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-posts']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-image']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            posts: posts,
            AppHeader: AppHeader,
            AppFooter: AppFooter,
            moonView: moonView,
            showSimulatedMoon: showSimulatedMoon,
            simulatedMoonOpacity: simulatedMoonOpacity,
            threeMoonOpacity: threeMoonOpacity,
            handleMoonClick: handleMoonClick,
            getImageUrl: getImageUrl,
            scrollWrapperRef: scrollWrapperRef,
            scrollContentRef: scrollContentRef,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=index.vue.js.map