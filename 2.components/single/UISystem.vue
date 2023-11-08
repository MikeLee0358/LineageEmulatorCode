<template lang="pug">
figure.uiSystem(@click.stop='handle_UISystem')
    li.close
    RouterLink.restart(to='/roles')
    RouterLink.quit(to='/logout')
    li.cancel
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useHelperStore } from '@/stores/helper'
import { useAudioStore } from '@/stores/audio'

const storeHelper = useHelperStore()
const storeAudio = useAudioStore()

const handle_UISystem = (e) => {
    const target = e.target
    if (target.tagName === 'FIGURE') return
    if (['cancel', 'close'].includes(target.className)) storeHelper.status.btnBox = 'close'

    storeAudio.outer.click_ToPlayAudio('UI/audio_itemsClose.mp3')
}
</script>

<style lang="scss" scoped>
@use '@/scss/common.scss';

.uiSystem {
    position: absolute;
    inset: -2216% 0% 704.8% -1016.55%;

    background-image: url('@/assets/UI/UI_logout.webp');
    @extend %backgroundCoverRound;

    .close {
        position: absolute;
        inset: 1% 86.75% 95% 2.5%;
        opacity: 0;

        background-image: url('@/assets/UI/UI_close.webp');
        @extend %backgroundCoverRound;
    }

    .restart {
        position: absolute;
        inset: 20.5% 31.75% 73.25% 43.5%;

        background-image: url('@/assets/UI/UI_restart.webp');
        @extend %backgroundCoverRound;
    }

    .quit {
        position: absolute;
        inset: 29.95% 35% 64.5% 47.25%;

        background-image: url('@/assets/UI/UI_quit.webp');
        @extend %backgroundCoverRound;
    }

    .cancel {
        position: absolute;
        inset: 37.75% 29.25% 55.25% 44%;

        background-image: url('@/assets/UI/UI_cancel.webp');
        @extend %backgroundCoverRound;
    }

    * {
        opacity: 0.3;

        // for desktop and mobile device
        &:active,
        &:hover {
            opacity: 1;
        }
    }
}
</style>
