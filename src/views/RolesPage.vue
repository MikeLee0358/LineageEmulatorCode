<template lang="pug">
article.rolesPage
    .background
    .linkContainer
        template(v-for="(gender, index) in ['male', 'female']" :key='index')
            template(v-for="(role, index) in ['elf', 'mage', 'royal', 'knight', 'darkElf']" :key='index')
                RouterLink(:to='`/${gender}/${role}`' :class='`${gender} ${role}`' @click.stop="storeAudio.clickToPlayAudio('UI/audio_click.mp3')")
    audio(:src="storeAudio.getUrlForHashWhenProd('login/rolesPage_audio.mp3')" autoplay loop)
</template>

<script setup>
import { RouterLink, onBeforeRouteLeave } from 'vue-router'
import { useRoleStore } from '../stores/role'
import { useAudioStore } from '../stores/audio'
const storeAudio = useAudioStore()
const storeRole = useRoleStore()

onBeforeRouteLeave((to) => {
    storeRole.status.currentGender = to.params.gender
    storeRole.status.currentRole = to.params.role
})
</script>

<style lang="scss">
@use '../scss/common.scss';

.rolesPage {
    position: relative;
    width: 100vw;
    height: 100vh;

    .background {
        position: absolute;
        inset: 0%;
        background-image: url('@/assets/login/rolesPage_background.webp');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0.2;
    }

    .linkContainer {
        position: relative;
        width: 133vh;
        height: 100%;
        margin: 0 auto;

        .male {
            position: absolute;

            &.elf {
                inset: 5% 27% 79% 55.5%;
                z-index: 1;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: -9% 0% 0% -58%;
                    width: 185%;
                    height: 79vh;
                    background-image: url('/src/assets/login/rolesPage_elfMale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.mage {
                inset: 16.2% 66.4% 68.5% 25%;
                z-index: 2;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0% 0% 0% -92%;
                    width: 249%;
                    height: 64.5vh;
                    background-image: url('/src/assets/login/rolesPage_mageMale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.royal {
                inset: 8% 37% 3.75% 39.75%;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0% 0% 0% -0.25%;
                    width: 100%;
                    height: 87.75vh;
                    background-image: url('/src/assets/login/rolesPage_royalMale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.knight {
                inset: 9% 52.5% 74% 31%;
                z-index: 1;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: -10% 0% 0% -16.5%;
                    width: 223%;
                    height: 73.5vh;
                    background-image: url('/src/assets/login/rolesPage_knightMale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.darkElf {
                inset: 14% 8% 74% 72%;
                z-index: 2;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0% 0% 0% -69.5%;
                    height: 66.25vh;
                    width: 173%;
                    background-image: url('/src/assets/login/rolesPage_darkElfMale.webp');
                    @extend %keepImageSameRate;
                }
            }
        }

        .female {
            position: absolute;
            z-index: 3;

            &.elf {
                inset: 25.5% 13% 14% 78%;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0% 0% 0% -157%;
                    width: 396%;
                    height: 60.75vh;
                    background-image: url('/src/assets/login/rolesPage_elfFemale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.mage {
                inset: 24% 68% 13% 18%;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: -5.25% 0% 0% -29%;
                    width: 138%;
                    height: 66vh;
                    background-image: url('/src/assets/login/rolesPage_mageFemale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.royal {
                inset: 20.4% 32% 15% 60%;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0% 0% 0% -33%;
                    width: 179%;
                    height: 64vh;
                    background-image: url('/src/assets/login/rolesPage_royalFemale.webp');

                    @extend %keepImageSameRate;
                }
            }

            &.knight {
                inset: 19.5% 58% 17% 32%;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: -2% 0% 0% -81%;
                    width: 231%;
                    height: 65.25vh;
                    background-image: url('/src/assets/login/rolesPage_knightFemale.webp');
                    @extend %keepImageSameRate;
                }
            }

            &.darkElf {
                inset: 22.5% 25% 17% 68%;

                &:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0% 0% 0% -172%;
                    width: 325%;
                    height: 61vh;
                    background-image: url('/src/assets/login/rolesPage_darkElfFemale.webp');
                    @extend %keepImageSameRate;
                }
            }
        }
    }
}

@media screen and (max-width: 1367px) {
    //for mobile & ipad
    .rolesPage .background {
        opacity: 1;
    }
}
</style>
