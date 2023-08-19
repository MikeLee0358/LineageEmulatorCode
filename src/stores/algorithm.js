import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { useRoleStore } from '@/stores/role'
import { useScrollStore } from '@/stores/scroll'
import { useKnightStore } from '@/stores/knight'

export const useAlgorithmStore = defineStore('algorithm', () => {
    const storeRole = useRoleStore()
    const storeChat = useChatStore()
    const storeScroll = useScrollStore()
    const storeKnight = useKnightStore()

    const status = reactive({
        dice: {
            bonus: 0,
            value: null,
            state: null,
            successValue: null
        },
        target: {
            name: null,
            value: null,
            category: null,
            safetyValue: null
        }
    })

    const inner = {
        getDiceValue: () => {
            status.dice.value = Number((Math.random() * 100).toFixed(2))
        },
        resetAtTheEnd: (value) => {
            status.dice.state = value
            storeScroll.status.targetScroll = value
        },
        getEquipGoneEffect: (equip, event) => {
            let temporaryACbox = equip.armor
            let temporaryMRbox = equip.mr
            const toggleEquipHidden = () => event.target.classList.toggle('hidden')

            storeRole.outer.calcEquipAttribute('minusAttribute', equip)
            toggleEquipHidden()
            equip.armor = 0

            setTimeout(() => {
                toggleEquipHidden()
                equip.armor = temporaryACbox
                equip.mr = temporaryMRbox
                storeRole.outer.calcEquipAttribute('plusAttribute', equip)
            }, 3000)
        },
        handleFailure: (equip, event) => {
            if (Math.abs(status.target.value) === 9)
                storeKnight.outer.getGameChatEvent('weaponFailure')

            status.dice.state = 0
            storeChat.outer.updateChatState()
            status.target.value = 0
            inner.getEquipGoneEffect(equip, event)
            inner.resetAtTheEnd(null)
        },
        updateChatAndValue: (value) => {
            const updateEquipValue = () => {
                if (storeScroll.outer.isScrollType('cursed')) status.target.value--
                else status.target.value += status.dice.state
            }

            inner.getRandomStateOneTo(value)
            storeChat.outer.updateChatState()
            updateEquipValue()
            inner.resetAtTheEnd(null)
        },
        getTargetCategoryEquipType: () => {
            if (status.target.category === null) return
            return status.target.category.substring(0, 6).toLowerCase().trim()
        },
        getDiceSuccessValue: () => {
            const specialCases = () => {
                /* example with Weapon Formula */
                //white & blessed: -7 -8... successValue will be 33%, to prevent this situation happened return 100%
                //cursed: when +6 up use cursedScroll successValue will be 33%, to prevent this situation happened return 100%

                return (
                    (storeScroll.outer.isScrollType('white') && status.target.value < 0) ||
                    (storeScroll.outer.isScrollType('blessed') && status.target.value < 0) ||
                    (storeScroll.outer.isScrollType('cursed') &&
                        status.target.value >= Math.abs(status.target.safetyValue))
                )
            }
            const isValueOver9 = () => Math.abs(status.target.value) >= 9
            const isValueUnder4 = () => Math.abs(status.target.value) < 4
            const isValueUnderSafetyValue = () =>
                Math.abs(status.target.value) < Math.abs(status.target.safetyValue)
            const getWeaponSuccessValue = () => {
                /* Weapon Formula */
                //|underSafetyValue|:100%
                //|0~8|:33%
                //|9up|:10%
                if (isValueUnderSafetyValue())
                    return (status.dice.successValue = 100 + status.dice.bonus)

                if (isValueOver9()) status.dice.successValue = 10 + status.dice.bonus
                else status.dice.successValue = 33.33 + status.dice.bonus
            }
            const getArmorSuccessValue = () => {
                /* Armor Formula */
                //|underSafetyValue|:100%
                //|0~8|:1/n * 100% (if(n<4) 25%)
                //|9up|:10%
                if (isValueUnderSafetyValue())
                    return (status.dice.successValue = 100 + status.dice.bonus)

                if (isValueOver9()) status.dice.successValue = 10 + status.dice.bonus
                else if (isValueUnder4()) status.dice.successValue = 25 + status.dice.bonus
                else
                    status.dice.successValue =
                        (1 / Math.abs(status.target.value)) * 100 + status.dice.bonus
            }

            if (specialCases()) return (status.dice.successValue = 100)

            if (outer.isCategoryType('weapon')) getWeaponSuccessValue()
            else if (outer.isCategoryType('armor')) getArmorSuccessValue()
        },
        getRandomStateOneTo: (num) => {
            return (status.dice.state = Number(Math.floor(Math.random() * num) + 1))
        },
        updateChatAndValueOver9: (value) => {
            //white: 33% +1 66%: nothing happened message
            //cursed: 50% +1 50%: nothing happened message
            //blessed: 66% +1 33%: nothing happened message
            // status.dice.state:
            // -1: nothing happened msg
            //  1: +1 msg

            const isSuccessIn = (array) => array.includes(status.dice.state)

            inner.getRandomStateOneTo(value) // status.dice.state : 1 ~ 6

            if (storeScroll.outer.isScrollType('white') && isSuccessIn([1, 2])) {
                status.target.value++
                status.dice.state = 1
                storeKnight.outer.getGameChatEvent('weaponSuccess')
            } else if (storeScroll.outer.isScrollType('cursed') && isSuccessIn([1, 2, 3])) {
                status.target.value--
                status.dice.state = 1
                storeKnight.outer.getGameChatEvent('weaponSuccess')
            } else if (storeScroll.outer.isScrollType('blessed') && isSuccessIn([1, 2, 3, 4])) {
                status.target.value++
                status.dice.state = 1
                storeKnight.outer.getGameChatEvent('weaponSuccess')
            } else {
                //failure
                status.dice.state = -1
                storeKnight.outer.getGameChatEvent('weaponNope')
            }

            storeChat.outer.updateChatState()
            inner.resetAtTheEnd(null)
        },
        isSuccess: () => {
            inner.getDiceValue()
            inner.getDiceSuccessValue()

            return status.dice.successValue >= status.dice.value
        },
        isMatchedScrollEquipType: () => {
            return storeScroll.outer.getScrollEquipType() === inner.getTargetCategoryEquipType()
        }
    }

    const outer = {
        updateStatus: (equip) => {
            status.target.name = equip.name
            status.target.category = equip.category
            status.target.safetyValue = equip.safetyValue
            status.target.value = equip.value
        },
        isCategoryType: (text) => {
            if (status.target.category === null || typeof text !== 'string') return
            return status.target.category.toLowerCase().includes(text.toLowerCase())
        },
        algorithmSystem: (equip, event) => {
            /* The idea is separate "Success Rate" and "Scroll Type" */
            //1. click a equip
            //2. handle Success Rate
            //    ->  true -> Scroll Type  -> END
            //                -> if |9| up
            //                   -> success -> +1 & +1 message -> END
            //                   -> failure -> +0 & nothing happened message -> END
            //    ->  false -> END
            if (storeKnight.status.isStopFunction) return
            if (!inner.isMatchedScrollEquipType()) return

            if (inner.isSuccess()) {
                switch (storeScroll.outer.getScrollType()) {
                    case 'blessed':
                        if (status.target.value < 3) return inner.updateChatAndValue(3)
                        else if (status.target.value < 6) return inner.updateChatAndValue(2)
                        else if (status.target.value < 9) return inner.updateChatAndValue(1)
                        else inner.updateChatAndValueOver9(6)
                        break

                    case 'white':
                        if (status.target.value < 9) return inner.updateChatAndValue(1)
                        else inner.updateChatAndValueOver9(6)
                        break

                    case 'cursed':
                        if (status.target.value > -9) return inner.updateChatAndValue(1)
                        else inner.updateChatAndValueOver9(6)
                        break
                }
            } else inner.handleFailure(equip, event)
        }
    }

    return {
        status,
        outer
    }
})
