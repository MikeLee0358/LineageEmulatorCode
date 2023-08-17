<template lang="pug">
figure(:class='storeRole.getGenderClass()')
img(v-for='img in imgList' :key='img.id' :class='img.class' :src='storeRole.getUrlForHashWhenProd(img.src)')
</template>

<script setup>
import { useRoleStore } from '../stores/role'

const storeRole = useRoleStore()
const imgList = [
    { id: 0, class: 'mage rowOne1', src: 'royal/gif_mage.gif' },
    { id: 1, class: 'mage rowOne2', src: 'royal/gif_mage.gif' },
    { id: 2, class: 'elf rowOne1', src: 'royal/gif_elfMale.gif' },
    { id: 3, class: 'elf rowOne2', src: 'royal/gif_elfMale.gif' },
    { id: 4, class: 'elf rowOne3', src: 'royal/gif_elfMale.gif' },
    { id: 5, class: 'elf rowOne4', src: 'royal/gif_elfMale.gif' },
    { id: 6, class: 'elf rowOne5', src: 'royal/gif_elfMale.gif' },
    { id: 7, class: 'elf rowOne6', src: 'royal/gif_elfMale.gif' },
    { id: 8, class: 'elf rowOne7', src: 'royal/gif_elfMale.gif' },
    {
        id: 9,
        class: 'elf rowTwo1 female',
        src: 'royal/gif_elfFemale.gif'
    },
    {
        id: 10,
        class: 'elf rowTwo2 female',
        src: 'royal/gif_elfFemale.gif'
    },
    { id: 11, class: 'elf rowTwo3', src: 'royal/gif_elfMale.gif' },
    { id: 12, class: 'elf rowTwo4', src: 'royal/gif_elfMale.gif' },
    {
        id: 13,
        class: 'monster rowOne1',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 14,
        class: 'monster rowOne2',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 15,
        class: 'monster rowOne3',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 16,
        class: 'monster rowOne4',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 17,
        class: 'monster rowOne5',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 18,
        class: 'monster rowTwo1',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 19,
        class: 'monster rowTwo2',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 20,
        class: 'monster rowTwo3',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 21,
        class: 'monster rowTwo4',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 22,
        class: 'monster rowTwo5',
        src: 'royal/gif_skeleton.gif'
    },
    {
        id: 23,
        class: 'chair',
        src: 'royal/gif_chair.gif'
    },
    {
        id: 24,
        class: 'table',
        src: 'royal/gif_table.gif'
    }
]
</script>

<style lang="scss" scoped>
.royal {
    position: absolute;
    z-index: 1;
    top: 47%;
    left: 46.5%;
    background-image: v-bind('storeRole.getGifUrl()');
    background-size: cover;
    background-repeat: round;

    &.male {
        width: 3.75%;
        height: 16%;
    }

    &.female {
        width: 3%;
        height: 15.75%;
    }
}

.mage {
    position: absolute;
    width: 3%;
    height: 15%;

    &.rowOne1 {
        top: 47.5%;
        left: 39.75%;
    }

    &.rowOne2 {
        top: 41%;
        left: 47.25%;
    }
}

.elf {
    position: absolute;
    width: 3.25%;
    height: 16.75%;

    @for $num from 1 through 7 {
        &.rowOne#{$num} {
            top: calc(72.6% - ($num * 3.35%));
            left: calc(39.3% + ($num * 3.75%));
        }
    }

    &.female {
        width: 4.35%;
        height: 16%;

        &.rowTwo1 {
            top: 67.15%;
            left: 54.15%;
        }

        &.rowTwo2 {
            top: 63.75%;
            left: 57.9%;
        }
    }

    &.rowTwo3 {
        top: 59.25%;
        left: 61.75%;
    }

    &.rowTwo4 {
        top: 55.75%;
        left: 65.5%;
    }
}

.monster {
    position: absolute;
    width: 3.25%;
    height: 14.5%;

    @for $num from 1 through 5 {
        &.rowOne#{$num} {
            top: calc(78.65% - ($num * 3.65%));
            left: calc(50.45% + ($num * 3.8%));
        }

        &.rowTwo#{$num} {
            top: calc(81.9% - ($num * 3.45%));
            left: calc(54.1% + ($num * 3.8%));
        }
    }
}

.chair {
    position: absolute;
    width: 6.25%;
    height: 15%;
    left: 49.25%;
    top: 73%;
}

.table {
    position: absolute;
    width: 12.45%;
    height: 12.75%;
    left: 35%;
    top: 80.5%;
}
</style>
