<template lang="pug">
figure.panelView
    ViewElf(v-if="storeRole.status.currentRole === 'elf'")
    ViewMage(v-else-if="storeRole.status.currentRole === 'mage'")
    ViewRoyal(v-else-if="storeRole.status.currentRole === 'royal'")
    ViewKnight(v-else-if="storeRole.status.currentRole === 'knight'")
    ViewDarkElf(v-else-if="storeRole.status.currentRole === 'darkElf'")

</template>

<script setup>
import { useRoleStore } from '../stores/role'
import ViewMage from './ViewMage.vue'
import ViewKnight from './ViewKnight.vue'
import ViewRoyal from './ViewRoyal.vue'
import ViewDarkElf from './ViewDarkElf.vue'
import ViewElf from './ViewElf.vue'

const storeRole = useRoleStore()
</script>

<style lang="scss">
.panelView {
    position: relative;
    height: 73%;
}
</style>
