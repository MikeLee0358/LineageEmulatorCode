<template lang="pug">
ul.uiOptions(@click.stop='handle_UIOptions')
    li.close
    li 選項
    li.music 背景音效: 
        span {{ storeAudio.outer.show_OnOff() }}

</template>

<script setup>
import { useHelperStore } from '@/stores/helper'
import { useAudioStore } from '@/stores/audio'

const storeHelper = useHelperStore()
const storeAudio = useAudioStore()

const handle_UIOptions = (e) => {
    const target = e.target

    const handle_Close = () => {
        storeAudio.outer.click_ToPlayAudio('UI/audio_itemsClose.mp3')
        storeHelper.status.btnBox = 'close'
    }

    const toggle_Audio = () => {
        storeAudio.status.isOn = !storeAudio.status.isOn

        storeAudio.status.isOn === true
            ? storeAudio.outer.play_Audio()
            : storeAudio.outer.pause_Audio()
    }
    if (target.tagName === 'UL') return
    if (target.className === 'music') toggle_Audio()
    if (target.className === 'close') handle_Close()
}
</script>

<style lang="scss" scoped>
@use '@/scss/common.scss';

.uiOptions {
    position: absolute;
    inset: -2216% 1759.3% 704.8% -2901%;

    background-image: url('@/assets/UI/UI_template.webp');
    @extend %backgroundCoverRound;

    li {
        position: relative;
        top: 6.5%;
        left: 6.5%;
        color: rgb(195, 196, 201);
        font-size: 1.3vw;

        span {
            color: rgb(195, 196, 201);
        }
    }

    .music {
        margin-top: 5%;
        color: rgb(255, 255, 190);
    }

    .mode {
        color: rgb(255, 255, 190);
    }

    .close {
        position: absolute;
        inset: 1.25% 2.5% 95% 87.85%;
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
