<template lang="pug">
ul.uiCommunity(@click.stop='handle_UICommunity')
    li.close
    li.content 未開放
</template>

<script setup>
import { useHelperStore } from '@/stores/helper'
import { useAudioStore } from '@/stores/audio'

const storeHelper = useHelperStore()
const storeAudio = useAudioStore()

const handle_UICommunity = (e) => {
    const target = e.target
    const handle_Close = () => {
        storeAudio.outer.click_ToPlayAudio('UI/audio_itemsClose.mp3')
        storeHelper.status.btnBox = 'close'
    }
    if (target.tagName === 'UL') return
    if (target.className === 'close') return handle_Close()
}
</script>

<style lang="scss">
@use '@/scss/common.scss';

.uiCommunity {
    position: absolute;
    inset: -2215% 1659.3% 703.8% -2800%;

    background-image: url('/src/assets/UI/UI_template.webp');
    @extend %backgroundCoverRound;

    .close {
        position: absolute;
        inset: 1% 2.5% 94.75% 87.75%;
        opacity: 0;

        background-image: url('@/assets/UI/UI_close.webp');
        @extend %backgroundCoverRound;

        &:hover,
        &:active {
            opacity: 1;
        }
    }

    .content {
        position: relative;
        top: 6%;
        left: 6%;
    }
}
</style>
