<script setup lang="ts">
    import { onBeforeMount, onMounted, onUnmounted, reactive } from 'vue';
    import KeyboardBtn from './KeyboardBtn.vue';
    import { useWordsStore } from '@/stores/wordsStore';

    const lettersArray = reactive<string[]>([]);
    const store = useWordsStore();

    onBeforeMount(() => {
        for (let letterCode = 97; letterCode <= 122; ++letterCode) {
            lettersArray.push(String.fromCharCode(letterCode));
        }
    });
    
    // key pressing
    function handleKeyPress(e: KeyboardEvent) {
        const formattedChar = e.code.replace(/key/i, '').toLowerCase().trim();
        store.guessLetter(formattedChar);
    }

    onMounted(() => window.addEventListener('keydown', handleKeyPress));
    onUnmounted(() => window.removeEventListener('keydown', handleKeyPress));
</script>

<template>
    <ul class="keyboard">
        <li v-for="letter in lettersArray">
            <KeyboardBtn :letter-value="letter" />
        </li>
    </ul>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .keyboard {
        @include rowFlex(center, center, rem(30));
        flex-wrap: wrap;
        margin-top: rem(40);
        max-width: 80vw;
    }
</style>