<script setup lang="ts">
    import HowToPlay from '@/components/images/HowToPlay.vue';
    import HowToBlock from '@/components/HowToBlock.vue';
    import BackLink from '@/components/BackLink.vue';
    import { RoutePaths } from '@/router';
    import { onMounted, reactive } from 'vue';

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

    // for top wrapper animation
    const animateTB = reactive({
        title: false,
        main: false,
    });
    onMounted(() => {
        animateTB.title = true;
        animateTB.main = true;
    });
</script>

<template>
    <section class="container">
        <Transition name="fadeTB">
            <div class="container__title" v-if="animateTB.title">
                <BackLink :href="RoutePaths.ROOT" />
                <HowToPlay scale="0.85" />
            </div>
        </Transition>
        <Transition name="fade">
            <div class="container__blocks" v-if="animateTB.main">
                <HowToBlock 
                    v-for="block in blockData" 
                    :number="block.number"
                    :title="block.title"
                    :description="block.description"
                />
            </div>
        </Transition>
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .container {
        @include colFlex(center, flex-start, 10vh);
        @include fadeTransitionBottomTop(800, 30);
        @include fadeTransitionTopBottom(800, -10);

        width: 100%;
        min-height: 100vh;
        padding-top: rem(30);
        padding-inline: 8vw;

        &__title {
            @include rowFlex(center, center);
            position: relative;
            width: 100%;

            & a {
                position: absolute;
                left: 10vw;
            }
        }

        &__blocks {
            display: grid;
            grid-template-columns: repeat(3, minmax(rem(250), rem(400)));
            column-gap: rem(20);
        }
    }
</style>