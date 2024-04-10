<script setup lang="ts">
    import { computed } from 'vue';
    import MenuModal from './MenuModal.vue';
    import YouLose from './images/YouLose.vue';
    import YouWin from './images/YouWin.vue';
    import BtnWithText from './BtnWithText.vue';
    import { RoutePaths } from '@/router';
    import { useWordsStore } from '@/stores/wordsStore';
    import type { CategoryNames } from '@/types/categoryData';
    import Backdrop from './Backdrop.vue';

    type EndGameMode = 'lose' | 'win';

    const props = defineProps<{
        mode: EndGameMode;
        currentCategory: CategoryNames;
    }>();

    const renderWinSvg = computed(() => props.mode === 'win'); 
    const renderLoseSvg = computed(() => props.mode === 'lose'); 

    // restart game on "Continue"
    const store = useWordsStore();
    function restartGame() {
        store.cleanUpCurrentState();
        console.log('category is: ', props.currentCategory);
        store.setupCurrentWord(props.currentCategory);
    }

</script>

<template>
    <Teleport to="body">
        <MenuModal>
            <div class="container">
                <div class="svg_wrapper">
                    <YouLose v-if="renderLoseSvg" scale="1.4" />
                    <YouWin v-else-if="renderWinSvg" scale="1.4" />
                </div>
                <div class="menu_btns">
                    <BtnWithText btn-text="Continue" :is-restart="true" @restart="restartGame" />
                    <BtnWithText btn-text="New Category" :href="RoutePaths.PICK_CATEGORY" />
                    <BtnWithText btn-text="Quit game" :href="RoutePaths.ROOT" :is-quit-btn="true" />
                </div>
            </div>
        </MenuModal>
        <Backdrop />
    </Teleport>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .container {
        @include colFlex(center, center, rem(30));
    }
    .svg_wrapper {
        position: relative;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .menu_btns {
        @include colFlex(center, center, rem(30));
    }
</style>