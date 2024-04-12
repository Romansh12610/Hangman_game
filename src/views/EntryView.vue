<script setup lang="ts">
    import Logo from '../components/images/Logo.vue';
    import PlayBtn from "../components/PlayBtn.vue";
    import MenuModal from "../components/MenuModal.vue";
    import BtnWithText from "../components/BtnWithText.vue";
    import { onMounted, reactive, ref } from 'vue'
    import { RoutePaths } from "@/router"

    const logoScalars = reactive({
        x: 1.1,
        y: 1.1,
    });

    const playBtnScale = ref(0.8);

    const animate = ref(false);
    onMounted(() => animate.value = true);
</script>

<template>
    <Transition name="fade">
        <MenuModal v-if="animate">
            <Logo :scale-x="logoScalars.x" :scale-y="logoScalars.y" />
            <PlayBtn :scale="playBtnScale" :rotate="0" 
            style="margin-bottom: 1.9rem" />
            <BtnWithText btn-text="How to play" :href="RoutePaths.HOW_TO_PLAY_VIEW" />
        </MenuModal>
    </Transition>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    @include fadeTransitionBottomTop(800, 10);
</style>