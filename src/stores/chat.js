import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useScrollStore } from './scroll'
import { useAlgorithmStore } from './algorithm'

export const useChatStore = defineStore('chat', () => {
    const storeScroll = useScrollStore()
    const storeAlgorithm = useAlgorithmStore()

    const status = reactive({
        lines: Array(7),
    })

    const inner = {
        showNumber: () => {
            return storeAlgorithm.target.value < 0
                ? storeAlgorithm.target.value
                : `+${storeAlgorithm.target.value}`
        },

        detectColor: () => {
            if (storeScroll.outer.isScrollType('cursed')) return '黑色的'
            else if (storeAlgorithm.isCategoryType('weapon')) return '藍色的'
            else return '銀色的'
        },
        updateArmor: () => {
            inner.pushAndShiftArray('請選擇一種防具。')
        },
        updateWeapon: () => {
            inner.pushAndShiftArray('請選擇一種武器。')
        },
        updateForOne: () => {
            inner.pushAndShiftArray(
                `${inner.showNumber()} ${storeAlgorithm.target.name} 一瞬間發出 ${inner.detectColor()} 光芒。`
            )
        },
        updateForGone: () => {
            inner.pushAndShiftArray(
                `${inner.showNumber()} ${storeAlgorithm.target.name} 產生激烈的 ${inner.detectColor()} 光芒，一會兒後就消失了。`
            )
        },
        updateForNope: () => {
            inner.pushAndShiftArray(
                `${inner.showNumber()} ${storeAlgorithm.target.name} 持續發出 激烈的 ${inner.detectColor()}光芒，但是沒有任何事情發生。`
            )
        },
        updateForTwoUp: () => {
            inner.pushAndShiftArray(
                `${inner.showNumber()} ${storeAlgorithm.target.name} 持續發出 ${inner.detectColor()} 光芒。`
            )
        },
        pushAndShiftArray: (text) => {
            if (typeof text !== 'string') return

            status.lines.push(text)
            status.lines.shift()
        }
    }

    const outer = {
        cleanChat: () => {
            status.lines = Array(7)
        },
        updateChatScroll: () => {
            if (storeScroll.status.targetScroll === null) return
            if (storeScroll.status.targetScroll.includes('Armor')) inner.updateArmor()
            if (storeScroll.status.targetScroll.includes('Weapon')) inner.updateWeapon()
        },
        updateChatState: () => {
            if (storeAlgorithm.dice.state === -1) inner.updateForNope()
            else if (storeAlgorithm.dice.state === 0) inner.updateForGone()
            else if (storeAlgorithm.dice.state === 1) inner.updateForOne()
            else inner.updateForTwoUp()
        }

    }

    return {
        status,
        outer
    }
})
