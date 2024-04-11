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

</script>

<template>
    <section class="play-section">
        <div class="play-section__top-wrapper">
            <!-- title zone: category + health -->
            <div class="play-section__category">
                <BackLink :to="RoutePaths.PICK_CATEGORY" />
                <h2>{{ categoryName }}</h2>
            </div>

            <Healthbar />
        </div>

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
                <Keyboard />
            </div>
            <div class="play-section__cv-wrapper">
                <HangCanvas />
            </div>
        </div>
        <Spinner v-else="isLoading" />
        <!-- end game menu -->
        <EndGameModal
            v-if="store.isPlayerWin"
            mode="win"
            :current-category="categoryName"
        />
        <EndGameModal
            v-else-if="store.isPlayerLose"
            mode="lose"
            :current-category="categoryName"
        />
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .play-section {
        @include colFlex(flex-start, flex-start, rem(80));

        padding-top: rem(30);
        overflow: visible;
        width: 100%;
        min-height: 100vh;
        padding-inline: 5vw;

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
            @include rowFlex(center, flex-start, 2.5vw);
        }

        // Word & keyboard
        &__display {
            flex-grow: 0.8;
            @include colFlex(flex-start, center, clamp(50px, 5vh, 70px));
        }

        &__cv-wrapper {
            flex-grow: 0.8;
        }
    }
</style>
