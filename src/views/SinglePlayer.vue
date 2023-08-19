<template lang="pug">
article.singlePlayerContainer
    PanelView
    PanelUI
    audio(autoplay loop :src='storeAudio.outer.get_RoleAudioUrl()')
</template>

<script setup>
import PanelView from '@/components/PanelView.vue'
import PanelUI from '@/components/PanelUI.vue'
import { useHelperStore } from '@/stores/helper'
import { useChatStore } from '@/stores/chat'
import { useRoleStore } from '@/stores/role'
import { useAudioStore } from '@/stores/audio'
import { useKnightStore } from '@/stores/knight'
import { useScrollStore } from '@/stores/scroll'
import { onBeforeRouteLeave } from 'vue-router'

const storeHelper = useHelperStore()
const storeChat = useChatStore()
const storeRole = useRoleStore()
const storeAudio = useAudioStore()
const storeScroll = useScrollStore()
const storeKnight = useKnightStore()

onBeforeRouteLeave(() => {
    //reset to default
    storeKnight.status.isDeathKnight = false
    storeKnight.outer.clear_RepeatTalkChatEventTimer()
    storeScroll.outer.clear_ClickScrollTimer()
    storeScroll.status.targetScroll = null
    storeChat.outer.clean_Chat()
    storeHelper.status.btnBox = 'close'
    storeHelper.status.isDefault = true
})
</script>

<style lang="scss">
@use '@/scss/common.scss';

.singlePlayerContainer {
    width: 100%;
    height: 100%;
    background-image: v-bind('storeRole.outer.current_BackGround()');

    @extend %backgroundCoverRound;
    @extend %cursorPointer;
}
</style>
