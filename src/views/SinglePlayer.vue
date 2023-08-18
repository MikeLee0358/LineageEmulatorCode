<template lang="pug">
article.singlePlayerContainer
    PanelView
    PanelUI
    audio(autoplay loop :src='storeAudio.getRoleAudioUrl()')
</template>

<script setup>
import PanelView from '../components/PanelView.vue'
import PanelUI from '../components/PanelUI.vue'
import { useUIStore } from '../stores/ui'
import { useChatStore } from '../stores/chat'
import { useRoleStore } from '../stores/role'
import { useAudioStore } from '../stores/audio'
import { useKnightStore } from '../stores/knight'
import { useScrollStore } from '../stores/scroll'
import { onBeforeRouteLeave } from 'vue-router'

const storeUI = useUIStore()
const storeChat = useChatStore()
const storeRole = useRoleStore()
const storeAudio = useAudioStore()
const storeScroll = useScrollStore()
const storeKnight = useKnightStore()

onBeforeRouteLeave(() => {
    //reset to default
    storeKnight.status.isDeathKnight = false
    storeKnight.outer.clearRepeatTalkChatEventTimer()
    storeScroll.outer.clearClickScrollTimer()
    storeScroll.status.targetScroll = null
    storeChat.cleanChat()
    storeUI.ui.btnBox = 'close'
    storeUI.ui.isDefault = true
})
</script>

<style lang="scss">
@use '../scss/common.scss';

.singlePlayerContainer {
    width: 100%;
    height: 100%;
    background-image: v-bind('storeRole.outer.currentBackGround()');

    @extend %backgroundCoverRound;
    @extend %cursorPointer;
}
</style>
