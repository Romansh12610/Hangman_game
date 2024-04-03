<script setup lang="ts">
    import PickCategory from '@/components/images/PickCategory.vue'
    import BackLink from '@/components/BackLink.vue'
    import { RoutePaths } from '@/router'
    import { onMounted, ref } from 'vue'
    import type { CategoryData } from "@/types/categoryData"
    import Spinner from "@/components/Spinner.vue"
    //import BtnWithText from '@/components/BtnWithText.vue'

    const data = ref<CategoryData | null>(null);
    const isLoading = ref(false);
    const isError = ref(false);

    async function getCategoryData(): Promise<CategoryData | null> {
        try {
            isError.value = false;
            isLoading.value = true;

            const response = await fetch('/data.json');
            await new Promise(res => setTimeout(res, 1000));
            
            //isLoading.value = false;
            return response.json as unknown as Promise<CategoryData>
        } catch {
            isLoading.value = false;
            isError.value = true;
            return null;
        }
    }

    onMounted(async () => {
        data.value = await getCategoryData();    
    });
</script>

<template>
    <section class="pick-section">
        <BackLink :href="RoutePaths.ROOT" style="position: absolute; left: 0;" />
        <PickCategory scale="2.7" style="margin-top: 2rem" />
        <Spinner v-if="isLoading" />
        <div v-else="data" class="pick-section__categories">
        </div>
    </section>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .pick-section {
        @include colFlex(center, flex-start, rem(30));

        margin: rem(30) rem(35) 0;
        width: max(1030px, 100%);
        min-height: 100vh;
        position: relative;

        &__categories {
            display: grid;
            grid-template-columns: repeat(3, minmax(rem(200), rem(300)));
            column-gap: rem(30);
        }
    }
</style>
