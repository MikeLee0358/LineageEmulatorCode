import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRoleStore } from '@/stores/role'
import { useKnightStore } from '@/stores/knight'

export const useAudioStore = defineStore('audio', () => {
    const storeRole = useRoleStore()
    const storeKnight = useKnightStore()

    const status = reactive({
        isOn: true
    })

    const outer = {
        clickToPlayAudio: (url) => {
            const audio = new Audio(outer.getUrlForHashWhenProd(url))
            //Safari: have to set play() to turn on audio , not autoplay like firefox or chrome
            audio.play()
        },
        playAudio: () => {
            const audio = document.querySelector('audio')
            if (status.isOn) audio.play()
        },
        pauseAudio: () => {
            const audio = document.querySelector('audio')
            if (status.isOn === false) audio.pause()
        },
        getRoleAudioUrl: () => {
            if (storeKnight.status.isDeathKnight)
                return outer.getUrlForHashWhenProd('knight/deathKnight_audio.mp3')
            else
                return outer.getUrlForHashWhenProd(
                    `${storeRole.status.currentRole}/${storeRole.status.currentRole}_audio.mp3`
                )
        },
        getUrlForHashWhenProd: (name) => {
            return new URL(`/src/assets/${name}`, import.meta.url).href
        },
        showTextBgm: () => {
            return status.isOn ? '開' : '關'
        }
    }

    return {
        status,
        outer
    }
})
