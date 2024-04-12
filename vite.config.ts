import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    base: '/Hangman-game/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            // util styles
            'ut': fileURLToPath(new URL('./src/styles/utils', import.meta.url)),
        }
    }
})
