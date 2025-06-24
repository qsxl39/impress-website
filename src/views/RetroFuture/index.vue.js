/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useRouter } from 'vue-router';
import { posts } from '../../data/posts';
import './styles/retro-future.css';
const router = useRouter();
function viewPost(post) {
    router.push({ name: 'post', params: { id: post.id } });
}
const getImageUrl = (imgPath) => {
    return imgPath.replace('./', '/');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "retro-future-theme" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "home-page" },
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
    ...{ class: "moon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "hero-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-background-gradient" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "blog-posts" },
    ...{ style: {} },
});
for (const [post] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (post.id),
        ...{ class: "post-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.getImageUrl(post.image)),
        alt: (post.title),
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (post.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "meta" },
    });
    (post.author);
    (post.date);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (post.excerpt);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.viewPost(post);
            } },
    });
}
/** @type {__VLS_StyleScopedClasses['retro-future-theme']} */ ;
/** @type {__VLS_StyleScopedClasses['home-page']} */ ;
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
/** @type {__VLS_StyleScopedClasses['stars']} */ ;
/** @type {__VLS_StyleScopedClasses['twinkling']} */ ;
/** @type {__VLS_StyleScopedClasses['moon']} */ ;
/** @type {__VLS_StyleScopedClasses['hero-content']} */ ;
/** @type {__VLS_StyleScopedClasses['content-background-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['blog-posts']} */ ;
/** @type {__VLS_StyleScopedClasses['post-card']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            posts: posts,
            viewPost: viewPost,
            getImageUrl: getImageUrl,
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