<script setup lang="ts">
    import { onMounted, onUnmounted, shallowRef, ref } from 'vue';
    import { HangCanvas } from '@/utils/canvas/hangCanvas';
    import { useWordsStore } from "@/stores/wordsStore";
    import { watch } from 'vue';

    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const hangCanvas = shallowRef<HangCanvas | null>(null);
    const store = useWordsStore();

    function displayCanvasBg(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!ctx) return;

        // not sure
        hangCanvas.value = new HangCanvas(ctx, 5, 5);
    }

    // watching health 
    watch(() => store.playerHealth, () => {
        if (hangCanvas.value === null) {
            return;
        }


    });

    function handleResize() {
        const canvas = canvasRef.value;
        if (!canvas) return;
        displayCanvasBg(canvas);
    }

    onMounted(() => {
        if (!canvasRef.value) return;
        
        displayCanvasBg(canvasRef.value);

        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => window.removeEventListener('resize', handleResize));

</script>

<template>
    <canvas id="hang_cv" ref="canvasRef">
        Hangman state display
    </canvas>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
</style>