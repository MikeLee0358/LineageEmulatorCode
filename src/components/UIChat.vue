<template>
  <ul class="uiChat">
    <li v-for="(chatline, index) in storeChat.chat.lines" :key="index">
      {{ chatline }}
    </li>
  </ul>
</template>

<script setup>
import { useChatStore } from "../stores/chat";
const storeChat = useChatStore();
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
