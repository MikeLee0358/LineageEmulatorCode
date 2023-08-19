<template lang="pug">
ul.uiHelp(@click.stop='handleUIHelp')
    li.close
    li.textContainer
        h1.title Side project由來
        p.content
            | {{
            | `
            | 靈感來源為“天堂爆爆樂逼真版”，主要是練習技能和回憶天堂。
            | 當第一版復刻完成後，總覺得還可以加些什麼，所以就踏上了的優化旅程。
            | 資料和素材取自網路、天堂Ｗ、巴哈姆特、官方網站以及遊戲主程式。`
            | }}
</template>

<script setup>
import { useAudioStore } from '../stores/audio'
import { useUIStore } from '../stores/ui'
const storeUI = useUIStore()
const storeAudio = useAudioStore()

const handleUIHelp = (e) => {
    const target = e.target
    const handleClose = () => {
        storeAudio.outer.clickToPlayAudio('UI/audio_itemsClose.mp3')
        storeUI.ui.btnBox = 'close'
    }

    if (target.tagName === 'UL') return
    if (target.className === 'close') handleClose()
}
</script>

<style lang="scss" scoped>
@use '../scss/common.scss';

.uiHelp {
    position: absolute;
    inset: -2216% 1252.3% 704.8% -2394%;
    display: flex;
    align-items: center;
    background-image: url('/src/assets/UI/UI_template.webp');
    @extend %backgroundCoverRound;

    .close {
        position: absolute;
        inset: 1.35% 2.75% 94.75% 88%;

        background-image: url('/src/assets/UI/UI_close.webp');
        @extend %backgroundCoverRound;
        opacity: 0;

        &:hover,
        &:active {
            opacity: 1;
        }
    }

    .textContainer {
        position: absolute;
        inset: -30% -13% -29% -25%;
        transform: scale(0.55);
        font-size: 2.5vw;

        .title {
            text-align: center;
        }

        .content {
            white-space: pre-wrap;
        }
    }

    @media screen and (min-height: 480px) {
        .textContainer {
            font-size: 2.8vw;
        }
    }
}
</style>
