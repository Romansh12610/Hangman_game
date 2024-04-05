import { defineStore } from 'pinia';
import type { CategoryData, CategoryNames } from '@/types/categoryData';

interface WordObject {
    name: string;
    guessed: boolean;
}

export type CategoryContents = WordObject[];

// for word guessing : array with letter objects
interface Letter {
    value: string;
    isGuessed: boolean;
    // spaces do not need to be guessed
    isSpace: boolean;
}
type WordArray = Letter[];


// main state int
export interface WordsStoreState {
    categories: CategoryData['categories'] | null;
    currentWord: WordObject | null;
    currentWordArray: WordArray;
    // for faster event handling
    // and comparing with 'guessed letters'
    uniqueLetters: Set<string>;
    // sequence of guessed letters
    // to easy check if whole word guessed
    // (not iterate through array of objects)
    guessedLetters: Set<string>;
};


export const useWordsStore = defineStore('words', {
    state: (): WordsStoreState => ({
        categories: null,
        currentWord: null,
        currentWordArray: [],
        uniqueLetters: new Set(),
        guessedLetters: new Set(),
    }),
    getters: {
        categoryNames: (state): CategoryNames[] | null => {
            if (state.categories == null) return null;

            return Object.keys(state.categories) as CategoryNames[];
        }
    },
    actions: {
        setupCurrentWord(categoryName: CategoryNames) {
            if (this.categories && this.categories[categoryName]) {
                // setup current word
                const words = this.categories[categoryName];
                const unguessedWords = words.filter(word => word.guessed === false);
                const randomWord = unguessedWords[Math.floor(Math.random() * unguessedWords.length)];
                this.currentWord = randomWord;

                // setup current wordArray & uniq letter seq
                const wordValue = randomWord.name;
                for (const letter of wordValue) {
                    this.currentWordArray.push({
                        value: letter,
                        isGuessed: false,
                        isSpace: letter === ' ',
                    });

                    if (!this.uniqueLetters.has(letter)) {
                        this.uniqueLetters.add(letter);
                    }
                }
            }
        },

        // check if whole word is guessed
        checkWordGuessStatus() {
            if (!this.currentWord || this.uniqueLetters.size === 0 || this.guessedLetters.size === 0) {
                return false;
            }
            
            return this.uniqueLetters.size === this.guessedLetters.size;
        }
    }
});