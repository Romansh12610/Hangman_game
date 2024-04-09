<script setup lang="ts">
    import PickCategory from '@/components/images/PickCategory.vue'
    import BackLink from '@/components/BackLink.vue'
    import { RoutePaths } from '@/router'
    import { onMounted, ref } from 'vue'
    import { useWordsStore } from '@/stores/wordsStore'
    import BtnWithText from '@/components/BtnWithText.vue'
    import Spinner from '@/components/Spinner.vue'
    import Error from '@/components/Error.vue'

    const store = useWordsStore()
    // states for requests
    const isLoading = ref(false)
    const isError = ref(false)

    onMounted(async () => {
        if (store.categories == null) {
            await store.setupCategories('/data.json', isLoading, isError);
        }
    })
</script>

<template>
    <section class="pick-section">
        <div class="pick-section__title">
            <BackLink :href="RoutePaths.ROOT" />
            <PickCategory scale="2.6" />
        </div>
        <div class="pick-section__result-wrapper">
            <Spinner v-if="isLoading" />
            <Error
                v-else-if="isError"
                par-text="Error was occured"
                link-text="To home page"
                :href="RoutePaths.ROOT"
            />
            <div v-else-if="store.categories" class="pick-section__categories">
                <BtnWithText
                    v-for="categoryName in store.categoryNames"
                    :btn-text="categoryName"
                    :href="`/play/${categoryName}`"
                    big
                />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .pick-section {
        @include colFlex(center, flex-start, 20vh);

        margin: rem(30) rem(35) 0;
        width: max(1030px, 100%);
        min-height: 100vh;
        position: relative;

        &__title {
            @include rowFlex(center, center);
            position: relative;
            width: 85%;

            & a {
                position: absolute;
                left: -10px;
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
