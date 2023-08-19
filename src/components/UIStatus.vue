<template lang="pug">
ul.uiStatus(@click.stop='handleUIStatus')
    li.close
    UIStatusNumbers
    UIStatusEquips

</template>

<script setup>
import UIStatusNumbers from './UIStatusNumbers.vue'
import UIStatusEquips from './UIStatusEquips.vue'
import { useHelperStore } from '../stores/helper'
import { useAudioStore } from '../stores/audio'

const storeHelper = useHelperStore()
const storeAudio = useAudioStore()

const handleUIStatus = (e) => {
    const target = e.target
    const handleClose = () => {
        storeAudio.outer.clickToPlayAudio('UI/audio_itemsClose.mp3')
        storeHelper.status.btnBox = 'close'
        storeHelper.status.isDefault = false
    }

    if (target.tagName === 'UL') return
    if (target.className === 'close') handleClose()
}
</script>

<style lang="scss" scoped>
@use '../scss/common.scss';

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
