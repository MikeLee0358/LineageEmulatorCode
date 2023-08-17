import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vsharp from 'vite-plugin-vsharp'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vsharp()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    base: '/LineageEmulator/'
})
