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
        click_ToPlayAudio: (url) => {
            const audio = new Audio(outer.get_UrlForHashWhenProd(url))
            //Safari: have to set play() to turn on audio , not autoplay like firefox or chrome
            audio.play()
        },
        play_Audio: () => {
            const audio = document.querySelector('audio')
            if (status.isOn) audio.play()
        },
        pause_Audio: () => {
            const audio = document.querySelector('audio')
            if (status.isOn === false) audio.pause()
        },
        get_RoleAudioUrl: () => {
            if (storeKnight.status.isDeathKnight)
                return outer.get_UrlForHashWhenProd('knight/deathKnight_audio.mp3')
            else
                return outer.get_UrlForHashWhenProd(
                    `${storeRole.status.currentRole}/${storeRole.status.currentRole}_audio.mp3`
                )
        },
        get_UrlForHashWhenProd: (name) => {
            return new URL(`/src/assets/${name}`, import.meta.url).href
        },
        show_OnOff: () => {
            return status.isOn ? '開' : '關'
        }
    }

    return {
        status,
        outer
    }
})
