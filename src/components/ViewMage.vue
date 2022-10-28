<template>
  <figure :class="storeRole.getGenderClass()"></figure>
  <img
    v-for="img in imgList"
    :key="img.id"
    :class="img.class"
    :src="storeRole.getUrlForHashWhenProd(img.src)"
  />
</template>

<script setup>
import { useRoleStore } from "../stores/role";
const storeRole = useRoleStore();
const imgList = [
  { id: 0, class: "npc gereng", src: "mage/gif_gereng.gif" },
  {
    id: 1,
    class: "npc tree",
    src: "mage/gif_tree.gif",
  },
  {
    id: 1,
    class: "monster arachnevil",
    src: "mage/gif_arachnevil.gif",
  },
  {
    id: 2,
    class: "monster zombie topLeft no1",
    src: "mage/gif_zombieTopLeft.gif",
  },
  {
    id: 3,
    class: "monster zombie topLeft no2",
    src: "mage/gif_zombieTopLeft.gif",
  },
  {
    id: 4,
    class: "monster zombie topLeft no3",
    src: "mage/gif_zombieTopLeft.gif",
  },
  {
    id: 5,
    class: "monster zombie topLeft no4",
    src: "mage/gif_zombieTopLeft.gif",
  },
  {
    id: 6,
    class: "monster zombie top no1",
    src: "mage/gif_zombieTop.gif",
  },
  {
    id: 7,
    class: "monster zombie top no2",
    src: "mage/gif_zombieTop.gif",
  },
  {
    id: 8,
    class: "monster zombie topRight no1",
    src: "mage/gif_zombieTopRight.gif",
  },
  {
    id: 9,
    class: "monster zombie topRight no2",
    src: "mage/gif_zombieTopRight.gif",
  },
  {
    id: 10,
    class: "monster zombie topRight no3",
    src: "mage/gif_zombieTopRight.gif",
  },
  {
    id: 11,
    class: "monster zombie topRight no4",
    src: "mage/gif_zombieTopRight.gif",
  },
  {
    id: 12,
    class: "monster zombie right no1",
    src: "mage/gif_zombieRight.gif",
  },
  {
    id: 13,
    class: "monster zombie right no2",
    src: "mage/gif_zombieRight.gif",
  },
  {
    id: 14,
    class: "monster zombie bottomRight no1",
    src: "mage/gif_zombieBottomRight.gif",
  },
  {
    id: 15,
    class: "monster zombie bottomRight no2",
    src: "mage/gif_zombieBottomRight.gif",
  },
  {
    id: 16,
    class: "monster zombie bottom no1",
    src: "mage/gif_zombieBottom.gif",
  },
  {
    id: 17,
    class: "monster zombie bottom no2",
    src: "mage/gif_zombieBottom.gif",
  },
  {
    id: 18,
    class: "monster zombie bottomLeft no1",
    src: "mage/gif_zombieBottomLeft.gif",
  },
  {
    id: 19,
    class: "monster zombie bottomLeft no2",
    src: "mage/gif_zombieBottomLeft.gif",
  },
];
</script>

<style lang="scss" scoped>
.mage {
  position: relative;
  left: 47.25%;
  background-image: v-bind("storeRole.getGifUrl()");
  background-size: cover;
  background-repeat: round;

  &.male {
    width: 3.1%;
    height: 16%;
    top: 47%;
  }
  &.female {
    width: 3.5%;
    height: 16.75%;
    top: 45.75%;
  }
}

.npc {
  position: absolute;
  &.gereng {
    width: 3.7%;
    height: 15.65%;
    top: 43.5%;
    left: 43.3%;
  }
  &.tree {
    width: 31%;
    height: 41.95%;
    top: 67.44%;
    left: 34.95%;
    z-index: 1;
  }
}
.monster {
  &.arachnevil {
    position: absolute;
    width: 20%;
    height: 20.5%;
    left: 61%;
    top: 58.5%;
  }
  &.zombie {
    position: absolute;
    &.topLeft {
      width: 7%;
      height: 16.5%;

      &.no1 {
        top: 60.5%;
        left: 36.75%;
      }
      &.no2 {
        top: 64%;
        left: 40.45%;
      }
      &.no3 {
        top: 67%;
        left: 44.15%;
      }
      &.no4 {
        top: 44.5%;
        left: 70.15%;
      }
    }
    &.top {
      width: 5.5%;
      height: 18.5%;
      &.no1 {
        top: 46%;
        left: 30%;
      }
      &.no2 {
        top: 76.25%;
        left: 65.25%;
      }
    }
    &.topRight {
      width: 4.85%;
      height: 18.25%;
      &.no1 {
        top: 87.25%;
        left: 5.5%;
      }
      &.no2 {
        top: 81%;
        left: 32%;
      }
      &.no3 {
        top: 67%;
        left: 51.85%;
      }
      &.no4 {
        top: 59%;
        left: 56.85%;
      }
    }
    &.right {
      width: 4.5%;
      height: 15.75%;
      &.no1 {
        top: 49.5%;
        left: -2%;
      }
      &.no2 {
        top: 70%;
        left: 14.5%;
      }
    }
  }
  &.bottomRight {
    width: 5%;
    height: 15.75%;
    &.no1 {
      top: 34%;
      left: 20.5%;
    }
    &.no2 {
      top: 3%;
      left: -0.5%;
    }
  }
  &.bottom {
    width: 5%;
    height: 15.75%;
    &.no1 {
      top: 1%;
      left: 34.5%;
    }
    &.no2 {
      top: 3%;
      left: 73.5%;
    }
  }
  &.bottomLeft {
    width: 5%;
    height: 15.75%;

    &.no1 {
      top: 10%;
      left: 92.5%;
    }
    &.no2 {
      top: 34%;
      left: 79.5%;
    }
  }
}
</style>
