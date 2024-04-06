<script setup lang="ts">
    import { useWordsStore } from '@/stores/wordsStore';
    import { reactive, ref, watch } from 'vue';

    type TimerType = ReturnType<typeof setTimeout>;
    // for 'damaging & winning states'
    const colors = {
        red: '#be0000',
        green: '#00c03a',
        gradient: 'url(#grad_1)',
    };

    const props = defineProps({
        scale: {
            type: String,
            default: '1.85',
        },
    });

    const fillColor = ref(colors.gradient);
    const svgClass = reactive({
        heart: true,
        damaged: false,
        guessed: false,
    });
    const timerRef = ref<TimerType | null>(null);
    const durationOfAnimation = ref(1000);
    
    const store = useWordsStore();

    watch(() => store.isReceiveDamage, () => {
        if (store.isReceiveDamage) {
            if (timerRef.value != null) {
                clearTimeout(timerRef.value);
                timerRef.value = null;
                fillColor.value = colors.gradient;
                svgClass.damaged = false;
                store.cancelDamageState();
            }
            
            fillColor.value = colors.red;
            svgClass.damaged = true;
            
            timerRef.value = setTimeout(() => {
                fillColor.value = colors.gradient;
                svgClass.damaged = false;
                store.cancelDamageState();
            }, durationOfAnimation.value);    
        }
    })

    watch(() => store.isGuessedLetter, () => {
        if (store.isGuessedLetter) {
            if (timerRef.value != null) {
                clearTimeout(timerRef.value);
                timerRef.value = null;
                svgClass.guessed = false;
                fillColor.value = colors.gradient;
                store.cancelGuessedState();
            }

            fillColor.value = colors.green;
            svgClass.guessed = true;

            timerRef.value = setTimeout(() => {
                fillColor.value = colors.gradient;
                svgClass.guessed = false;
                store.cancelGuessedState();
            }, durationOfAnimation.value);   
        }
    });
    
fillColor
</script>

<template>
    <svg viewBox="0 0 27 24" width="27" height="24" xmlns="http://www.w3.org/2000/svg"
        :transform="`scale(${props.scale})`"
        :fill="fillColor"
        :class="svgClass"
    >
        <path d="M13.921 24L12.0245 22.2736C5.28883 16.1657 0.841965 12.1243 0.841965 7.19346C0.841965 3.15204 4.00709 0 8.03543 0C10.3112 0 12.4954 1.0594 13.921 2.72044C15.3466 1.0594 17.5308 0 19.8065 0C23.8349 0 27 3.15204 27 7.19346C27 12.1243 22.5531 16.1657 15.8174 22.2736L13.921 24Z" />
        <defs>
        <linearGradient id="grad_1" x1="13.921" y1="3.9403" x2="13.921" y2="24" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FE71FE"/>
        <stop offset="1" stop-color="#7199FF"/>
        </linearGradient>
        </defs>
    </svg>
</template>


<style lang="scss" scoped>
    @use 'ut' as *;
    .heart {
        transition: fill 0.35s ease-in-out;

        &.damaged {
            @include pulseAnimation(1000, 1.85);
        }

        &.guessed {
            @include pulseAnimation(1000, 1.85);
        }
    }
</style>