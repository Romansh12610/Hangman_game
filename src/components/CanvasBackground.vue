<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { main } from "@/utils/canvas/canvasMain";

const canvasRef = ref<HTMLCanvasElement | null>(null);

function displayBackground(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    main(ctx, canvas);
}

function handleResizeEvent(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;
    displayBackground(canvas);
}

onMounted(() => {
    // should not happen
    if (canvasRef.value == null) return;
    
    displayBackground(canvasRef.value);
    // listen on resize screen
    window.addEventListener('resize', () => handleResizeEvent(canvasRef.value));
});

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