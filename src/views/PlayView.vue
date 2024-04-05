<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { onBeforeMount } from 'vue';
    import type { CategoryNames } from '@/types/categoryData';
    import { useWordsStore } from "@/stores/wordsStore";
    import BackLink from '@/components/BackLink.vue';
    import { RoutePaths } from '@/router';
    import WordGuessed from '@/components/WordGuessed.vue';

    interface RouteParams {
        category: CategoryNames;
    }

    const route = useRoute();
    const { category: categoryName } = route.params as unknown as RouteParams;
    
    onBeforeMount(() => {
        // setup current word
        const route = useRoute();
        const { category: categoryName } = route.params as unknown as RouteParams;
        const store = useWordsStore();
        store.setupCurrentWord(categoryName);
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

            <div class="play-section__healthbar">
            </div>

            
        </div>
        <!-- word displaing -->
        <WordGuessed />
        <!-- keyboard displaying -->
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .play-section {
        @include colFlex(center, flex-start, rem(50));

        padding-top: rem(30);
        width: 100%;
        min-height: 100vh;

        &__top-wrapper {
            @include rowFlex(space-between, center);
            width: 100%;
        }

        &__category {
            @include rowFlex(flex-start, center);
            gap: rem(20);

            & > h2 {
                font-size: rem(50);
                color: var(--white);
            }
        }

        &__healthbar {
            //temp
            width: rem(60);
            height: rem(60);
            background-color: var(--white);
            border-radius: rem(20);
        }
    }
</style>