<script setup lang="ts">
import { onMounted } from 'vue';
import { main } from "@/utils/canvas/canvasMain";

function displayBackground() {
    const canvas = document.getElementById('c') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    main(ctx, canvas);
}

onMounted(displayBackground);

</script>

<template>
    <canvas id="c">
        Beautiful night background
    </canvas>
</template>

<style scoped lang="scss">
    #c {
        position: fixed;
        top: 0;
        left: 0;
    }
</style>