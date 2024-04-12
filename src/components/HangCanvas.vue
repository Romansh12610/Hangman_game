<script setup lang="ts">
    import { onMounted, onUnmounted, watch, ref, shallowRef } from 'vue';
    import { HangCanvas } from '@/utils/canvas/hangCanvas';
    import { useWordsStore } from "@/stores/wordsStore";
    import { colors } from '@/utils/canvas/canvasUtils';

    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const hangCanvas = shallowRef<HangCanvas | null>(null);
    const store = useWordsStore();

    function displayCanvasBg(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!ctx) return;

        hangCanvas.value = new HangCanvas({
            ctx,
            lineWidth: 4,
            velocityPx: 3,
            strokeColor: colors['black'],
            clearColor: colors['white'],
        });
    }

    // watching health 
    watch(() => store.playerHealth, () => {
        if (hangCanvas.value === null) {
            return;
        }

        // reset canvas
        if (store.playerHealth === 100) {
            hangCanvas.value.initSetup();
        }

        if ((store.playerHealth <= 90) && !hangCanvas.value.steps.line1?.isDrawnToEnd) {
            hangCanvas.value.drawFirstLine();
        }
        if ((store.playerHealth <= 80) && !hangCanvas.value.steps.line2?.isDrawnToEnd) {
            hangCanvas.value.drawSecondLine();
        }
        if ((store.playerHealth <= 70) && (!hangCanvas.value.steps.line3?.isDrawnToEnd && !hangCanvas.value.steps.line3Angle?.isDrawnToEnd)) {
            hangCanvas.value.drawThirdLine();
            hangCanvas.value.drawThirdLineAngle();
        }
        if ((store.playerHealth <= 60) && (!hangCanvas.value.steps.line4?.isDrawnToEnd)) {
            hangCanvas.value.drawFourthLine();
        }
        if ((store.playerHealth  <= 50) && (!hangCanvas.value.steps.head?.isDrawnToEnd)) {
            hangCanvas.value.drawHead();
        }
        if ((store.playerHealth <= 40) && (!hangCanvas.value.steps.body?.isDrawnToEnd)) {
            hangCanvas.value.drawBody();
        }
        if ((store.playerHealth <= 30) && (!hangCanvas.value.steps.leftArm?.isDrawnToEnd)) {
            hangCanvas.value.drawLeftArm();
        }
        if ((store.playerHealth <= 20) && (!hangCanvas.value.steps.rightArm?.isDrawnToEnd)) {
            hangCanvas.value.drawRightArm();
        }
        if ((store.playerHealth <= 10) && (!hangCanvas.value.steps.leftLeg?.isDrawnToEnd)) {
            hangCanvas.value.drawLeftLeg();
        }
        if ((store.playerHealth <= 0) && (!hangCanvas.value.steps.rightLeg?.isDrawnToEnd)) {
            hangCanvas.value.drawRightLeg();
        }
    });

    function handleResize() {
        const canvas = canvasRef.value;
        if (!canvas) return;
        displayCanvasBg(canvas);
    }

    onMounted(() => {
        if (!canvasRef.value) {
            console.error('no canvas: onMounted - HangCanvas.vue');
            return;
        };
        
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

    #hang_cv {
        width: rem(500);
        min-height: rem(400);

        border-radius: rem(25);
        box-shadow: 0 0 rem(8) rem(10) var(--blue-dark);
    }
</style>