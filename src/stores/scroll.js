import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scroll', () => {
    const status = reactive({
        targetScroll: null,
        clickTimerId: 0
    })

    const outer = {
        changeScroll: (string) => {
            switch (string) {
                case 'F6':
                    status.targetScroll = 'whiteArmor'
                    break

                case 'F7':
                    status.targetScroll = 'blessedArmor'
                    break

                case 'F8':
                    status.targetScroll = 'cursedArmor'
                    break
                case 'F10':
                    status.targetScroll = 'whiteWeapon'
                    break

                case 'F11':
                    status.targetScroll = 'blessedWeapon'
                    break

                case 'F12':
                    status.targetScroll = 'cursedWeapon'
                    break

                default:
                    status.targetScroll = null
                    break
            }
        },
        isScrollType: (type) => {
            return outer.getScrollType() === type
        },
        getScrollType: () => {
            if (status.targetScroll === null) return
            const reg = /(white)|(cursed)|(blessed)/g
            return reg.exec(status.targetScroll)[0]
        },
        getScrollEquipType: () => {
            if (status.targetScroll === null) return
            const reg = /(Armor)|(Weapon)/g
            return reg.exec(status.targetScroll)[0].toLocaleLowerCase()
        },
        clearClickScrollTimer: () => {
            clearInterval(status.clickTimerId)
        }
    }
    return {
        status,
        outer
    }
})
