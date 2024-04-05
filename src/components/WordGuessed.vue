<script setup lang="ts">
    import { useWordsStore } from '@/stores/wordsStore';
    import LetterGuessed from './LetterGuessed.vue';

    const store = useWordsStore();
    const { currentLetterArray } = store;
</script>

<template>
    <ul class="letter-wrapper">
        <li v-for="letter in currentLetterArray">
            <LetterGuessed 
                :value="letter.value" 
                :is-guessed="letter.isGuessed"
                :is-space="letter.isSpace"
            />
        </li>
    </ul>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .letter-wrapper {
        // mb grid later
        @include rowFlex(center, center, rem(30));
        flex-wrap: wrap;

        column-gap: rem(12);
        row-gap: rem(18);
        width: 100%;
        max-width: 80vw;
    }
</style>