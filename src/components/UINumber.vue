<template lang="pug">
ul.uiNumber
    li.line1
        .lv 1
        .exp 0.00%
    li.line2
        .ac {{ storeRole.outer.getAC() }}
        .state 0
</template>

<script setup>
import { useRoleStore } from '@/stores/role'
const storeRole = useRoleStore()
</script>

<style lang="scss" scoped>
.uiNumber {
    grid-area: uiNumber;
    position: absolute;
    inset: -15.65% -37% 32.5% -24%;
    display: flex;
    flex-direction: column;
    transform: scale(0.5);
    text-align: center;
    font-size: 2.8vw;
    gap: 7%;
    line-height: 100%;

    .line1 {
        flex: 1;

        display: flex;
        align-items: center;
        gap: 10vw;
        padding-left: 12%;

        .lv {
            flex-basis: 9%;
            display: flex;
            justify-content: end;
        }

        .exp {
            flex: 1;
        }
    }

    .line2 {
        flex: 1;

        display: flex;
        gap: 6vw;
        align-items: center;

        .ac {
            flex-basis: 31%;
        }

        .state {
            flex: 1;
        }
    }
}

@media screen and (min-height: 480px) {
    .uiNumber {
        font-size: 3vw;
    }
}
</style>
