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
        get_DiceValue: () => {
            status.dice.value = Number((Math.random() * 100).toFixed(2))
        },
        reset_AtTheEnd: (value) => {
            status.dice.state = value
            storeScroll.status.targetScroll = value
        },
        get_EquipGoneEffect: (equip, event) => {
            let temporaryACbox = equip.armor
            let temporaryMRbox = equip.mr
            const toggleEquipHidden = () => event.target.classList.toggle('hidden')

            storeRole.outer.calc_EquipAttribute('minusAttribute', equip)
            toggleEquipHidden()
            equip.armor = 0

            setTimeout(() => {
                toggleEquipHidden()
                equip.armor = temporaryACbox
                equip.mr = temporaryMRbox
                storeRole.outer.calc_EquipAttribute('plusAttribute', equip)
            }, 3000)
        },
        handle_Failure: (equip, event) => {
            if (Math.abs(status.target.value) === 9)
                storeKnight.outer.get_GameChatEvent('weaponFailure')

            status.dice.state = 0
            storeChat.outer.update_ChatState()
            status.target.value = 0
            inner.get_EquipGoneEffect(equip, event)
            inner.reset_AtTheEnd(null)
        },
        update_ChatAndValue: (value) => {
            const update_EquipValue = () => {
                if (storeScroll.outer.get_IsScrollType('cursed')) status.target.value--
                else status.target.value += status.dice.state
            }

            inner.get_RandomStateOneTo(value)
            storeChat.outer.update_ChatState()
            update_EquipValue()
            inner.reset_AtTheEnd(null)
        },
        get_TargetCategoryEquipType: () => {
            if (status.target.category === null) return
            return status.target.category.substring(0, 6).toLowerCase().trim()
        },
        get_DiceSuccessValue: () => {
            const specialCases = () => {
                /* example with Weapon Formula */
                //white & blessed: -7 -8... successValue will be 33%, to prevent this situation happened return 100%
                //cursed: when +6 up use cursedScroll successValue will be 33%, to prevent this situation happened return 100%
                return (
                    (storeScroll.outer.get_IsScrollType('white') && status.target.value < 0) ||
                    (storeScroll.outer.get_IsScrollType('blessed') && status.target.value < 0) ||
                    (storeScroll.outer.get_IsScrollType('cursed') &&
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

            if (outer.get_IsCategoryType('weapon')) getWeaponSuccessValue()
            else if (outer.get_IsCategoryType('armor')) getArmorSuccessValue()
        },
        get_RandomStateOneTo: (num) => {
            return (status.dice.state = Number(Math.floor(Math.random() * num) + 1))
        },
        update_ChatAndValueOver9: (value) => {
            //white: 33% +1 66%: nothing happened message
            //cursed: 50% +1 50%: nothing happened message
            //blessed: 66% +1 33%: nothing happened message
            // status.dice.state:
            // -1: nothing happened msg
            //  1: +1 msg
            const isSuccessIn = (array) => array.includes(status.dice.state)

            inner.get_RandomStateOneTo(value) // status.dice.state : 1 ~ 6

            if (storeScroll.outer.get_IsScrollType('white') && isSuccessIn([1, 2])) {
                status.target.value++
                status.dice.state = 1
                storeKnight.outer.get_GameChatEvent('weaponSuccess')
            } else if (storeScroll.outer.get_IsScrollType('cursed') && isSuccessIn([1, 2, 3])) {
                status.target.value--
                status.dice.state = 1
                storeKnight.outer.get_GameChatEvent('weaponSuccess')
            } else if (storeScroll.outer.get_IsScrollType('blessed') && isSuccessIn([1, 2, 3, 4])) {
                status.target.value++
                status.dice.state = 1
                storeKnight.outer.get_GameChatEvent('weaponSuccess')
            } else {
                //failure
                status.dice.state = -1
                storeKnight.outer.get_GameChatEvent('weaponNope')
            }

            storeChat.outer.update_ChatState()
            inner.reset_AtTheEnd(null)
        },
        get_IsSuccess: () => {
            inner.get_DiceValue()
            inner.get_DiceSuccessValue()

            return status.dice.successValue >= status.dice.value
        },
        get_IsMatchedScrollEquipType: () => {
            return storeScroll.outer.get_ScrollEquipType() === inner.get_TargetCategoryEquipType()
        }
    }

    const outer = {
        update_Status: (equip) => {
            status.target.name = equip.name
            status.target.category = equip.category
            status.target.safetyValue = equip.safetyValue
            status.target.value = equip.value
        },
        get_IsCategoryType: (text) => {
            if (status.target.category === null || typeof text !== 'string') return
            return status.target.category.toLowerCase().includes(text.toLowerCase())
        },
        do_Algorithm: (equip, event) => {
            /* The idea is separate "Success Rate" and "Scroll Type" */
            //1. click a equip
            //2. handle Success Rate
            //    ->  true -> Scroll Type  -> END
            //                -> if |9| up
            //                   -> success -> +1 & +1 message -> END
            //                   -> failure -> +0 & nothing happened message -> END
            //    ->  false -> END
            if (storeKnight.status.isStopFunction) return
            if (!inner.get_IsMatchedScrollEquipType()) return

            if (inner.get_IsSuccess()) {
                switch (storeScroll.outer.get_ScrollType()) {
                    case 'blessed':
                        if (status.target.value < 3) return inner.update_ChatAndValue(3)
                        else if (status.target.value < 6) return inner.update_ChatAndValue(2)
                        else if (status.target.value < 9) return inner.update_ChatAndValue(1)
                        else inner.update_ChatAndValueOver9(6)
                        break

                    case 'white':
                        if (status.target.value < 9) return inner.update_ChatAndValue(1)
                        else inner.update_ChatAndValueOver9(6)
                        break

                    case 'cursed':
                        if (status.target.value > -9) return inner.update_ChatAndValue(1)
                        else inner.update_ChatAndValueOver9(6)
                        break
                }
            } else inner.handle_Failure(equip, event)
        }
    }

    return {
        status,
        outer
    }
})
