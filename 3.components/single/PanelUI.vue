<template lang="pug">
section.panelUI
    UIHp
    UIChat
    UISlot
    UINumber
    UIFunction
</template>

<script setup>
import UIHp from '@/components/UIHp.vue'
import UIChat from '@/components/UIChat.vue'
import UISlot from '@/components/UISlot.vue'
import UINumber from '@/components/UINumber.vue'
import UIFunction from '@/components/UIFunction.vue'
</script>

<style lang="scss">
.panelUI {
    display: grid;
    grid-template-columns: 17.5% 1fr 23%;
    grid-template-rows: 20% 64% 16%;
    grid-template-areas:
        '. uiHp .'
        'uiNumber uiChat uiSlot'
        'uiNumber . uiFunction';

    position: relative;
    height: 27%;
}
</style>
