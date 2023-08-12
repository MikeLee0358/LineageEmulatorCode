<template>
  <ul class="uiMagic" @click.stop="handleUIMagice">
    <li class="close"></li>
    <ul class="magicNumber">
      <li class="magicPower">0</li>
      <li class="magicResist">{{ storeRole.getMR }}</li>
    </ul>
  </ul>
</template>

<script setup>
import { useUIStore } from "../stores/ui";
import { useRoleStore } from "../stores/role";
import { useAudioStore } from "../stores/audio";

const storeUI = useUIStore();
const storeRole = useRoleStore();
const storeAudio = useAudioStore();

const handleUIMagice = (e) => {
  const target = e.target;
  const handleClose = () => {
    storeAudio.clickToPlayAudio("UI/audio_itemsClose.mp3");
    storeUI.ui.btnBox = "close";
  };

  if (target.tagName === "UL") return;
  if (target.className === "close") handleClose();
};
</script>

<style lang="scss" scope>
@use "../scss/common.scss";

.uiMagic {
  position: absolute;
  inset: -2216% -430% 704.8% -629.4%;

  background-image: url("/src/assets/UI/UI_magic.webp");
  @extend %backgroundCoverRound;

  .close {
    position: absolute;
    inset: 1% 86.75% 94.75% 2.5%;
    opacity: 0;

    background-image: url("../assets/UI/UI_close.webp");
    @extend %backgroundCoverRound;
    &:hover,
    &:active {
      opacity: 1;
    }
  }

  .magicNumber {
    position: absolute;
    inset: 88.75% -22% 3% 2%;
    transform: scale(0.47);
    display: flex;
    align-items: center;
    text-align: center;
    gap: 43%;

    .magicPower {
      flex-basis: 23%;
    }
    .magicResist {
      flex: 1;
    }
  }
}

@media screen and (min-height: 321px) {
  .uiMagic .magicNumber {
    transform: scale(0.6);
    inset: 89% -8% 2.65% 15%;
  }
}

@media screen and (min-height: 480px) {
  .uiMagic .magicNumber {
    font-size: 3.6vmin;
  }
}
</style>
