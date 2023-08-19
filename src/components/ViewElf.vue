<template lang="pug">
figure(:class='storeRole.outer.get_GenderClass()')
</template>

<script setup>
import { useRoleStore } from '@/stores/role'

const storeRole = useRoleStore()
</script>

<style lang="scss" scoped>
.elf {
    position: relative;
    background-image: v-bind('storeRole.outer.get_GifUrl()');
    background-size: cover;
    background-repeat: round;

    &.male {
        width: 6%;
        height: 17%;
        top: 48%;
        left: 45%;
    }

    &.female {
        width: 5%;
        height: 16%;
        top: 47%;
        left: 46%;
    }
}
</style>
