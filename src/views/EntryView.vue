<script setup lang="ts">
    import Logo from '../components/images/Logo.vue';
    import PlayBtn from "../components/PlayBtn.vue";
    import MenuModal from "../components/MenuModal.vue";
    import BtnWithText from "../components/BtnWithText.vue";
    import { reactive, ref } from 'vue'
    import { RoutePaths } from "@/router"

    const logoScalars = reactive({
        x: 1.1,
        y: 1.1,
    });

    const playBtnScale = ref(0.8);

</script>

<template>
    <MenuModal>
        <Logo :scale-x="logoScalars.x" :scale-y="logoScalars.y" />
        <PlayBtn :scale="playBtnScale" :rotate="0" 
        style="margin-bottom: 1.9rem" />
        <BtnWithText btn-text="How to play" :href="RoutePaths.HOW_TO_PLAY_VIEW" />
    </MenuModal>
</template>