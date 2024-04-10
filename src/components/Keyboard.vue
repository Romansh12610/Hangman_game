<script setup lang="ts">
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import KeyboardBtn from './KeyboardBtn.vue';
    import { useWordsStore } from '@/stores/wordsStore';

    const store = useWordsStore();
    // for excluding letters from set
    const guessedLetter = ref('');
    
    // key pressing
    function handleKeyPress(e: KeyboardEvent) {
        const formattedChar = e.code.replace(/key/i, '').toLowerCase().trim();
        // check if value is in the current keyboard!
        // dont damage player if it presses wrong btn again
        if (!store.keyboardLetters.has(formattedChar)) {
            return;
        }
        guessedLetter.value = formattedChar;
        store.guessLetter(formattedChar);
    }

    // track guessed letters
    watch(guessedLetter, (letter) => {
        if (store.keyboardLetters.has(letter)) {
            store.keyboardLetters.delete(letter);
        }
    });

    onMounted(() => window.addEventListener('keydown', handleKeyPress));
    onUnmounted(() => window.removeEventListener('keydown', handleKeyPress));
</script>

<template>
    <TransitionGroup name="key_list" class="keyboard" tag="ul">
        <li v-for="letter in store.keyboardLetters" :key="letter">
            <KeyboardBtn :letter-value="letter" />
        </li>
    </TransitionGroup>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .keyboard {
        @include rowFlex(flex-start, center, rem(20));
        flex-wrap: wrap;
        margin-top: rem(10);
        width: clamp(rem(620), 70%, rem(850));
        position: relative;

        & > li {
            // for z-index on leaving elems
            position: relative;
            z-index: 1;
        }
    }

    // transition state
    .key_list-move {
        transition: all 0.45s ease-in-out;
    }

    .key_list-enter-active, 
    .key_list-leave-active {
        transition: all 0.45s ease-in-out;
    }

    
    // in dom state
    .key_list-enter-to,
    .key_list-leave-from {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    
    // not in dom state
    .key_list-enter-from, 
    .key_list-leave-to {
        transform: translateY(100%) scale(0.3);
        opacity: 0;
        z-index: 0;
    }

    // for moving elems
    .key_list-leave-active {
        position: absolute;
    }
</style>