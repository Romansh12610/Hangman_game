<script setup lang="ts">
    import CanvasBackground from '@/components/CanvasBackground.vue'
    import { RouterView } from 'vue-router'
    import { useAudioStore } from './stores/audioStore';

    // init volume
    const { updateVolume } = useAudioStore();
    updateVolume(0.1);
</script>

<template>
    <CanvasBackground />
    <main class="main">
        <RouterView />
    </main>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .main {
        @include colFlex(center);
        min-height: 100vh;
        min-width: 100vw;
    }
</style>
