<template>
  <article class="loginPage">
    <RouterLink to="/roles" class="login" @click.stop="showAlert"></RouterLink>
  </article>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";

const showAlert = () => {
  Swal.fire(
    "天堂-衝裝模擬器",
    "1.持續優化中。<br>2.支援手機、桌機版。<br>3.開放騎士(男)功能。<br>",
    "info"
  );
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.loginPage {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/login/login_background.webp");
  @extend %backgroundCoverRound;
  .login {
    position: absolute;
    background-image: url("@/assets/login/login_btn.webp");
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
