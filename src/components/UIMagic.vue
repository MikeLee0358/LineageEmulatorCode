<template lang="pug">
ul.uiMagic(@click.stop='handle_UIMagic')
    li.close
    ul.magicNumber
        li.magicPower 0
        li.magicResist {{ storeRole.outer.get_MR() }}
</template>

<script setup>
import { useHelperStore } from '@/stores/helper'
import { useRoleStore } from '@/stores/role'
import { useAudioStore } from '@/stores/audio'

const storeHelper = useHelperStore()
const storeRole = useRoleStore()
const storeAudio = useAudioStore()

const handle_UIMagic = (e) => {
    const target = e.target
    const handle_Close = () => {
        storeAudio.outer.click_ToPlayAudio('UI/audio_itemsClose.mp3')
        storeHelper.status.btnBox = 'close'
    }

    if (target.tagName === 'UL') return
    if (target.className === 'close') handle_Close()
}
</script>

<style lang="scss" scope>
@use '@/scss/common.scss';

.uiMagic {
    position: absolute;
    inset: -2216% -430% 704.8% -629.4%;

    background-image: url('@/assets/UI/UI_magic.webp');
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

    .magicNumber {
        position: absolute;
        inset: 88.75% -22% 3% 2%;
        transform: scale(0.47);
        display: flex;
        align-items: center;
        text-align: center;
        gap: 43%;

        .magicPower {
            flex-basis: 23%;
        }

        .magicResist {
            flex: 1;
        }
    }
}

@media screen and (min-height: 321px) {
    .uiMagic .magicNumber {
        transform: scale(0.6);
        inset: 89% -8% 2.65% 15%;
    }
}

@media screen and (min-height: 480px) {
    .uiMagic .magicNumber {
        font-size: 3.6vmin;
    }
}
</style>
