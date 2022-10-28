import { ref } from "vue";
import { defineStore } from "pinia";

export const useScrollStore = defineStore("scroll", () => {
  const targetScroll = ref(null); //if null get pointer icon ; else get target icon
  const clickTimerId = ref();
  const changeScroll = (string) => {
    switch (string) {
      case "F6":
        targetScroll.value = "whiteArmor";
        break;

      case "F7":
        targetScroll.value = "blessedArmor";
        break;

      case "F8":
        targetScroll.value = "cursedArmor";
        break;
      case "F10":
        targetScroll.value = "whiteWeapon";
        break;

      case "F11":
        targetScroll.value = "blessedWeapon";
        break;

      case "F12":
        targetScroll.value = "cursedWeapon";
        break;

      default:
        targetScroll.value = null;
        break;
    }
  };
  const isScrollType = (type) => getScrollType() === type;

  const getScrollType = () => {
    if (targetScroll.value === null) return;
    const reg = /(white)|(cursed)|(blessed)/g;
    return reg.exec(targetScroll.value)[0];
  };
  const getScrollEquiplType = () => {
    if (targetScroll.value === null) return;
    const reg = /(Armor)|(Weapon)/g;
    return reg.exec(targetScroll.value)[0].toLocaleLowerCase();
  };
  const clearClickScorllTimer = () => {
    clearInterval(clickTimerId.value);
  };
  return {
    clickTimerId,
    targetScroll,
    isScrollType,
    changeScroll,
    getScrollType,
    getScrollEquiplType,
    clearClickScorllTimer,
  };
});
