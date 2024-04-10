<script setup lang="ts">
    import { useWordsStore } from '@/stores/wordsStore';
    import LetterGuessed from './LetterGuessed.vue';

    const store = useWordsStore();
</script>

<template>
    <ul class="letter-wrapper">
        <li v-for="letter in store.currentLetterArray">
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
        @include rowFlex(center, center);
        flex-wrap: wrap;

        column-gap: rem(15);
        row-gap: rem(20);
        width: clamp(rem(620), 70%, rem(850));
        max-width: 70vw;
    }
</style>