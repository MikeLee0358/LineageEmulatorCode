import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { useKnightStore } from '@/stores/knight'
import data from '@/data/dataRole.json'

export const useRoleStore = defineStore('role', () => {
    const storeKnight = useKnightStore()

    const status = reactive({
        data,
        currentRole: '', // depends on the VueRouter in RolesPage.vue Component
        currentGender: '' // depends on the VueRouter in RolesPage.vue Component
    })

    const inner = {
        gif_Url: () => {
            return `${status.currentRole}/${status.currentRole}_${status.currentGender}.gif`
        }
    }
    const outer = {
        current_Data: () => {
            return status.data[status.currentRole]
        },
        current_BackGround: () => {
            return `url(${outer.get_UrlForHashWhenProd(
                `${status.currentRole}/${status.currentRole}_background.webp`
            )})`
        },
        get_AC: () => {
            const roleEquips = outer.current_Data().equips
            const roleAC = outer.current_Data().basic.ac
            let totalEquipsAC = 0

            roleEquips.forEach((roleEquip) => {
                const isArmor = computed(() => /armor/.test(roleEquip.category))
                const calcTotalEquipAC = computed(
                    () => (totalEquipsAC += roleEquip.armor + roleEquip.value)
                )

                if (isArmor.value) calcTotalEquipAC.value
            })

            if (roleAC - totalEquipsAC === -40) storeKnight.outer.get_GameChatEvent('armor1')
            if (roleAC - totalEquipsAC === -45) storeKnight.outer.get_GameChatEvent('armor2')
            return roleAC - totalEquipsAC
        },
        get_MR: () => {
            const roleEquips = outer.current_Data().equips
            const roleMR = outer.current_Data().basic.mr
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
        get_ER: () => {
            //If the combat feature turns on, AC->ER for the darkElf, but not now.
            if (status.currentRole === 'darkElf') {
                return (
                    // Math.abs(get_AC() - outer.current_Data().basic.ac) +
                    outer.current_Data().basic.er
                )
            }
            return outer.current_Data().basic.er
        },
        get_GifUrl: () => {
            return `url(${outer.get_UrlForHashWhenProd(inner.gif_Url())})`
        },
        get_IsGenderType: (gender) => {
            return status.currentGender === gender
        },
        get_GenderClass: () => {
            if (status.currentGender === 'male')
                return `${status.currentRole} ${status.currentGender}`
            else if (status.currentGender === 'female')
                return `${status.currentRole} ${status.currentGender}`
        },
        calc_EquipAttribute: (string, equip) => {
            const equipToAttr = {
                力量手套: 'str',
                艾爾穆的祝福: 'dex',
                魔法能量之書: 'int',
                影子手套: 'con'
            }

            if (equip.isAttrEquip) {
                const attr = equipToAttr[equip.name]
                const plusAttr = computed(
                    () => (outer.current_Data().basic[attr] += equip.attribute[attr])
                )
                const minusAttr = computed(
                    () => (outer.current_Data().basic[attr] -= equip.attribute[attr])
                )

                if (string === 'plusAttribute') plusAttr.value
                else if (string === 'minusAttribute') minusAttr.value
            }
        },
        get_UrlForHashWhenProd: (name) => {
            return new URL(`/src/assets/${name}`, import.meta.url).href
        }
    }

    return {
        status,
        outer
    }
})
