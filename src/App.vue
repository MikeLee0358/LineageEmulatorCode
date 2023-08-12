<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss">
@use "./scss/common.scss";
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  a {
    @extend %cursorPointer;
  }
}
@media (orientation: portrait) {
  main {
    * {
      display: none !important;
    }
    &::after {
      content: "支援橫幅模式";
      font-size: 12vw;
    }
  }
}
</style>
