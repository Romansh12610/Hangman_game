<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { onMounted, ref, watchEffect } from 'vue'
    import type { CategoryNames } from '@/types/categoryData'
    import { useWordsStore } from '@/stores/wordsStore'
    import BackLink from '@/components/BackLink.vue'
    import { RoutePaths } from '@/router'
    import WordGuessed from '@/components/WordGuessed.vue'
    import Keyboard from '@/components/Keyboard.vue'
    import Healthbar from '@/components/Healthbar.vue'
    import EndGameModal from '@/components/EndGameModal.vue'
    import Spinner from '@/components/Spinner.vue'
    import Error from '@/components/Error.vue'
    import HangCanvas from '@/components/HangCanvas.vue'

    interface RouteParams {
        category: CategoryNames
    }

    const route = useRoute()
    const { category: categoryName } = route.params as unknown as RouteParams
    // states for loading data
    // if page reloaded and
    // data is not loaded on previous view
    const isResult = ref(false)
    const isLoading = ref(false)
    const isError = ref(false)
    // check win / lose states
    const store = useWordsStore()

    onMounted(async () => {
        if (!store.categories) {
            isResult.value = await store.setupCategories(
                '/data.json',
                isLoading,
                isError
            )
        }
        if (!store.currentWord) {
            store.setupCurrentWord(categoryName);
        }
    });

    watchEffect(async () => {
        if (isResult.value == false) {
            isResult.value = await store.setupCategories(
                '/data.json',
                isLoading,
                isError
            )
            if (!store.currentWord) {
                store.setupCurrentWord(categoryName);
            }
        }
    });

    // for top wrapper animation
    const animateTB = ref(false);
    onMounted(() => animateTB.value = true);

    // backlink navigation
    function backlinkCallback() {
        store.cleanUpCurrentState();
    }
</script>

<template>
    <section class="play-section">
        <Transition name="fadeTB">
            <div class="play-section__top-wrapper" v-if="animateTB">
                <!-- title zone: category + health -->
                <div class="play-section__category">
                    <BackLink 
                        :href="RoutePaths.PICK_CATEGORY" 
                        @click-callback="backlinkCallback"
                    />
                    <h2>{{ categoryName }}</h2>
                </div>

                <Healthbar />
            </div>
        </Transition>

        <Transition name="fade">
            <Error
                v-if="isError"
                par-text="Error happened..."
                link-text="To home page"
                :href="RoutePaths.ROOT"
            />
            <div v-else-if="isResult" class="play-section__main">
                <div class="play-section__display">
                    <!-- word displaing -->
                    <WordGuessed />
                    <!-- keyboard displaying -->
                </div>
                <div class="play-section__cv-wrapper">
                    <HangCanvas />
                </div>
                <div class="play-section__keyboard">
                    <Keyboard />
                </div>
            </div>
            <Spinner v-else="isLoading" />
        </Transition>
        <!-- end game menu -->
        <EndGameModal
            v-if="store.isPlayerWin"
            mode="win"
            :current-category="categoryName"
        />
        <EndGameModal
            v-else-if="true"
            mode="lose"
            :current-category="categoryName"
        />
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .play-section {
        @include colFlex(flex-start, flex-start, rem(30));
        @include fadeTransitionBottomTop(800, 30);
        @include fadeTransitionTopBottom(800, -10);

        overflow: visible;
        width: 100%;
        min-height: 100vh;
        padding-top: rem(30);
        padding-inline: 8vw;

        &__top-wrapper {
            @include rowFlex(space-between, center);
            width: 100%;
        }

        &__category {
            @include rowFlex(flex-start, center, rem(20));

            & > h2 {
                font-size: rem(50);
                color: var(--white);
            }
        }

        // keyboard + hangCanvas wrapper
        &__main {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(2, 0.9fr);
            grid-template-rows: 0.8fr 0.8fr;
            justify-content: space-between;
            row-gap: rem(10);
            flex-grow: 1;
        }

        // Word & keyboard
        &__display {
            @include colFlex(flex-start, flex-start, clamp(50px, 5vh, 70px));
        }

        &__cv-wrapper {
            @include rowFlex(center, flex-start);
        }

        &__keyboard {
            grid-column: 1 / 3;
            grid-row: 2 / 3;
            
            @include colFlex(center, center);
        }
    }
</style>
