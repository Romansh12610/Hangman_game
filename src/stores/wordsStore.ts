import { defineStore } from 'pinia';
import type { CategoryData, CategoryNames } from '@/types/categoryData';
import { Ref, reactive } from 'vue';
import { useCategoryData } from '@/hooks/useCategoryData';
import { useAudioStore } from './audioStore';

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
    // for tracking active keys
    keyboardLetters: Set<string>;
    // health in %
    _playerHealth: number;
    isPlayerWin: boolean;
    isPlayerLose: boolean;
    isReceiveDamage: boolean;
    isGuessedLetter: boolean;
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
        keyboardLetters: new Set(),
        // player
        _playerHealth: 100,
        isPlayerWin: false,
        isPlayerLose: false,
        isReceiveDamage: false,
        isGuessedLetter: false,
        // todo: difficulty level 
    }),
    getters: {
        categoryNames: (state): CategoryNames[] | null => {
            if (state.categories == null) return null;

            return Object.keys(state.categories) as CategoryNames[];
        },
        isStateEmpty: (state) => {
            return state.currentLetterArray.length === 0 || state.currentWord === null || state.keyboardLetters.size === 0;
        },
        playerHealth: (state) => state._playerHealth,
    },
    actions: {
        setupCurrentWord(categoryName: CategoryNames) {
            if (this.categories && this.categories[categoryName]) {
                console.log("categories are: ", this.categories[categoryName]);
                // setup current word
                const words = this.categories[categoryName];
                const unguessedWords = words.filter(word => word.guessed === false);
                const randomWord = unguessedWords[Math.floor(Math.random() * unguessedWords.length)];
                this.currentWord = randomWord;

                // setup current wordArray & uniq letter seq
                const wordValue = randomWord.name;
                for (const letter of wordValue) {
                    this.currentLetterArray.push({
                        value: letter,
                        isGuessed: false,
                        isSpace: letter === ' ',
                    });
                    
                    const lowerCaseLetter = letter.toLowerCase();
                    // do not add spaces to set!
                    if (!this.uniqueLetters.has(lowerCaseLetter) || lowerCaseLetter !== ' ') {
                        this.uniqueLetters.add(lowerCaseLetter);
                    }
                }
                // setup keyboard
                this.setupKeyboardLetters();
            }
        },
        // keyboard
        setupKeyboardLetters() {
            this.keyboardLetters.clear();
            for (let letterCode = 97; letterCode <= 122; ++letterCode) {
                this.keyboardLetters.add(String.fromCharCode(letterCode));
            }
        },
        // categories
        async setupCategories(url: string, isLoading: Ref<boolean>, isError: Ref<boolean>) {
            const data = await useCategoryData<CategoryData>(url, isLoading, isError);

            if (data.value != null) {
                this.categories = data.value.categories;
                return true;
            }

            return false;
        },
        // clean up
        cleanUpCurrentState() {
            this.currentWord = null;
            this.currentLetterArray = [];
            this.uniqueLetters = reactive(new Set());
            this.guessedLetters = reactive(new Set());
            // player
            this._playerHealth = 100;
            this.isPlayerWin = false;
            this.isPlayerLose = false;
        },
        // btn action
        guessLetter(letter: string) {
            // terminate if Lose or Win game
            if (this.isPlayerLose || this.isPlayerWin) return;
            // if already guessed this letter
            if (this.guessedLetters.has(letter)) {
                return;
            }

            if (this.uniqueLetters.has(letter)) {
                const { playAudio } = useAudioStore();
                this.guessedLetters.add(letter);
                // add state
                this.isGuessedLetter = true;
                playAudio('guessSound');
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
            const { playAudio } = useAudioStore();

            this.isReceiveDamage = true;
            playAudio('damageSound');
            this._playerHealth -= 10;
            this.checkIfPlayerLose();
        },
        checkIfPlayerWin() {
            if (!this.currentWord || this.uniqueLetters.size === 0 || this.guessedLetters.size === 0) {
                return false;
            }
            
            const isPlayerWin = this.uniqueLetters.size === this.guessedLetters.size;

            if (isPlayerWin) {
                // end of game
                // timeout for smooth appearence of last letter
                setTimeout(() => {
                    const { playAudio } = useAudioStore();
                    playAudio('winSound');
                    this.isPlayerWin = true
                }, 800);
            }
        },
        checkIfPlayerLose() {
            const isPlayerLose = this.playerHealth <= 0;
            // end of game
            if (isPlayerLose) {
                setTimeout(() => {
                    const { playAudio } = useAudioStore();
                    playAudio('loseSound');
                    this.isPlayerLose = true
                }, 800);
            };
        },
        checkIfEmptyState() {
            const isEmpty = this.currentLetterArray.length === 0 || this.currentWord === null || this.keyboardLetters.size === 0;

            return isEmpty;
        },
        // cancel states
        cancelDamageState() {
            this.isReceiveDamage = false;
        },
        cancelGuessedState() {
            this.isGuessedLetter = false;
        },
    }
});