<template lang="pug">
ul.uiHp
    li.hp HP:{{ storeRole.outer.currentData().basic.hp }}/{{ storeRole.outer.currentData().basic.hp }}
    li.mp MP:{{ storeRole.outer.currentData().basic.mp }}/{{ storeRole.outer.currentData().basic.mp }}

</template>

<script setup>
import { useRoleStore } from '../stores/role'
const storeRole = useRoleStore()
</script>

<style lang="scss" scoped>
.uiHp {
    grid-area: uiHp;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 24.5vw 1fr;
    grid-template-areas: 'hp . mp';
    position: relative;
    inset: -39% 0% 0% -24%;
    font-size: 2.5vw;
    width: 149%;
    height: 160%;

    transform: scale(0.6);

    .hp {
        grid-area: hp;
        justify-self: end;
        -webkit-text-stroke: 0.05px rgb(89, 9, 9);
        color: rgb(236, 194, 194);
        margin-right: -0.65vw;
    }

    .mp {
        grid-area: mp;
        -webkit-text-stroke: 0.05px rgb(30, 10, 96);
        color: rgb(181, 217, 255);
        margin-top: 1%;
    }
}

/* for Firefox */
@-moz-document url-prefix() {
    .uiHp {
        height: 164%;
    }
}

@media screen and (min-height: 321px) {
    .uiHp {
        transform: scale(0.6, 0.5);
    }
}
</style>
