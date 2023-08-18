import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { useKnightStore } from './knight'
import data from '@/data/dataRole.json'

export const useRoleStore = defineStore('role', () => {
    const storeKnight = useKnightStore()

    const status = reactive({
        data,
        currentRole: '', // depends on the VueRouter in RolesPage.vue Component
        currentGender: '' // depends on the VueRouter in RolesPage.vue Component
    })

    const inner = {
        gifUrl: () => {
            return `${status.currentRole}/${status.currentRole}_${status.currentGender}.gif`
        }
    }
    const outer = {
        currentData: () => {
            return status.data[status.currentRole]
        },
        currentBackGround: () => {
            return `url(${outer.getUrlForHashWhenProd(
                `${status.currentRole}/${status.currentRole}_background.webp`
            )})`
        },
        getAC: () => {
            const roleEquips = outer.currentData().equips
            const roleAC = outer.currentData().basic.ac
            let totalEquipsAC = 0

            roleEquips.forEach((roleEquip) => {
                const isArmor = computed(() => /armor/.test(roleEquip.category))
                const calcTotalEquipAC = computed(
                    () => (totalEquipsAC += roleEquip.armor + roleEquip.value)
                )

                if (isArmor.value) calcTotalEquipAC.value
            })

            if (roleAC - totalEquipsAC === -40) storeKnight.getGameChatEvent('armor1')
            if (roleAC - totalEquipsAC === -45) storeKnight.getGameChatEvent('armor2')
            return roleAC - totalEquipsAC
        },
        getMR: () => {
            const roleEquips = outer.currentData().equips
            const roleMR = outer.currentData().basic.mr
            let totalEquipsMR = 0

            roleEquips.forEach((roleEquip) => {
                const isCloakType = computed(() => /cloak/.test(roleEquip.category))
                const isNotEquipMR = computed(() => {
                    return typeof roleEquip.mr !== 'number'
                })
                const calcTotalEquipMR = (type) => {
                    let rate
                    if (type === 'cloak') rate = 2
                    else rate = 1

                    totalEquipsMR += roleEquip.mr + roleEquip.value * rate
                }

                if (isNotEquipMR.value) return
                else if (isCloakType.value) calcTotalEquipMR('cloak')
                else calcTotalEquipMR()
            })

            return roleMR + totalEquipsMR
        },
        getER: () => {
            //If the combat feature turns on, AC->ER for the darkElf, but not now.
            if (status.currentRole === 'darkElf') {
                return (
                    // Math.abs(getAC() - outer.currentData().basic.ac) +
                    outer.currentData().basic.er
                )
            }
            return outer.currentData().basic.er
        },
        getGifUrl: () => {
            return `url(${outer.getUrlForHashWhenProd(inner.gifUrl())})`
        },
        isGenderType: (gender) => {
            return status.currentGender === gender
        },
        getGenderClass: () => {
            if (status.currentGender === 'male')
                return `${status.currentRole} ${status.currentGender}`
            else if (status.currentGender === 'female')
                return `${status.currentRole} ${status.currentGender}`
        },
        calcEquipAttribute: (string, equip) => {
            const equipToAttr = {
                力量手套: 'str',
                艾爾穆的祝福: 'dex',
                魔法能量之書: 'int',
                影子手套: 'con'
            }

            if (equip.isAttrEquip) {
                const attr = equipToAttr[equip.name]
                const plusAttr = computed(
                    () => (outer.currentData().basic[attr] += equip.attribute[attr])
                )
                const minusAttr = computed(
                    () => (outer.currentData().basic[attr] -= equip.attribute[attr])
                )

                if (string === 'plusAttribute') plusAttr.value
                else if (string === 'minusAttribute') minusAttr.value
            }
        },
        getUrlForHashWhenProd: (name) => {
            return new URL(`/src/assets/${name}`, import.meta.url).href
        }
    }

    return {
        status,
        outer
    }
})
