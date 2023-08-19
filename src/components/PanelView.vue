<template lang="pug">
figure.panelView
    ViewElf(v-if="storeRole.status.currentRole === 'elf'")
    ViewMage(v-else-if="storeRole.status.currentRole === 'mage'")
    ViewRoyal(v-else-if="storeRole.status.currentRole === 'royal'")
    ViewKnight(v-else-if="storeRole.status.currentRole === 'knight'")
    ViewDarkElf(v-else-if="storeRole.status.currentRole === 'darkElf'")

</template>

<script setup>
import { useRoleStore } from '@/stores/role'
import ViewMage from '@/components/ViewMage.vue'
import ViewKnight from '@/components/ViewKnight.vue'
import ViewRoyal from '@/components/ViewRoyal.vue'
import ViewDarkElf from '@/components/ViewDarkElf.vue'
import ViewElf from '@/components/ViewElf.vue'

const storeRole = useRoleStore()
</script>

<style lang="scss">
.panelView {
    position: relative;
    height: 73%;
}
</style>
