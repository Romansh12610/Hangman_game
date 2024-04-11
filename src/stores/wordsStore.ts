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
    currentCategory: CategoryNames | null;
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
    _maxPlayerHealth: number;
    _currPlayerHealth: number;
    _isPlayerWin: boolean;
    _isPlayerLose: boolean;
    isReceiveDamage: boolean;
    damageAmount: number;
    isGuessedLetter: boolean;
};


export const useWordsStore = defineStore('words', {
    state: (): WordsStoreState => ({
        // cached data
        categories: null,
        currentWord: null,
        currentCategory: null,
        currentLetterArray: [],
        uniqueLetters: new Set(),
        guessedLetters: new Set(),
        keyboardLetters: new Set(),
        // player
        _maxPlayerHealth: 100,
        _currPlayerHealth: 100,
        damageAmount: 10,
        _isPlayerWin: false,
        _isPlayerLose: false,
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
        playerHealth: (state) => state._currPlayerHealth,
        isPlayerWin: (state) => state._isPlayerWin,
        isPlayerLose: (state) => state._isPlayerLose,
    },
    actions: {
        setupCurrentWord(categoryName: CategoryNames) {
            if (this.categories && this.categories[categoryName]) {
                // do cleanup
                this.cleanUpCurrentState();
                this.currentCategory = categoryName;
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
                    if (!this.uniqueLetters.has(lowerCaseLetter) && lowerCaseLetter !== ' ') {
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
            this.currentCategory = null;
            this.currentLetterArray = [];
            this.uniqueLetters = reactive(new Set());
            this.guessedLetters = reactive(new Set());
            // player
            this._currPlayerHealth = 100;
            this._isPlayerWin = false;
            this._isPlayerLose = false;
        },
        // btn action
        guessLetter(letter: string) {
            // terminate if Lose or Win game
            if (this._isPlayerLose || this._isPlayerWin || this._currPlayerHealth <= 0) return;
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
        guessWord(guessedWord: string) {
            if (this.currentCategory == null || this.categories == null) return;
            
            for (let wordObj of this.categories[this.currentCategory]) {
                if (wordObj.name === guessedWord) {
                    wordObj.guessed = true;
                    return;
                }
            }
        },
        // Player state
        damagePlayer() {
            const { playAudio } = useAudioStore();

            this.isReceiveDamage = true;
            // calc 
            playAudio('damageSound');
            this._currPlayerHealth -= this.damageAmount;
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
                // add guessed word
                this.guessWord(this.currentWord.name);

                setTimeout(() => {
                    const { playAudio } = useAudioStore();
                    playAudio('winSound');
                    this._isPlayerWin = true;
                }, 800);
            }
        },
        checkIfPlayerLose() {
            const isPlayerLose = this._currPlayerHealth <= 0;
            // end of game
            if (isPlayerLose) {
                setTimeout(() => {
                    const { playAudio } = useAudioStore();
                    playAudio('loseSound');
                    this._isPlayerLose = true;
                }, 1000);
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