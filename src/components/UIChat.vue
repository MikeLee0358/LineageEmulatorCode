<template lang="pug">
ul.uiChat
    li(v-for='(chatline, index) in storeChat.status.lines' :key='index') {{ chatline }}
</template>

<script setup>
import { useChatStore } from '@/stores/chat'
const storeChat = useChatStore()
</script>

<style lang="scss" scoped>
.uiChat {
    grid-area: uiChat;
    position: relative;
    inset: 1% 0 0 0.5%;

    li {
        height: 14.28%;
        line-height: 100%;
        transform: scaleY(0.5);
        font-size: 1.85vw;
        color: var(--color-yellow);
    }
}
</style>
