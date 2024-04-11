<script setup lang="ts">
    import { useWordsStore } from '@/stores/wordsStore';
    import { reactive, ref, watch } from 'vue';

    type TimerType = ReturnType<typeof setTimeout>;

    const props = defineProps({
        scale: {
            type: String,
            default: '1.85',
        },
    });

    const svgClass = reactive({
        heart: true,
        // states
        damaged: false,
        guessed: false,
    });
    const timerRef = ref<TimerType | null>(null);
    const durationOfAnimation = ref(700);
    
    const store = useWordsStore();

    watch(() => store.isReceiveDamage, () => {
        if (store.isReceiveDamage && !svgClass.damaged) {
            if (store.isGuessedLetter && svgClass.guessed) {
                svgClass.guessed = false;
                store.cancelGuessedState();
            }
            if (timerRef.value) {
                clearTimeout(timerRef.value);
                timerRef.value = null;
            }

            svgClass.damaged = true;
            store.cancelDamageState();
            
            timerRef.value = setTimeout(() => {
                svgClass.damaged = false;
            }, durationOfAnimation.value);    
        }
    })

    watch(() => store.isGuessedLetter, () => {
        if (store.isGuessedLetter && !svgClass.guessed) {
            if (store.isReceiveDamage && svgClass.damaged) {
                store.cancelDamageState();
                svgClass.damaged = false;
            }
            if (timerRef.value != null) {
                clearTimeout(timerRef.value);
                timerRef.value = null;
            }

            svgClass.guessed = true;
            store.cancelGuessedState();

            timerRef.value = setTimeout(() => {
                svgClass.guessed = false;
            }, durationOfAnimation.value);   
        }
    });
</script>

<template>
    <svg viewBox="0 0 27 24" width="27" height="24" xmlns="http://www.w3.org/2000/svg"
        :transform="`scale(${props.scale})`"
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
        fill: url(#grad_1);

        &.damaged {
            @include pulseAnimation(700, 1.85);
            fill: var(--red);
        }

        &.guessed {
            @include pulseAnimation(700, 1.85);
            fill: var(--green);
        }
    }
</style>