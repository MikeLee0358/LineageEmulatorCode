<template>
  <ul class="uiFunction" @click.stop="handleUiFunction">
    <li class="btnHelp">
      <UIHelp v-show="storeUI.ui.btnBox === 'btnHelp'" />
    </li>
    <li class="btnRole">
      <UIStatus
        v-show="storeUI.ui.btnBox === 'btnRole' || storeUI.ui.isDefault"
      />
    </li>
    <li class="btnMagic">
      <UIMagic v-show="storeUI.ui.btnBox === 'btnMagic'" />
    </li>
    <li class="btnItems">
      <UIItem v-show="storeUI.ui.btnBox === 'btnItems'" />
    </li>
    <li class="btnRelationship">
      <UICommunity v-show="storeUI.ui.btnBox === 'btnRelationship'" />
    </li>
    <li class="btnSetting">
      <UIOptions v-show="storeUI.ui.btnBox === 'btnSetting'" />
    </li>
    <li class="btnLogout">
      <UISystem v-show="storeUI.ui.btnBox === 'btnLogout'" />
    </li>
  </ul>
</template>

<script setup>
import { useAudioStore } from "../stores/audio";
import { useUIStore } from "../stores/ui";
import UIItem from "./UIItem.vue";
import UIHelp from "./UIHelp.vue";
import UIStatus from "./UIStatus.vue";
import UIMagic from "./UIMagic.vue";
import UISystem from "./uiSystem.vue";
import UIOptions from "./UIOptions.vue";
import UICommunity from "./UICommunity.vue";
const storeAudio = useAudioStore();
const storeUI = useUIStore();

const handleUiFunction = (e) => {
  if (e.target.tagName === "UL") return;

  storeAudio.clickToPlayAudio("UI/audio_itemsOpen.mp3");
  storeUI.ui.btnBox = e.target.className;
  storeUI.ui.isDefault = false;
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiFunction {
  grid-area: uiFunction;
  position: relative;

  .btnHelp {
    position: absolute;
    inset: 0 85% 0 1%;
  }
  .btnRole {
    position: absolute;
    inset: 0 71% 0 15%;
  }
  .btnMagic {
    position: absolute;
    inset: 0 57% 0 30%;
  }
  .btnItems {
    position: absolute;
    inset: 0 43% 0 44%;
  }
  .btnRelationship {
    position: absolute;
    inset: 0 28% 0 58%;
  }
  .btnSetting {
    position: absolute;
    inset: 0 14% 0 72%;
  }
  .btnLogout {
    position: absolute;
    inset: 0% 0% 0% 86.5%;
  }
}
</style>
