<template>
  <ul class="uiStatus" @click.stop="handleUIStatus">
    <li class="close"></li>
    <uiStatusNumbers />
    <uiStatusEquips />
  </ul>
</template>

<script setup>
import uiStatusNumbers from "./uiStatusNumbers.vue";
import uiStatusEquips from "./uiStatusEquips.vue";
import { useUIStore } from "../stores/ui";
import { useAudioStore } from "../stores/audio";

const storeUI = useUIStore();
const storeAudio = useAudioStore();

const handleUIStatus = (e) => {
  const target = e.target;
  const handleClose = () => {
    storeAudio.clickToPlayAudio("UI/audio_itemsClose.mp3");
    storeUI.ui.btnBox = "close";
    storeUI.ui.isDefault = false;
  };

  if (target.tagName === "UL") return;
  if (target.className === "close") handleClose();
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiStatus {
  position: absolute;
  inset: -2216% 1359.3% 704.8% -2500%;
  background-image: url("/src/assets/UI/UI_role.webp");
  @extend %backgroundCoverRound;

  .close {
    position: absolute;
    inset: 0.5% 2.25% 94% 86.5%;
    z-index: 2;
    opacity: 0;

    background-image: url("/src/assets/UI/UI_close.webp");
    @extend %backgroundCoverRound;

    &:hover,
    &:active {
      opacity: 1;
    }
  }
}
</style>
