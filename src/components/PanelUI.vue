<template>
  <section class="panelUI">
    <UIHp />
    <UIChat />
    <UISlot />
    <UINumber />
    <UIFunction />
  </section>
</template>

<script setup>
import UIHp from "./UIHp.vue";
import UIChat from "./UIChat.vue";
import UISlot from "./UISlot.vue";
import UINumber from "./UINumber.vue";
import UIFunction from "./UIFunction.vue";
</script>

<style lang="scss">
.panelUI {
  display: grid;
  grid-template-columns: 17.5% 1fr 23%;
  grid-template-rows: 20% 64% 16%;
  grid-template-areas:
    ". uiHp ."
    "uiNumber uiChat uiSlot"
    "uiNumber . uiFunction";

  position: relative;
  height: 27%;
}
</style>
