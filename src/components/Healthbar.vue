<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import HeartIcon from './images/HeartIcon.vue';
    import { useWordsStore } from '@/stores/wordsStore';

    // for 'damaging & winning states'
    const colors = {
        red: '#be0000',
        green: '#00c03a',
    };

    const healthBar = ref<HTMLDivElement | null>(null);
    const initialElWidth = ref(0);
    const currentElWidth = ref(0);
    const store = useWordsStore();

    function setupInitHealth() {
        if (healthBar.value) {
            initialElWidth.value = healthBar.value.offsetWidth;
            currentElWidth.value = initialElWidth.value;
        }
    }

    onMounted(() => setupInitHealth());

    watch(() => store.playerHealth, (newValue, oldValue) => {
        if (!healthBar.value) return; // no DOM el
        
        const isDecreased = oldValue && (newValue < oldValue);
        if (isDecreased) {
            const decreaseValuePercent = (oldValue - newValue) / 100;
            currentElWidth.value -= (initialElWidth.value * decreaseValuePercent);
            
            if (currentElWidth.value < 0) {
                healthBar.value.style.width = 0 + 'px';
                return;
            }

            healthBar.value.style.width = currentElWidth.value + 'px';
            healthBar.value.style.backgroundColor = colors.red;

            setTimeout(() => {
                if (healthBar.value != null) {
                    healthBar.value.style.backgroundColor = colors.green;
                }
            }, 700);
        }
        // when restart
        else if (newValue === 100) {

            currentElWidth.value = initialElWidth.value;
            healthBar.value.style.width = initialElWidth.value + 'px';

        }
    });
</script>

<template>
    <div class="bar">
        <div class="bar__track">
            <div id="health_track" ref="healthBar"></div>
        </div>
        <HeartIcon />
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .bar {
        @include rowFlex(center, center, rem(20));

        &__track {
            @include rowFlex(flex-start, center);
            background-color: var(--white);
            min-width: rem(150);
            height: rem(30);
            border-radius: rem(20);
            position: relative;
            padding-inline: 5%;

            & #health_track {
                background-color: var(--green);
                min-height: 60%;
                width: 100%;
                border-radius: rem(20);
                transition: width 0.7s ease-in-out, background-color 0.2s ease-in-out;
            }
        }
    }
</style>