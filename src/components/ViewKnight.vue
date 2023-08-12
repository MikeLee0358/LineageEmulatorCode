<template>
  <!-- death knight -->
  <figure class="deathKnight male" v-show="storeKnight.game.isDeathKnight">
    <figcaption class="nameContainer" v-if="storeRole.isGenderType('male')">
      <p class="title">蛇髮 名模↙</p>
      <p class="name">熱血狂志</p>

      <p class="chatEvent" v-show="storeKnight.game.isShowGameChat">
        熱血狂志: {{ storeKnight.game.chatMsg }}
      </p>
    </figcaption>
  </figure>

  <!-- knight -->
  <figure
    :class="storeRole.getGenderClass()"
    v-show="!storeKnight.game.isDeathKnight"
  >
    <figcaption class="nameContainer" v-if="storeRole.isGenderType('male')">
      <p class="title">蛇髮 名模↙</p>
      <p class="name">熱血狂志</p>

      <p class="chatEvent" v-show="storeKnight.game.isShowGameChat">
        熱血狂志: {{ storeKnight.game.chatMsg }}
      </p>
    </figcaption>
  </figure>
</template>

<script setup>
import { useRoleStore } from "../stores/role";
import { useKnightStore } from "../stores/knight";
const storeRole = useRoleStore();
const storeKnight = useKnightStore();

if (storeRole.role.currentGender === "male")
  storeKnight.repeatTalkChatEvent(15);
</script>

<style lang="scss" scoped>
.knight {
  position: relative;
  background-image: v-bind("storeRole.getGifUrl()");
  background-size: cover;
  background-repeat: round;

  &.male {
    top: 48%;
    left: 40%;
    width: 11%;
    height: 15.75%;

    .nameContainer {
      position: absolute;
      inset: -72% -50% 0% -50%;
      font-size: clamp(12px, 3.5vh, 30px);
      line-height: 110%;
      text-align: center;
      transform: translateX(15%);

      .title {
        color: rgb(60, 255, 255);
      }
      .name {
        color: rgb(255, 255, 0);
      }
      .chatEvent {
        position: relative;
        z-index: 1;
        top: 15vh;
        color: var(--color-white);
        font-size: clamp(12px, 2.6vh, 30px);

        &::before {
          content: "▲";
          position: absolute;
          left: 44.5%;
          z-index: 1;
          transform: translateY(-100%);
        }
      }
    }
  }

  &.female {
    width: 8%;
    height: 18%;
    top: 45%;
    left: 44.5%;
  }
}
.deathKnight {
  position: relative;
  background-image: url("../assets/knight/knight_deathKnight.gif");
  background-size: cover;
  background-repeat: round;

  &.male {
    top: 50%;
    left: 43%;
    width: 8%;
    height: 13.75%;

    .nameContainer {
      position: absolute;
      inset: -73.5% -50% 0% -50%;
      font-size: clamp(12px, 3vh, 30px);
      line-height: 110%;
      text-align: center;

      .title {
        color: rgb(60, 255, 255);
      }
      .name {
        color: rgb(255, 255, 0);
      }
      .chatEvent {
        position: relative;
        z-index: 1;
        top: 15vh;
        color: var(--color-white);
        font-size: clamp(12px, 2.6vh, 30px);

        &::before {
          content: "▲";
          position: absolute;
          left: 44.5%;
          z-index: 1;
          transform: translateY(-100%);
        }
      }
    }
  }
}

@media screen and (min-height: 480px) {
  .knight.male .nameContainer {
    inset: -57% -60% 0% -60%;
    font-size: clamp(12px, 2.8vh, 30px);
  }
}
</style>
