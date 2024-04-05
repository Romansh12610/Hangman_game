<script setup lang="ts">
    import { useWordsStore } from "@/stores/wordsStore";

    interface BtnWithValue extends HTMLButtonElement {
        dataset: {
            value: string;
        }
    }

    const props = defineProps({
        letterValue: {
            type: String,
            required: true,
        }
    });

    const store = useWordsStore();

    // if btn clicked
    function handleBtnClick(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest('[data-value]') as BtnWithValue;
        if (!target) return;

        const formattedChar = target.dataset.value.replace(/key/i, '').toLowerCase().trim();
        store.guessLetter(formattedChar);
    }
</script>

<template>
    <button @click="handleBtnClick" class="key" :data-value="props.letterValue">
        <span>{{ props.letterValue }}</span>
    </button>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .key {
        min-width: rem(80);
        min-height: rem(80);
        padding: rem(10);
        border-radius: rem(20);

        @include btn_shadow_border(4, 10);
        @include colFlex(center, center);

        & > span {
            font-size: rem(40);
        }
    }
</style>