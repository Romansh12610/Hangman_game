<script setup lang="ts">
    import { onBeforeMount, onMounted, onUnmounted, reactive, watch } from 'vue';
    import KeyboardBtn from './KeyboardBtn.vue';
    import { useWordsStore } from '@/stores/wordsStore';

    const lettersSet = reactive<Set<string>>(new Set());
    const store = useWordsStore();

    onBeforeMount(() => {
        for (let letterCode = 97; letterCode <= 122; ++letterCode) {
            lettersSet.add(String.fromCharCode(letterCode));
        }
    });
    
    // key pressing
    function handleKeyPress(e: KeyboardEvent) {
        const formattedChar = e.code.replace(/key/i, '').toLowerCase().trim();
        store.guessLetter(formattedChar);
    }

    // track guessed letters
    watch(() => store.guessedLetters, (newSet, oldSet) => {
        if (newSet.size > oldSet.size && lettersSet.size > 0) {

            newSet.forEach(value => {
                if (lettersSet.has(value)) {
                    lettersSet.delete(value);
                }
            });
        }
    });

    onMounted(() => window.addEventListener('keydown', handleKeyPress));
    onUnmounted(() => window.removeEventListener('keydown', handleKeyPress));
</script>

<template>
    <ul class="keyboard">
        <li v-for="letter in lettersSet">
            <KeyboardBtn :letter-value="letter" />
        </li>
    </ul>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .keyboard {
        @include rowFlex(center, center, rem(30));
        flex-wrap: wrap;
        margin-top: rem(10);
        width: clamp(rem(620), 80vw, rem(850));
    }
</style>