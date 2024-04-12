<script setup lang="ts">
    import PickCategory from '@/components/images/PickCategory.vue'
    import BackLink from '@/components/BackLink.vue'
    import { RoutePaths } from '@/router'
    import { onMounted, ref, watchEffect } from 'vue'
    import { useWordsStore } from '@/stores/wordsStore'
    import BtnWithText from '@/components/BtnWithText.vue'
    import Spinner from '@/components/Spinner.vue'
    import Error from '@/components/Error.vue'

    const store = useWordsStore()
    // states for requests
    const isResult = ref(false);
    const isLoading = ref(false)
    const isError = ref(false)

    onMounted(async () => {
        if (store.categories == null) {
            isResult.value = await store.setupCategories(
                '/data.json',
                isLoading,
                isError,
            );
        }
    });

    watchEffect(async () => {
        if (isResult.value == false) {
            isResult.value = await store.setupCategories(
                '/data.json',
                isLoading,
                isError
            )
        }
    });

    // for top wrapper animation
    const animateTB = ref(false);
    onMounted(() => animateTB.value = true);
</script>

<template>
    <section class="pick-section">
        <Transition name="fadeTB">
            <div class="pick-section__title" v-if="animateTB">
                <BackLink :href="RoutePaths.ROOT" />
                <PickCategory scale="2.6" />
            </div>
        </Transition>
        <div class="pick-section__result-wrapper">
            <Transition name="fade">
                <Spinner v-if="isLoading" />
                <Error
                    v-else-if="isError"
                    par-text="Error was occured"
                    link-text="To home page"
                    :href="RoutePaths.ROOT"
                />
                <div v-else-if="isResult" class="pick-section__categories">
                    <BtnWithText
                        v-for="categoryName in store.categoryNames"
                        :btn-text="categoryName"
                        :href="`/play/${categoryName}`"
                        big
                    />
                </div>
            </Transition>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .pick-section {
        @include colFlex(center, flex-start, 20vh);
        @include fadeTransitionBottomTop(800, 30);
        @include fadeTransitionTopBottom(800, -10);

        overflow: visible;
        width: 100%;
        min-height: 100vh;
        padding-top: rem(30);
        padding-inline: 8vw;
        position: relative;

        &__title {
            @include rowFlex(center, center);
            position: relative;
            width: 100%;

            & a {
                position: absolute;
                left: 10vw;
            }

            & svg {
                margin-top: rem(30);
            }
        }

        &__result-wrapper {
            @include colFlex(center, center);
        }

        &__error {
            @include colFlex(center, center, rem(15));

            position: fixed;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: rem(350);
            height: rem(150);
            background-color: var(--pink);
            border-radius: rem(32);

            > p {
                font-size: rem(40);
            }

            > a {
                font-size: rem(32);
                transition: transform 0.4 ease-in-out;
            }
        }

        &__categories {
            display: grid;
            grid-template-columns: repeat(3, minmax(rem(200), rem(300)));
            column-gap: rem(30);
            row-gap: rem(30);
        }
    }
</style>
