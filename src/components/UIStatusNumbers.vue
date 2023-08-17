<template lang="pug">
ul.uiStatusNumbers
    ul.level
        li.lv {{ role.currentData.basic.lv }}
        li.exp {{ role.currentData.basic.exp }}
    ul.basic
        li {{ role.currentData.basic.hp }}/{{ role.currentData.basic.hp }}
        li {{ role.currentData.basic.mp }}/{{ role.currentData.basic.mp }}
        li {{ storeRole.getAC }}
    ul.attributes
        li {{ role.currentData.basic.str }}
        li {{ role.currentData.basic.dex }}
        li {{ role.currentData.basic.con }}
        li {{ role.currentData.basic.int }}
        li {{ role.currentData.basic.wis }}
        li {{ role.currentData.basic.cha }}
    li.er {{ storeRole.getER() }}
</template>

<script setup>
import { useRoleStore } from '../stores/role'
import { storeToRefs } from 'pinia'
const storeRole = useRoleStore()
const { role } = storeToRefs(storeRole)
</script>

<style lang="scss">
.uiStatusNumbers {
    position: absolute;
    transform: scale(0.47);
    inset: -56%;

    .level {
        position: absolute;
        inset: 4% 15% 91.5% 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5%;
    }

    .basic {
        position: absolute;
        inset: 12.2% 46% 73% 30%;
        display: flex;
        flex-direction: column;
        align-items: center;

        li {
            flex: 1;
            line-height: 100%;
            display: flex;
            align-items: center;
        }
    }

    .attributes {
        position: absolute;
        inset: 41.5% 68% 30% 13%;
        display: flex;
        flex-direction: column;
        align-items: center;

        li {
            flex: 1;
            line-height: 100%;
            display: flex;
            align-items: center;
        }
    }

    .er {
        position: absolute;
        inset: 89.8% 25% 5.5% 63%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

@media screen and (min-height: 321px) {
    .uiStatusNumbers {
        transform: scale(0.6);
        inset: -34%;
    }
}

@media screen and (min-height: 480px) {
    .uiStatusNumbers {
        transform: unset;
        inset: 0%;
        font-size: 2.6vmin;

        .basic {
            top: 12.7%;
        }
    }
}
</style>
