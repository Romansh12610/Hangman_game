<script setup lang="ts">
    import { useWordsStore } from '@/stores/wordsStore';
    import LetterGuessed from './LetterGuessed.vue';

    const store = useWordsStore();
</script>

<template>
    <ul class="list-outer">
        <li v-for="word in store.currentLetterArray">
            <ul class="list-inner">
                <li v-for="letter in word">
                    <LetterGuessed 
                        :value="letter.value" 
                        :is-guessed="letter.isGuessed"
                        :is-space="letter.isSpace"
                    />
                </li>
            </ul>
        </li>
    </ul>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .list-outer {
        @include colFlex(flex-start, flex-start);

        row-gap: rem(25);
        width: clamp(rem(620), 70%, rem(850));
        max-width: 70vw;
    }

    .list-inner {
        @include rowFlex(center, center);
        flex-wrap: wrap;

        column-gap: rem(12);
        row-gap: rem(15);
        width: clamp(rem(620), 70%, rem(850));
        max-width: 70vw;
    }
</style>