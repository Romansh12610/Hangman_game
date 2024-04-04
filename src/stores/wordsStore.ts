import { defineStore } from 'pinia';
import type { CategoryData, CategoryNames } from '@/types/categoryData';

export interface WordsStoreState {
    categories: CategoryData['categories'] | null;
};

export const useWordsStore = defineStore('words', {
    state: (): WordsStoreState => ({
        categories: null,
    }),
    getters: {
        categoryNames: (state): CategoryNames[] | null => {
            if (state.categories == null) return null;
            
            return Object.keys(state.categories) as CategoryNames[];
        }
    }
});