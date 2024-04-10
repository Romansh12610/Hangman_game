<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { main } from "@/utils/canvas/canvasMain";

const canvasRef = ref<HTMLCanvasElement | null>(null);

function displayBackground(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    main(ctx, canvas);
}

function handleResizeEvent() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    displayBackground(canvas);
}

onMounted(() => {
    // should not happen
    if (canvasRef.value == null) return;
    
    displayBackground(canvasRef.value);
    // listen on resize screen
    window.addEventListener('resize', handleResizeEvent);
});

onUnmounted(() => window.removeEventListener('resize', handleResizeEvent));

</script>

<template>
    <canvas ref="canvasRef" id="cv">
        Beautiful night background
    </canvas>
</template>

<style scoped lang="scss">
    #cv {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -100;
    }
</style>