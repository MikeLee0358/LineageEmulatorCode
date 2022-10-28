<template>
  <figure class="panelView">
    <ViewElf v-if="role.currentRole === 'elf'" />
    <ViewMage v-else-if="role.currentRole === 'mage'" />
    <ViewRoyal v-else-if="role.currentRole === 'royal'" />
    <ViewKnight v-else-if="role.currentRole === 'knight'" />
    <ViewDarkElfVue v-else-if="role.currentRole === 'darkElf'" />
  </figure>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoleStore } from "../stores/role";
import ViewMage from "./ViewMage.vue";
import ViewKnight from "./ViewKnight.vue";
import ViewRoyal from "./ViewRoyal.vue";
import ViewDarkElfVue from "./ViewDarkElf.vue";
import ViewElf from "./ViewElf.vue";

const storeRole = useRoleStore();
const { role } = storeToRefs(storeRole);

</script>

<style lang="scss">
.panelView {
  position: relative;
  height: 73%;
}
</style>
