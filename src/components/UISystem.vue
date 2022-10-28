<template>
  <figure class="uiSystem" @click.stop="handleUISystem">
    <li class="close"></li>
    <RouterLink to="/roles" class="restart"></RouterLink>
    <RouterLink to="/logout" class="quit"></RouterLink>
    <li class="cancel"></li>
  </figure>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUIStore } from "../stores/ui";
import { useAudioStore } from "../stores/audio";

const storeUI = useUIStore();
const storeAudio = useAudioStore();

const handleUISystem = (e) => {
  const target = e.target;
  if (target.tagName === "FIGURE") return;
  if (["cancel", "close"].includes(target.className))
    storeUI.ui.btnBox = "close";

  storeAudio.clickToPlayAudio("UI/audio_itemsClose.mp3");
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiSystem {
  position: absolute;
  inset: -2216% 0% 704.8% -1016.55%;

  background-image: url("/src/assets/UI/UI_logout.webp");
  @extend %backgroundCoverRound;

  .close {
    position: absolute;
    inset: 1% 86.75% 95% 2.5%;
    opacity: 0;

    background-image: url("../assets/UI/UI_close.webp");
    @extend %backgroundCoverRound;
  }
  .restart {
    position: absolute;
    inset: 20.5% 31.75% 73.25% 43.5%;

    background-image: url("../assets/UI/UI_restart.webp");
    @extend %backgroundCoverRound;
  }

  .quit {
    position: absolute;
    inset: 29.95% 35% 64.5% 47.25%;

    background-image: url("../assets/UI/UI_quit.webp");
    @extend %backgroundCoverRound;
  }

  .cancel {
    position: absolute;
    inset: 37.75% 29.25% 55.25% 44%;

    background-image: url("../assets/UI/UI_cancel.webp");
    @extend %backgroundCoverRound;
  }
  * {
    opacity: 0.3;
    // for desktop and moble device
    &:active,
    &:hover {
      opacity: 1;
    }
  }
}
</style>
