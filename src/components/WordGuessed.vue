<script setup lang="ts">
    import { useWordsStore } from '@/stores/wordsStore';
    import LetterGuessed from './LetterGuessed.vue';

    const store = useWordsStore();
    const { currentWordArray } = store;
</script>

<template>
    <ul class="letter-wrapper">
        <li v-for="letter in currentWordArray">
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
        display: grid;
        grid-template-columns: repeat(auto-fit, auto);
        grid-auto-flow: column;
        place-content: center;
        column-gap: rem(10);
        width: 100%;
        min-height: max-content;
    }
</style>