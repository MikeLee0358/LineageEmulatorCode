<template lang="pug">
article.loginPage
    RouterLink.login(to='/roles')

</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
@use '@/scss/common.scss';

.loginPage {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/login/login_background.webp');
    @extend %backgroundCoverRound;

    .login {
        position: absolute;
        background-image: url('@/assets/login/login_btn.webp');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        left: 47%;
        top: 84%;
        width: 7%;
        height: 5%;
        opacity: 0.5;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
