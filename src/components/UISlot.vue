<template lang="pug">
section.uiSlot(@click.stop='handle_Click')
    figure(v-for='slot in slotList' :key='slot.id' :class='slot.hotkey')
        img(:src='storeRole.outer.get_UrlForHashWhenProd(slot.src)')
        figcaption.slotInfo
            h1 {{ slot.name }}
            p {{ slot.description }}
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useRoleStore } from '@/stores/role'
import { useScrollStore } from '@/stores/scroll'
import { onBeforeRouteLeave } from 'vue-router'
import dataSlot from '@/data/dataSlot.json'
const cssColor = ref('')
const slotList = ref(dataSlot)
const storeRole = useRoleStore()
const storeChat = useChatStore()
const storeScroll = useScrollStore()

const handle_Click = (e) => {
    const get_ScrollClass = (e) => {
        if (e.target.tagName !== 'IMG') return
        return e.target.parentElement.classList[0] //F5 ~F12
    }
    storeScroll.outer.clear_ClickScrollTimer()
    handle_ScrollStateAndInfo(get_ScrollClass(e), true)
}
const handle_Keyboard = (e) => {
    e.preventDefault()
    e.stopPropagation()
    storeScroll.outer.clear_ClickScrollTimer()
    handle_ScrollStateAndInfo(e.key)
}

const handle_ScrollStateAndInfo = (classOrKey, isRepeatState = false) => {
    //classOrKey required string F5 or F6 ... F12
    const uiSlots = Array.from(document.querySelector('.uiSlot').children)
    const get_CssColor = (imgUrlString) => {
        //control primary colors to display text color through js logic
        const color = {
            grey: 'var(--color-grey)',
            white: 'var(--color-white)',
            yellow: 'var(--color-yellow)',
            red: 'var(--color-red)'
        }
        if (/blessed/.test(imgUrlString)) return (cssColor.value = color.yellow)
        if (/cursed/.test(imgUrlString)) return (cssColor.value = color.red)
        return (cssColor.value = color.white)
    }
    uiSlots.forEach((slot) => {
        const handle_SlotInfoOpacity = (value) => {
            slot.lastElementChild.style.opacity = value
        }
        const remove_SlotClass = (className) => slot.classList.remove(className)
        const add_SlotClass = (className) => slot.classList.add(className)

        remove_SlotClass('active')
        handle_SlotInfoOpacity(0)

        if (slot.className === classOrKey) {
            if (isRepeatState)
                storeScroll.status.clickTimerId = setInterval(
                    () => storeScroll.outer.change_Scroll(classOrKey),
                    750
                )
            storeScroll.outer.change_Scroll(classOrKey)
            get_CssColor(slot.firstChild.src)
            add_SlotClass('active')
            handle_SlotInfoOpacity(1)
            storeChat.outer.update_ChatScroll()
        }
    })
}
onMounted(() => document.addEventListener('keydown', handle_Keyboard))
onBeforeRouteLeave(() => document.removeEventListener('keydown', handle_Keyboard))
</script>

<style lang="scss" scoped>
@use '@/scss/common.scss';

.uiSlot {
    grid-area: uiSlot;
    position: relative;
    padding: 3.75% 3.75% 3% 4%;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(2, 50%);

    .slotInfo {
        position: absolute;
        left: 0;
        right: 0%;
        bottom: 100%;
        opacity: 0;
        font-size: clamp(12px, 2rem, 1.9vw);
        color: v-bind('cssColor');
        @extend %infoTemplateStyle;
    }

    .F5,
    .F9 {
        opacity: 0;
    }

    .active {
        opacity: 1;
        background-image: url('/src/assets/slot/slot_empty.webp');
        @extend %backgroundCoverRound;
    }
}
</style>
