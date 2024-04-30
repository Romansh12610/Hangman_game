<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue'
    import MenuModal from './MenuModal.vue'
    import YouLose from './images/YouLose.vue'
    import YouWin from './images/YouWin.vue'
    import BtnWithText from './BtnWithText.vue'
    import { RoutePaths } from '@/router'
    import { useWordsStore } from '@/stores/wordsStore'
    import type { CategoryNames } from '@/types/categoryData'
    import Backdrop from './Backdrop.vue'

    type EndGameMode = 'lose' | 'win';

    const props = defineProps<{
        mode: EndGameMode;
        currentCategory: CategoryNames;
    }>()

    const renderWinSvg = computed(() => props.mode === 'win')
    const renderLoseSvg = computed(() => props.mode === 'lose')

    // callbacks for btns
    const store = useWordsStore();
    function restartGame() {
        store.setupCurrentWord(props.currentCategory);
    }
    
    function cleanUpCurrentWord() {
        store.cleanUpCurrentState();
    }

    // for animation
    const animate = ref(false);
    onMounted(() => animate.value = true);

    const shouldShowWord = computed(() => props.mode === 'lose' && store.currentWord != null);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <MenuModal v-if="animate">
                <div class="container">
                    <div class="svg_wrapper">
                        <YouLose v-if="renderLoseSvg" scale="1.4" />
                        <YouWin v-else-if="renderWinSvg" scale="1.4" />
                    </div>
                    <div class="menu_btns">
                        <p 
                            class="guessed_word"
                            v-if="shouldShowWord"
                            >The word was: 
                            <span>{{ store.currentWord?.name }}</span>
                        </p>
                        <BtnWithText
                            btn-text="Continue"
                            @restart="restartGame"
                            :href="RoutePaths.PLAY_SCREEN"
                        />
                        <BtnWithText 
                            btn-text="New Category" 
                            @restart="cleanUpCurrentWord"
                            :href="RoutePaths.PICK_CATEGORY"
                        />
                        <BtnWithText
                            btn-text="Quit game"
                            @restart="cleanUpCurrentWord"
                            :is-quit-btn="true"
                            :href="RoutePaths.ROOT"
                        />
                    </div>
                </div>
            </MenuModal>
        </Transition>
        <Backdrop />
    </Teleport>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .container {
        @include colFlex(center, center);
        padding-inline: rem(30);
    }
    .svg_wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .menu_btns {
        @include colFlex(center, center, rem(20));
        margin-top: rem(70);
        & > .guessed_word {
            @include fontDefault(48);
            user-select: none;
            letter-spacing: rem(2);
            color: var(--white);
            line-height: 1.25;

            & > span {
                color: var(--pink);
                font-size: rem(20, em);
            }
        }
    }

    // End game animation
    @include fadeTransitionBottomTop(800, 30);
</style>
