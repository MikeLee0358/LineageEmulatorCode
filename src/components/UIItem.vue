<template lang="pug">
figure.uiItem(@click.stop='handleUIItem')
    li.close
</template>

<script setup>
import { useAudioStore } from '../stores/audio'
import { useUIStore } from '../stores/ui'
const storeUI = useUIStore()
const storeAudio = useAudioStore()

const handleUIItem = (e) => {
    const target = e.target
    const handleClose = () => {
        storeAudio.clickToPlayAudio('UI/audio_itemsClose.mp3')
        storeUI.ui.btnBox = 'close'
    }
    if (target.tagName === 'FIGURE') return
    if (target.className === 'close') return handleClose()
}
</script>

<style lang="scss">
@use '../scss/common.scss';

.uiItem {
    position: absolute;
    inset: -2216% -324% 704.8% -735.4%;

    background-image: url('/src/assets/UI/UI_items.webp');
    @extend %backgroundCoverRound;

    .close {
        position: absolute;
        inset: 1% 86.75% 94.75% 2.5%;
        opacity: 0;

        background-image: url('../assets/UI/UI_close.webp');
        @extend %backgroundCoverRound;

        &:hover,
        &:active {
            opacity: 1;
        }
    }
}
</style>
