import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useScrollStore } from '@/stores/scroll'
import { useAlgorithmStore } from '@/stores/algorithm'

export const useChatStore = defineStore('chat', () => {
    const storeScroll = useScrollStore()
    const storeAlgorithm = useAlgorithmStore()

    const status = reactive({
        lines: Array(7)
    })

    const inner = {
        show_Number: () => {
            return storeAlgorithm.status.target.value < 0
                ? storeAlgorithm.status.target.value
                : `+${storeAlgorithm.status.target.value}`
        },

        detect_Color: () => {
            if (storeScroll.outer.get_IsScrollType('cursed')) return '黑色的'
            else if (storeAlgorithm.outer.get_IsCategoryType('weapon')) return '藍色的'
            else return '銀色的'
        },
        update_Armor: () => {
            inner.push_AndShiftArray('請選擇一種防具。')
        },
        update_Weapon: () => {
            inner.push_AndShiftArray('請選擇一種武器。')
        },
        update_ForOne: () => {
            inner.push_AndShiftArray(
                `${inner.show_Number()} ${
                    storeAlgorithm.status.target.name
                } 一瞬間發出 ${inner.detect_Color()} 光芒。`
            )
        },
        update_ForGone: () => {
            inner.push_AndShiftArray(
                `${inner.show_Number()} ${
                    storeAlgorithm.status.target.name
                } 產生激烈的 ${inner.detect_Color()} 光芒，一會兒後就消失了。`
            )
        },
        update_ForNope: () => {
            inner.push_AndShiftArray(
                `${inner.show_Number()} ${
                    storeAlgorithm.status.target.name
                } 持續發出 激烈的 ${inner.detect_Color()}光芒，但是沒有任何事情發生。`
            )
        },
        update_ForTwoUp: () => {
            inner.push_AndShiftArray(
                `${inner.show_Number()} ${
                    storeAlgorithm.status.target.name
                } 持續發出 ${inner.detect_Color()} 光芒。`
            )
        },
        push_AndShiftArray: (text) => {
            if (typeof text !== 'string') return

            status.lines.push(text)
            status.lines.shift()
        }
    }

    const outer = {
        clean_Chat: () => {
            status.lines = Array(7)
        },
        update_ChatScroll: () => {
            if (storeScroll.status.targetScroll === null) return
            if (storeScroll.status.targetScroll.includes('Armor')) inner.update_Armor()
            if (storeScroll.status.targetScroll.includes('Weapon')) inner.update_Weapon()
        },
        update_ChatState: () => {
            if (storeAlgorithm.status.dice.state === -1) inner.update_ForNope()
            else if (storeAlgorithm.status.dice.state === 0) inner.update_ForGone()
            else if (storeAlgorithm.status.dice.state === 1) inner.update_ForOne()
            else inner.update_ForTwoUp()
        }
    }

    return {
        status,
        outer
    }
})
