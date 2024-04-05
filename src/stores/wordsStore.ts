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
type LetterArray = Letter[];


// main state int
export interface WordsStoreState {
    categories: CategoryData['categories'] | null;
    currentWord: WordObject | null;
    currentLetterArray: LetterArray;
    // for faster event handling
    // and comparing with 'guessed letters'
    uniqueLetters: Set<string>;
    // sequence of guessed letters
    // to easy check if whole word guessed
    // (not iterate through array of objects)
    guessedLetters: Set<string>;
    // health in %
    playerHealth: number;
    isPlayerWin: boolean;
    isPlayerLose: boolean;
};


export const useWordsStore = defineStore('words', {
    state: (): WordsStoreState => ({
        // cached data
        categories: null,
        // word states
        currentWord: null,
        currentLetterArray: [],
        uniqueLetters: new Set(),
        guessedLetters: new Set(),
        // player
        playerHealth: 100,
        isPlayerWin: false,
        isPlayerLose: false,
        // todo: difficulty level 
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
                // clean up previous
                this.cleanUpCurrentState();
                // setup current word
                const words = this.categories[categoryName];
                const unguessedWords = words.filter(word => word.guessed === false);
                const randomWord = unguessedWords[Math.floor(Math.random() * unguessedWords.length)];
                this.currentWord = randomWord;

                // setup current wordArray & uniq letter seq
                const wordValue = randomWord.name;
                for (const letter of wordValue) {
                    this.currentLetterArray.push({
                        // uniform keys
                        value: letter,
                        isGuessed: false,
                        isSpace: letter === ' ',
                    });
                    
                    const lowerCaseLetter = letter.toLowerCase();
                    if (!this.uniqueLetters.has(lowerCaseLetter)) {
                        this.uniqueLetters.add(lowerCaseLetter);
                    }
                }
            }
        },
        // clean up
        cleanUpCurrentState() {
            this.currentWord = null;
            this.currentLetterArray = [];
            this.uniqueLetters = new Set();
            this.guessedLetters = new Set();
            // player
            this.playerHealth = 100;
            this.isPlayerWin = false;
            this.isPlayerLose = false;
        },
        // btn action
        guessLetter(letter: string) {
            if (this.uniqueLetters.has(letter)) {
                // if already guessed this letter
                if (this.guessedLetters.has(letter)) {
                    return;
                }

                this.guessedLetters.add(letter);
                // open letter
                for (const letterObj of this.currentLetterArray) {
                    if (letterObj.value.toLowerCase() === letter) {
                        letterObj.isGuessed = true;
                    }
                }
                // check if win
                this.checkIfPlayerWin();
            }
            // minus health
            else {
                this.damagePlayer();
            }
        }, 
        // Player state
        damagePlayer() {
            this.playerHealth -= 14;
            this.checkIfPlayerLose();
        },
        checkIfPlayerWin() {
            if (!this.currentWord || this.uniqueLetters.size === 0 || this.guessedLetters.size === 0) {
                return false;
            }
            
            const isPlayerWin = this.uniqueLetters.size === this.guessedLetters.size;

            if (isPlayerWin) {
                // end of game
                this.isPlayerWin = true;
            }
        },
        checkIfPlayerLose() {
            const isPlayerLose = this.playerHealth <= 0;
            // end of game
            if (isPlayerLose) {
                this.isPlayerLose = true;
            };
        }
    }
});