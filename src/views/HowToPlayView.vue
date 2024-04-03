<script setup lang="ts">
    import HowToPlay from '@/components/images/HowToPlay.vue';
    import HowToBlock from '@/components/HowToBlock.vue';
    import BackLink from '@/components/BackLink.vue';
    import { RoutePaths } from '@/router';

    interface BlockTextData {
        number: string;
        title: string;
        description: string;
    }

    const blockData: BlockTextData[] = [
        {
            number: '01',
            title: 'Choose a category',
            description: "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word." 
        },
        {
            number: '02',
            title: 'Guess letters',
            description: "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses."
        },
        {
            number: '03',
            title: 'Win or lose',
            description: "You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose."
        }
    ];
</script>

<template>
    <div class="container">
        <div class="container__title">
            <BackLink :href="RoutePaths.ROOT" />
            <HowToPlay scale="0.85" />
        </div>
        <div class="container__blocks">
            <HowToBlock 
                v-for="block in blockData" 
                :number="block.number"
                :title="block.title"
                :description="block.description"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .container {
        @include colFlex(center, flex-start, rem(30));
        margin: rem(30) rem(35) 0;

        &__title {
            @include rowFlex(flex-start, center);
        }

        &__blocks {
            display: grid;
            grid-template-columns: repeat(3, minmax(rem(250), rem(400)));
            column-gap: rem(20);
        }
    }
</style>