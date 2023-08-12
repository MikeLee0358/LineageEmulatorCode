<template>
  <ul class="uiCommunity" @click.stop="handleUICommunity">
    <li class="close"></li>
    <li class="content">未開放</li>
  </ul>
</template>

<script setup>
import { useUIStore } from "../stores/ui";
import { useAudioStore } from "../stores/audio";

const storeUI = useUIStore();
const storeAudio = useAudioStore();

const handleUICommunity = (e) => {
  const target = e.target;
  const handleClose = () => {
    storeAudio.clickToPlayAudio("UI/audio_itemsClose.mp3");
    storeUI.ui.btnBox = "close";
  };
  if (target.tagName === "UL") return;
  if (target.className === "close") return handleClose();
};
</script>

<style lang="scss">
@use "../scss/common.scss";
.uiCommunity {
  position: absolute;
  inset: -2215% 1659.3% 703.8% -2800%;

  background-image: url("/src/assets/UI/UI_template.webp");
  @extend %backgroundCoverRound;

  .close {
    position: absolute;
    inset: 1% 2.5% 94.75% 87.75%;
    opacity: 0;

    background-image: url("../assets/UI/UI_close.webp");
    @extend %backgroundCoverRound;

    &:hover,
    &:active {
      opacity: 1;
    }
  }
  .content {
    position: relative;
    top: 6%;
    left: 6%;
  }
}
</style>
