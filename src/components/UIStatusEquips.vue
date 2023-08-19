<template lang="pug">
ul.uiStatusEquips
    li.equip(v-for='equip in storeRole.outer.currentData().equips' :key='equip.id' :class='equip.category' :style='{backgroundImage: `url(${storeRole.outer.getUrlForHashWhenProd(equip.src)})`}' @click.stop='getDataForAlgorithm(equip, $event)' :data-displayequipinfo='getEquipInfo(equip)')

</template>

<script setup>
import { useRoleStore } from '@/stores/role'
import { useScrollStore } from '@/stores/scroll'
import { useKnightStore } from '@/stores/knight'
import { useAlgorithmStore } from '@/stores/algorithm'
const storeRole = useRoleStore()
const storeAlgorithm = useAlgorithmStore()
const storeScroll = useScrollStore()
const storeKnight = useKnightStore()

const changeCursor = () => {
    if (storeScroll.status.targetScroll === null)
        return `url(${storeRole.outer.getUrlForHashWhenProd('UI/UI_pointer.webp')}), auto`
    else return `url(${storeRole.outer.getUrlForHashWhenProd('UI/UI_target.webp')}), auto`
}
const getEquipInfo = (equip) => {
    const showPlusOrMinus = (value) => (value >= 0 ? `+${value}` : value)

    const getName = () => {
        const nameArmor = () => `${showPlusOrMinus(equip.value)} ${equip.name} (使用中)
防禦 ${equip.armor}${showPlusOrMinus(equip.value)}`

        const nameWeapon = () =>
            `${showPlusOrMinus(equip.value)} ${equip.name} (揮舞)
攻擊力 ${equip.attack.small}${showPlusOrMinus(equip.value)}/${equip.attack.large}${showPlusOrMinus(
                equip.value
            )}` + isTwoHandsWeapon()

        const nameJewelry = () => {
            if (
                storeRole.status.currentRole === 'knight' &&
                storeRole.status.currentGender === 'male' &&
                equip.category.includes('right-ring')
            )
                return (equip.name = `點擊變身`)
            else if (
                storeRole.status.currentRole === 'knight' &&
                storeRole.status.currentGender === 'female' &&
                equip.category.includes('right-ring')
            )
                return (equip.name = `形體控制戒指 (使用中)`)
            else return `${equip.name} (使用中)`
        }

        const isTwoHandsWeapon = () => (/雙手武器/.test(equip.grip) ? '\n  雙手武器' : '')

        if (equip.category === 'weapon') return nameWeapon()
        else if (equip.category.includes('armor')) return nameArmor()
        else if (equip.category.includes('jewelry')) return nameJewelry()
    }

    const getFeature = () => {
        //Jewelries are not opened yet
        const getFeatureText = () => {
            const showMR = () => {
                if (equip.mr === undefined) return ''

                if (/cloak/.test(equip.category)) {
                    return showPlusOrMinus(equip.mr + equip.value * 2)
                } else if (/helmet|bodyArmor/.test(equip.category)) {
                    return showPlusOrMinus(equip.mr + equip.value)
                }
            }
            return `可使用職業:
${equip.occupation}
  ${equip.feature} ${showMR()}`
        }
        const getNonFeatureText = () => `可使用職業:
${equip.occupation}`

        if (!equip.feature) return getNonFeatureText()
        if (equip.category.includes('jewelry')) return ''
        return getFeatureText()
    }

    const getMaterial = () => {
        //Jewelries are not opened yet
        if (equip.category.includes('jewelry')) return ''
        return `材質:${equip.material}
  重量 ${equip.weight}`
    }

    return `${getName()}
  ${getFeature()}
  ${getMaterial()}`
}
const assignColorToEquipText = (index) => {
    const role = storeRole.status.currentRole
    const equips = storeRole.outer.currentData().equips

    const listColor = {
        grey: 'var(--color-grey)',
        white: 'var(--color-white)',
        yellow: 'var(--color-yellow)',
        red: 'var(--color-red)'
    }
    const listArmorType = [
        { index: 0, armorType: 'weapon' },
        { index: 1, armorType: 'helmet' },
        { index: 2, armorType: 'amulet' },
        { index: 3, armorType: 'shirt' },
        { index: 4, armorType: 'bodyArmor' },
        { index: 5, armorType: 'cloak' },
        { index: 6, armorType: 'left-ring' },
        { index: 7, armorType: 'belt' },
        { index: 8, armorType: 'shield' },
        { index: 9, armorType: 'gloves' },
        { index: 10, armorType: 'right-ring' },
        { index: 11, armorType: 'boots' }
    ]

    const handleColorToEquipText = ({ index, armorType }) => {
        if (equips[index].category.includes(armorType)) {
            switch (role) {
                case 'royal':
                    if (armorType === 'cloak') return listColor.yellow
                    break

                default:
                    return listColor.white
            }
        }
    }
    return handleColorToEquipText(listArmorType[index])
}

const getDataForAlgorithm = (equip, event) => {
    //event parameter is used for when equip was gone.
    const updateEquipValue = () =>
        setTimeout(() => (equip.value = storeAlgorithm.status.target.value), 0)

    if (equip.name === '點擊變身' && storeKnight.status.isDeathKnight) {
        storeKnight.outer.getGameChatEvent('toBeKnight')
    } else if (equip.name === '點擊變身' && !storeKnight.status.isDeathKnight)
        storeKnight.outer.getGameChatEvent('toBeDeathKnight')

    storeAlgorithm.outer.updateStatus(equip)

    storeAlgorithm.outer.algorithmSystem(equip, event)
    updateEquipValue()
}
</script>

<style lang="scss" scoped>
@use '@/scss/common.scss';

.uiStatusEquips {
    position: absolute;
    inset: 0;
    z-index: 1; // to make equipInfo override tree img in mage role situation

    &:hover {
        cursor: v-bind(changeCursor());
    }

    .equip {
        position: absolute;
        width: 11%;
        height: 9%;
        color: transparent;
        opacity: 1;
        transition: opacity 1s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        @extend %backgroundCoverRound;

        &::after {
            content: attr(data-displayEquipInfo);
            position: absolute;
            top: 102%;
            z-index: 1;
            width: 375%;
            border-width: 0.22vw;
            display: none;

            font-size: 1.3vw;
            line-height: 100%;
            @extend %templateInfoStyle;
            color: var(--color-white);
        }

        &:hover::after {
            display: block;
        }

        &.weapon {
            top: 52.35%;
            left: 35.25%;
        }

        &.armor {
            &.helmet {
                top: 13.75%;
                left: 70%;
                z-index: 2;
            }

            &.shirt {
                top: 31.25%;
                left: 46.5%;
                z-index: 1;
            }

            &.bodyArmor {
                top: 31.25%;
                left: 58.5%;
                z-index: 1;
            }

            &.cloak {
                &::after {
                    color: v-bind(assignColorToEquipText(5));
                }

                top: 31.5%;
                left: 70.5%;
                z-index: 1;
            }

            &.shield {
                top: 44.5%;
                left: 78%;
            }

            &.gloves {
                top: 49%;
                left: 47.5%;
            }

            &.boots {
                top: 80%;
                left: 76.5%;
            }
        }

        &.jewelry {
            &.amulet {
                top: 19.5%;
                left: 57.75%;
            }

            &.left-ring {
                top: 42.2%;
                left: 33.75%;
            }

            &.belt {
                top: 41.3%;
                left: 63.75%;
            }

            &.right-ring {
                top: 55%;
                left: 76.5%;
            }

            &.amulet::after,
            &.belt::after,
            &.left-ring::after,
            &.right-ring::after {
                color: var(--color-grey);
                border: unset;
                background: unset;
                padding: unset;
                white-space: nowrap;
            }
        }
    }
}

.hidden {
    visibility: hidden;
    opacity: 0 !important;
}
</style>
