<template lang="pug">
figure(:class='storeRole.getGenderClass()')
img.deathKnight(:src="storeRole.getUrlForHashWhenProd('darkElf/img_deathKnight.webp')")
</template>

<script setup>
import { useRoleStore } from '../stores/role'

const storeRole = useRoleStore()
</script>

<style lang="scss" scoped>
.darkElf {
    position: absolute;
    top: 47.25%;
    left: 46.25%;
    width: 6%;
    background-image: v-bind('storeRole.getGifUrl()');
    background-size: cover;
    background-repeat: round;

    &.male {
        height: 16.5%;
    }

    &.female {
        height: 18%;
    }
}

.deathKnight {
    position: absolute;
    width: 8%;
    height: 11%;
    left: 45%;
    top: 76.25%;
}
</style>
