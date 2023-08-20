<template lang="pug">
figure.uiItem(@click.stop='handle_UIItem')
    li.close
</template>

<script setup>
import { useAudioStore } from '@/stores/audio'
import { useHelperStore } from '@/stores/helper'
const storeHelper = useHelperStore()
const storeAudio = useAudioStore()

const handle_UIItem = (e) => {
    const target = e.target
    const handle_Close = () => {
        storeAudio.outer.click_ToPlayAudio('UI/audio_itemsClose.mp3')
        storeHelper.status.btnBox = 'close'
    }
    if (target.tagName === 'FIGURE') return
    if (target.className === 'close') return handle_Close()
}
</script>

<style lang="scss">
@use '@/scss/common.scss';

.uiItem {
    position: absolute;
    inset: -2216% -324% 704.8% -735.4%;

    background-image: url('@/assets/UI/UI_items.webp');
    @extend %backgroundCoverRound;

    .close {
        position: absolute;
        inset: 1% 86.75% 94.75% 2.5%;
        opacity: 0;

        background-image: url('@/assets/UI/UI_close.webp');
        @extend %backgroundCoverRound;

        &:hover,
        &:active {
            opacity: 1;
        }
    }
}
</style>
