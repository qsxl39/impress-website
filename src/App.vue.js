/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
const navItems = ref([
    { name: '复古未来', path: '/retro-future' },
    { name: '花野异梦', path: '/dreamcore' },
    { name: '海上轨道', path: '/railway' },
    { name: '复古未来', path: '/escape-reality' },
]);
const showMobileMenu = ref(false);
function toggleMobileMenu() {
    showMobileMenu.value = !showMobileMenu.value;
}
function closeMobileMenu() {
    showMobileMenu.value = false;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "retro-future-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "crt-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "desktop-nav" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (item.path),
    });
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: (item.path),
    }));
    const __VLS_2 = __VLS_1({
        to: (item.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    (item.name);
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleMobileMenu) },
    ...{ class: "mobile-menu-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
if (__VLS_ctx.showMobileMenu) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: "mobile-nav" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (item.path),
        });
        const __VLS_4 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            ...{ 'onClick': {} },
            to: (item.path),
        }));
        const __VLS_6 = __VLS_5({
            ...{ 'onClick': {} },
            to: (item.path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        let __VLS_8;
        let __VLS_9;
        let __VLS_10;
        const __VLS_11 = {
            onClick: (__VLS_ctx.closeMobileMenu)
        };
        __VLS_7.slots.default;
        (item.name);
        var __VLS_7;
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
const __VLS_12 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
/** @type {__VLS_StyleScopedClasses['retro-future-container']} */ ;
/** @type {__VLS_StyleScopedClasses['crt-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['header-content']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['desktop-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-menu-button']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-nav']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            RouterView: RouterView,
            navItems: navItems,
            showMobileMenu: showMobileMenu,
            toggleMobileMenu: toggleMobileMenu,
            closeMobileMenu: closeMobileMenu,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map