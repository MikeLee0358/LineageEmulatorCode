<template lang="pug">
ul.uiFunction(@click.stop='handleUiFunction')
    li.btnHelp
        UIHelp(v-show="storeUI.ui.btnBox === 'btnHelp'")
    li.btnRole
        UIStatus(v-show="storeUI.ui.btnBox === 'btnRole' || storeUI.ui.isDefault")
    li.btnMagic
        UIMagic(v-show="storeUI.ui.btnBox === 'btnMagic'")
    li.btnItem
        UIItem(v-show="storeUI.ui.btnBox === 'btnItem'")
    li.btnCommunity
        UICommunity(v-show="storeUI.ui.btnBox === 'btnCommunity'")
    li.btnSetting
        UIOptions(v-show="storeUI.ui.btnBox === 'btnSetting'")
    li.btnLogout
        UISystem(v-show="storeUI.ui.btnBox === 'btnLogout'")

</template>

<script setup>
import { useAudioStore } from '../stores/audio'
import { useUIStore } from '../stores/ui'
import UIItem from './UIItem.vue'
import UIHelp from './UIHelp.vue'
import UIStatus from './UIStatus.vue'
import UIMagic from './UIMagic.vue'
import UISystem from './UISystem.vue'
import UIOptions from './UIOptions.vue'
import UICommunity from './UICommunity.vue'
const storeAudio = useAudioStore()
const storeUI = useUIStore()

const handleUiFunction = (e) => {
    if (e.target.tagName === 'UL') return

    storeAudio.clickToPlayAudio('UI/audio_itemsOpen.mp3')
    storeUI.ui.btnBox = e.target.className
    storeUI.ui.isDefault = false
}
</script>

<style lang="scss" scoped>
@use '../scss/common.scss';

.uiFunction {
    grid-area: uiFunction;
    position: relative;

    .btnHelp {
        position: absolute;
        inset: 0 85% 0 1%;
    }

    .btnRole {
        position: absolute;
        inset: 0 71% 0 15%;
    }

    .btnMagic {
        position: absolute;
        inset: 0 57% 0 30%;
    }

    .btnItem {
        position: absolute;
        inset: 0 43% 0 44%;
    }

    .btnCommunity {
        position: absolute;
        inset: 0 28% 0 58%;
    }

    .btnSetting {
        position: absolute;
        inset: 0 14% 0 72%;
    }

    .btnLogout {
        position: absolute;
        inset: 0% 0% 0% 86.5%;
    }
}
</style>
