import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useKnightStore } from "./knight";
import data from "@/data/dataRole.json";

export const useRoleStore = defineStore("role", () => {
  const role = reactive({
    data,
    gifUrl: computed(
      () => `${role.currentRole}/${role.currentRole}_${role.currentGender}.gif`
    ),
    updatedAttr: 0,
    currentData: computed(() => role.data[role.currentRole]),
    currentRole: null, // depends on the VueRouter in RolesPage.vue Component
    currentGender: null, // depends on the VueRouter in RolesPage.vue Component
    currentBackGround: computed(
      () =>
        `url(${getUrlForHashWhenProd(
          `${role.currentRole}/${role.currentRole}_background.webp`
        )})`
    ),
  });
  const storeKnight = useKnightStore();
  const getAC = computed(() => {
    const roleEquips = role.currentData.equips;
    const roleAC = role.currentData.basic.ac;
    let totalEquipsAC = 0;

    roleEquips.forEach((roleEquip) => {
      const isArmor = computed(() => /armor/.test(roleEquip.category));
      const calcTotalEquipAC = computed(
        () => (totalEquipsAC += roleEquip.armor + roleEquip.value)
      );

      if (isArmor.value) calcTotalEquipAC.value;
    });

    if (roleAC - totalEquipsAC === -40) storeKnight.getGameChatEvent("armor1");
    if (roleAC - totalEquipsAC === -45) storeKnight.getGameChatEvent("armor2");
    return roleAC - totalEquipsAC;
  });

  const getMR = computed(() => {
    const roleEquips = role.currentData.equips;
    const roleMR = role.currentData.basic.mr;
    let totalEquipsMR = 0;

    roleEquips.forEach((roleEquip) => {
      const isCloakType = computed(() => /cloak/.test(roleEquip.category));
      const isNotEquipMR = computed(() => {
        return typeof roleEquip.mr !== "number";
      });
      const calcTotalEquipMR = (type) => {
        let rate;
        if (type === "cloak") rate = 2;
        else rate = 1;

        totalEquipsMR += roleEquip.mr + roleEquip.value * rate;
      };

      if (isNotEquipMR.value) return;
      else if (isCloakType.value) calcTotalEquipMR("cloak");
      else calcTotalEquipMR();
    });

    return roleMR + totalEquipsMR;
  });

  const getER = () => {
    //If the combat feature turns on, AC->ER for the darkElf, but not now.
    if (role.currentRole === "darkElf") {
      return (
        // Math.abs(getAC() - role.currentData.basic.ac) +
        role.currentData.basic.er
      );
    }
    return role.currentData.basic.er;
  };

  const getGifUrl = () => `url(${getUrlForHashWhenProd(role.gifUrl)})`;

  const isGenderType = (gender) => role.currentGender === gender;

  const getGenderClass = () => {
    if (role.currentGender === "male")
      return `${role.currentRole} ${role.currentGender}`;
    else if (role.currentGender === "female")
      return `${role.currentRole} ${role.currentGender}`;
  };
  const calcEquipAttribute = (string, equip) => {
    const equipToAttr = {
      力量手套: "str",
      艾爾穆的祝福: "dex",
      魔法能量之書: "int",
      影子手套: "con",
    };

    if (equip.isAttrEquip) {
      const attr = equipToAttr[equip.name];
      const plusAttr = computed(
        () => (role.currentData.basic[attr] += equip.attribute[attr])
      );
      const minusAttr = computed(
        () => (role.currentData.basic[attr] -= equip.attribute[attr])
      );

      if (string === "plusAttribute") plusAttr.value;
      else if (string === "minusAttribute") minusAttr.value;
    }
  };
  const getUrlForHashWhenProd = (name) =>
    //using this when need dynamic static files in the assets, otherwise will get 404 for static files. see more in https://vitejs.dev/guide/assets.html.
    new URL(`/src/assets/${name}`, import.meta.url).href;

  return {
    role,
    getAC,
    getMR,
    getER,
    getGifUrl,
    isGenderType,
    getGenderClass,
    calcEquipAttribute,
    getUrlForHashWhenProd,
  };
});
