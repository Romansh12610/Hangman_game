import { defineStore } from 'pinia';
import type { WordsStoreState } from '@/types/categoryData';

export const useWordsStore = defineStore('words', {
    state: (): WordsStoreState => ({
        words: null,
    }),
});