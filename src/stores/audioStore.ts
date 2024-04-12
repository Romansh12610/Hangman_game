import { defineStore } from "pinia";
import { reactive } from "vue";

const basePath = "/sounds";

const audioPaths = {
    WIN: `${basePath}/win.wav`,
    LOSE: `${basePath}/lose.wav`,
    DAMAGE: `${basePath}/damage.wav`,
    GUESS: `${basePath}/guess.wav`,
};

interface AudioStoreState {
    sounds: {
        winSound: HTMLAudioElement;
        loseSound: HTMLAudioElement;
        damageSound: HTMLAudioElement;
        guessSound: HTMLAudioElement;
    },
    playAudio: (soundName: SoundName) => void;
    updateVolume: (value: number, soundName?: SoundName) => void;
}

type Sounds = AudioStoreState['sounds'];
type SoundName = keyof Sounds;

export const useAudioStore = defineStore('audio', (): AudioStoreState => {
    // state
    const sounds: Sounds = reactive({
        winSound: new Audio(audioPaths.WIN),
        loseSound: new Audio(audioPaths.LOSE),
        damageSound: new Audio(audioPaths.DAMAGE),
        guessSound: new Audio(audioPaths.GUESS),
    });
    
    // actions and methods
    function playAudio(soundName: SoundName) {
        sounds[soundName].fastSeek(0);
        sounds[soundName].play();
    }

    function updateVolume(value: number, soundName?: SoundName) {
        if (value >= 0 && value <= 1) {
            if (!soundName) {
                for (const sound of Object.values(sounds)) {
                    sound.volume = value;
                }
            }
            else {
                sounds[soundName].volume = value;
            }
        }
    }
   
    return { 
        sounds,
        playAudio,
        updateVolume,
    };
});