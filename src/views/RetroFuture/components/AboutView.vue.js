/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
// Author data could be imported or defined here
const author = {
    name: '指挥官 亚历克斯·诺瓦克',
    bio: '太空探索者、复古科技爱好者、复古未来编年史作者。诺瓦克指挥官驾驶飞船穿越过被时间遗忘的星云，调试过比大多数行星还要古老的系统。在不探索未知领域时，他喜欢摆弄回收的模拟合成器，记录过去梦想与未来现实之间奇特的交汇点。',
    avatar: '/assets/images/author-avatar.jpg', // Assuming avatar is in public/assets/images/
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "about-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "author-info" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.author.avatar),
    alt: (__VLS_ctx.author.name),
    ...{ class: "avatar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.author.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.author.bio);
/** @type {__VLS_StyleScopedClasses['about-page']} */ ;
/** @type {__VLS_StyleScopedClasses['author-info']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            author: author,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=AboutView.vue.js.map