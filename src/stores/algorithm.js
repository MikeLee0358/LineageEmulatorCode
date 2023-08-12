import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useChatStore } from "./chat";
import { useRoleStore } from "./role";
import { useScrollStore } from "./scroll";
import { useKnightStore } from "./knight";

export const useAlgorithmStore = defineStore("algorithm", () => {
  const storeRole = useRoleStore();
  const storeChat = useChatStore();
  const storeScroll = useScrollStore();
  const storeKnight = useKnightStore();

  const dice = reactive({
    bonus: 0,
    value: null,
    state: null,
    successValue: null,
  });
  const target = reactive({
    name: null,
    value: null,
    category: null,
    delayTime: 3000,
    safetyValue: null,
    isSuccess: computed(() => {
      getDiceValue();
      getDiceSuccessValue();

      return dice.successValue >= dice.value;
    }),
    isMatchedScrollEquipType: computed(
      () => storeScroll.getScrollEquiplType() === getTargetCategoryEquipType()
    ),
  });

  const getDiceValue = () =>
    (dice.value = Number((Math.random() * 100).toFixed(2)));

  const resetAtTheEnd = (value) => {
    dice.state = value;
    storeScroll.targetScroll = value;
  };

  const isCategoryType = (text) => {
    if (target.category === null || typeof text !== "string") return;
    return target.category.toLowerCase().includes(text.toLowerCase());
  };

  const getEquipGoneEffect = (equip, event) => {
    let temporaryACbox = equip.armor;
    let temporaryMRbox = equip.mr;
    const toggleEquipHidden = () => event.target.classList.toggle("hidden");

    storeRole.calcEquipAttribute("minusAttribute", equip);
    toggleEquipHidden();
    equip.armor = 0;

    setTimeout(() => {
      toggleEquipHidden();
      equip.armor = temporaryACbox;
      equip.mr = temporaryMRbox;
      storeRole.calcEquipAttribute("plusAttribute", equip);
    }, target.delayTime);
  };
  const handleFailure = (equip, event) => {
    if (Math.abs(target.value) === 9)
      storeKnight.getGameChatEvent("weaponFailure");

    dice.state = 0;
    storeChat.updateChatState();
    target.value = 0;
    getEquipGoneEffect(equip, event);
    resetAtTheEnd(null);
  };

  const updataChatAndValue = (value) => {
    const updateEquipValue = () => {
      if (storeScroll.isScrollType("cursed")) target.value--;
      else target.value += dice.state;
    };

    getRandomStateOneTo(value);
    storeChat.updateChatState();
    updateEquipValue();
    resetAtTheEnd(null);
  };
  const getTargetCategoryEquipType = () => {
    if (target.category === null) return;
    return target.category.substring(0, 6).toLowerCase().trim();
  };
  const getDiceSuccessValue = () => {
    const specialCases = () => {
      /* example with Weapon Formula */
      //white & blessed: -7 -8... succsessValue will be 33%, to prevent this situation happended return 100%
      //cursed: when +6 up use cursedScroll successValue will be 33%, to prevent this situation happended return 100%

      return (
        (storeScroll.isScrollType("white") && target.value < 0) ||
        (storeScroll.isScrollType("blessed") && target.value < 0) ||
        (storeScroll.isScrollType("cursed") &&
          target.value >= Math.abs(target.safetyValue))
      );
    };
    const isValueOver9 = () => Math.abs(target.value) >= 9;
    const isValueUnder4 = () => Math.abs(target.value) < 4;
    const isValueUnderSafetyValue = () =>
      Math.abs(target.value) < Math.abs(target.safetyValue);
    const getWeaponSucessValue = () => {
      /* Weapon Formula */
      //|underSafetyValue|:100%
      //|0~8|:33%
      //|9up|:10%
      if (isValueUnderSafetyValue())
        return (dice.successValue = 100 + dice.bonus);

      if (isValueOver9()) dice.successValue = 10 + dice.bonus;
      else dice.successValue = 33.33 + dice.bonus;
    };
    const getArmorSuccessValue = () => {
      /* Armor Formula */
      //|underSafetyValue|:100%
      //|0~8|:1/n * 100% (if(n<4) 25%)
      //|9up|:10%
      if (isValueUnderSafetyValue())
        return (dice.successValue = 100 + dice.bonus);

      if (isValueOver9()) dice.successValue = 10 + dice.bonus;
      else if (isValueUnder4()) dice.successValue = 25 + dice.bonus;
      else dice.successValue = (1 / Math.abs(target.value)) * 100 + dice.bonus;
    };

    if (specialCases()) return (dice.successValue = 100);

    if (isCategoryType("weapon")) getWeaponSucessValue();
    else if (isCategoryType("armor")) getArmorSuccessValue();
  };
  const getRandomStateOneTo = (num) =>
    (dice.state = Number(Math.floor(Math.random() * num) + 1));

  const updataChatAndValueOver9 = (value) => {
    //white: 33% +1 66%: nothing happened message
    //cursed: 50% +1 50%: nothing happened message
    //blessed: 66% +1 33%: nothing happened message
    // dice.state:
    // -1: nothing happened msg
    //  1: +1 msg

    const isSuccessIn = (array) => array.includes(dice.state);

    getRandomStateOneTo(value); // dice.state : 1 ~ 6

    if (storeScroll.isScrollType("white") && isSuccessIn([1, 2])) {
      target.value++;
      dice.state = 1;
      storeKnight.getGameChatEvent("weaponSuccess");
    } else if (storeScroll.isScrollType("cursed") && isSuccessIn([1, 2, 3])) {
      target.value--;
      dice.state = 1;
      storeKnight.getGameChatEvent("weaponSuccess");
    } else if (
      storeScroll.isScrollType("blessed") &&
      isSuccessIn([1, 2, 3, 4])
    ) {
      target.value++;
      dice.state = 1;
      storeKnight.getGameChatEvent("weaponSuccess");
    } else {
      //failure
      dice.state = -1;
      storeKnight.getGameChatEvent("weaponNope");
    }

    storeChat.updateChatState();
    resetAtTheEnd(null);
  };

  function algorithmSystem(equip, event) {
    /* The idea is separate "Success Rate" and "Scroll Type" */
    //1. click a equip
    //2. handle Success Rate
    //    ->  true -> Scroll Type  -> END
    //                -> if |9| up
    //                   -> success -> +1 & +1 message -> END
    //                   -> failure -> +0 & nothing happened message -> END
    //    ->  false -> END
    if (storeKnight.game.isStopFunction) return;
    if (!target.isMatchedScrollEquipType) return;

    if (target.isSuccess) {
      switch (storeScroll.getScrollType()) {
        case "blessed":
          if (target.value < 3) return updataChatAndValue(3);
          else if (target.value < 6) return updataChatAndValue(2);
          else if (target.value < 9) return updataChatAndValue(1);
          else updataChatAndValueOver9(6);
          break;

        case "white":
          if (target.value < 9) return updataChatAndValue(1);
          else updataChatAndValueOver9(6);
          break;

        case "cursed":
          if (target.value > -9) return updataChatAndValue(1);
          else updataChatAndValueOver9(6);
          break;
      }
    } else handleFailure(equip, event);
  }

  return {
    dice,
    target,
    isCategoryType,
    algorithmSystem,
  };
});
