import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoleStore } from './role'
import { useKnightStore } from './knight'

export const useAudioStore = defineStore('audio', () => {
    const storeRole = useRoleStore()
    const storeKnight = useKnightStore()
    const state = ref(true)

    const getUrlForHashWhenProd = (name) =>
        //using this when need dynamic static files in the assets, otherwise will get 404 for static files. see more in https://vitejs.dev/guide/assets.html.
        new URL(`/src/assets/${name}`, import.meta.url).href

    const clickToPlayAudio = (url) => {
        const audio = new Audio(getUrlForHashWhenProd(url))
        //Safari: have to set play() to turn on audio , not autoplay like firefox or chrome
        audio.play()
    }

    const playAudio = () => {
        const audio = document.querySelector('audio')
        if (state.value) audio.play()
    }
    const pauseAudio = () => {
        const audio = document.querySelector('audio')
        if (state.value === false) audio.pause()
    }
    const getRoleAudioUrl = () => {
        if (storeKnight.game.isDeathKnight)
            return getUrlForHashWhenProd('knight/deathKnight_audio.mp3')
        else
            return getUrlForHashWhenProd(
                `${storeRole.role.currentRole}/${storeRole.role.currentRole}_audio.mp3`
            )
    }

    return {
        state,
        playAudio,
        pauseAudio,
        getRoleAudioUrl,
        clickToPlayAudio,
        getUrlForHashWhenProd
    }
})
