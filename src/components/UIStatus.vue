<template lang="pug">
ul.uiStatus(@click.stop='handle_UIStatus')
    li.close
    UIStatusNumbers
    UIStatusEquips

</template>

<script setup>
import UIStatusNumbers from '@/components/UIStatusNumbers.vue'
import UIStatusEquips from '@/components/UIStatusEquips.vue'
import { useHelperStore } from '@/stores/helper'
import { useAudioStore } from '@/stores/audio'

const storeHelper = useHelperStore()
const storeAudio = useAudioStore()

const handle_UIStatus = (e) => {
    const target = e.target
    const handle_Close = () => {
        storeAudio.outer.click_ToPlayAudio('UI/audio_itemsClose.mp3')
        storeHelper.status.btnBox = 'close'
        storeHelper.status.isDefault = false
    }

    if (target.tagName === 'UL') return
    if (target.className === 'close') handle_Close()
}
</script>

<style lang="scss" scoped>
@use '@/scss/common.scss';

.uiStatus {
    position: absolute;
    inset: -2216% 1359.3% 704.8% -2500%;
    background-image: url('/src/assets/UI/UI_role.webp');
    @extend %backgroundCoverRound;

    .close {
        position: absolute;
        inset: 0.5% 2.25% 94% 86.5%;
        z-index: 2;
        opacity: 0;

        background-image: url('/src/assets/UI/UI_close.webp');
        @extend %backgroundCoverRound;

        &:hover,
        &:active {
            opacity: 1;
        }
    }
}
</style>
