<script setup lang="ts">
    import CanvasBackground from '@/components/CanvasBackground.vue'
    import { RouterView } from 'vue-router'
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
        min-width: 60vw;
        
        perspective: rem(700);
    }
</style>
