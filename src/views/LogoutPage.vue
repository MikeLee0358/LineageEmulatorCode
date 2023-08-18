<template lang="pug">
section.logoutPage
    video(:src='storeRole.outer.getUrlForHashWhenProd(getLogoutVideoUrl())' autoplay='' @ended='turnToLogin')
</template>

<script setup>
import { useRoleStore } from '../stores/role'
const storeRole = useRoleStore()
const turnToLogin = () => {
    window.location.replace('https://mikelee0358.github.io/LineageEmulator/#/login')
}
const getLogoutVideoUrl = () => {
    if (storeRole.status.currentRole === 'royal' && storeRole.status.currentGender === 'male') {
        return 'logout/prince.mp4'
    }
    return 'logout/classic.mp4'
}
</script>

<style lang="scss" scoped>
.logoutPage {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
}
</style>
