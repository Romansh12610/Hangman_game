import { defineStore } from "pinia";
import { reactive } from "vue";

const basePath = "../assets/sounds";

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
        // pause other current playing sounds
        for (const sound of Object.values(sounds)) {
            if (!sound.paused) {
                sound.pause();
            }
        }
        // play new
        if (sounds[soundName].readyState === 4) {
            // if playback not at start -> reset
            if (sounds[soundName].currentTime > 0) {
                sounds[soundName].fastSeek(0);
            }
            sounds[soundName].play();
        }
    }
   
    return { 
        sounds,
        playAudio,
    };
});