<template lang="pug">
ul.uiStatusNumbers
    ul.level
        li.lv {{ storeRole.outer.current_Data().basic.lv }}
        li.exp {{ storeRole.outer.current_Data().basic.exp }}
    ul.basic
        li {{ storeRole.outer.current_Data().basic.hp }}/{{ storeRole.outer.current_Data().basic.hp }}
        li {{ storeRole.outer.current_Data().basic.mp }}/{{ storeRole.outer.current_Data().basic.mp }}
        li {{ storeRole.outer.get_AC() }}
    ul.attributes
        li {{ storeRole.outer.current_Data().basic.str }}
        li {{ storeRole.outer.current_Data().basic.dex }}
        li {{ storeRole.outer.current_Data().basic.con }}
        li {{ storeRole.outer.current_Data().basic.int }}
        li {{ storeRole.outer.current_Data().basic.wis }}
        li {{ storeRole.outer.current_Data().basic.cha }}
    li.er {{ storeRole.outer.get_ER() }}
</template>

<script setup>
import { useRoleStore } from '@/stores/role'

const storeRole = useRoleStore()
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
