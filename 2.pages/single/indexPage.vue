<template lang="pug">
section
  section.panelUI
      UIHp
      UIChat
      UISlot
      UINumber
      UIFunction
  figure.panelView
      ViewElf(v-if="storeRole.status.currentRole === 'elf'")
      ViewMage(v-else-if="storeRole.status.currentRole === 'mage'")
      ViewRoyal(v-else-if="storeRole.status.currentRole === 'royal'")
      ViewKnight(v-else-if="storeRole.status.currentRole === 'knight'")
      ViewDarkElf(v-else-if="storeRole.status.currentRole === 'darkElf'")
</template>

<script setup>
definePageMeta({
  layout: 'SinglePage'
})
</script>

<style>
.panelUI {
    display: grid;
    grid-template-areas:
        '. uiHp .'
        'uiNumber uiChat uiSlot'
        'uiNumber . uiFunction';
}
</style>
