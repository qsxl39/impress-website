/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useRouter } from 'vue-router';
import './styles/dreamcore.css';
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
const router = useRouter();
function viewPost(post) {
    router.push({ name: 'post', params: { id: post.id } });
}
const getImageUrl = (imgPath) => {
    return imgPath;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dreamcore-theme" },
});
/** @type {[typeof AppHeader, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AppHeader, new AppHeader({
    themeClass: "dreamcore-theme",
}));
const __VLS_1 = __VLS_0({
    themeClass: "dreamcore-theme",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "dreamcore-container" },
});
/** @type {[typeof AppFooter, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(AppFooter, new AppFooter({
    themeClass: "dreamcore-theme",
}));
const __VLS_4 = __VLS_3({
    themeClass: "dreamcore-theme",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {__VLS_StyleScopedClasses['dreamcore-theme']} */ ;
/** @type {__VLS_StyleScopedClasses['dreamcore-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AppHeader: AppHeader,
            AppFooter: AppFooter,
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