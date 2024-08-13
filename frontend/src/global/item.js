export const DEFAULT_FETCH_SIZE = 30;
export const DEFAULT_RANKING_FETCH_SIZE = 5;
export const MAXIMUM_RANKING_PAGE = 4;

export const ITEM_CATEGORIES = [
  "ONE_HANDED_SWORD",
  "TWO_HANDED_SWORD",
  "ONE_HANDED_AXE",
  "TWO_HANDED_AXE",
  "ONE_HANDED_BLUNT",
  "TWO_HANDED_BLUNT",
  "SPEAR",
  "POLEARM",
  "BOW",
  "CROSSBOW",
  "WAND",
  "STAFF",
  "DAGGER",
  "CLAW",
  "HAT",
  "GLOVES",
  "SHOES",
  "OVERALL",
  "TOP",
  "BOTTOM",
  "SHIELD",
  "EARRING",
  "CAPE",
]

export const DEFAULT_ITEM_RECORD = {
  name: "",
  score: 0,
  success: {
    total: 0,
    ten: 0,
    sixty: 0,
    hundred: 0,
  },
  status: {
    str: 0,
    successCount: 0,
    dex: 0,
    intel: 0,
    luk: 0,
    phyAtk: 0,
    mgAtk: 0, 
    phyDef: 0,
    mgDef: 0,
    acc: 0,
    avo: 0,
    move: 0,
    jump: 0,
    hp: 0,
    mp: 0,
  }

}

export const DEAFULT_SUCCESS_SCROLL = {
  total: 0,
  ten: 0,
  sixty: 0,
  hundred: 0,
}

export const DEFAULT_ITEM_STATUS = {

}

export const INIT_ITEM_INFO = {
  name: '',
  required: {
    level: 0,
    str: 0,
    dex: 0,
    intel: 0,
    luk: 0,
    pop: 0,
  },
  job: {
    common: false,
    warrior: false,
    bowman: false,
    magician: false,
    thief: false,
  },
  category: 'ONE_HANDED_SWORD',
  status: {
    str: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    dex: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    intel: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    luk: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    phyAtk: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    mgAtk: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    phyDef: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    mgDef: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    hp: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    mp: {
      normal: 0,
      lower: 0,
      upper: 0,
    },
    acc: 0,
    avo: 0,
    move: 0,
    jump: 0,
  },
  viewCount: 0,
  attackSpeed: 0,
  upgradableCount: 0
}

export const CATEGORY_NAME = new Map([
  ["ONE_HANDED_SWORD", "한손검"],
  ["TWO_HANDED_SWORD", "두손검"],
  ["ONE_HANDED_AXE", "한손 도끼"],
  ["TWO_HANDED_AXE", "두손 도끼"],
  ["ONE_HANDED_BLUNT", "한손 둔기"],
  ["TWO_HANDED_BLUNT", "두손 둔기"],
  ["SPEAR", "창"],
  ["POLEARM", "폴암"],
  ["BOW", "활"],
  ["CROSSBOW", "석궁"],
  ["WAND", "완드"],
  ["STAFF", "스태프"],
  ["DAGGER", "단검"],
  ["CLAW", "아대"],
  ["HAT", "모자"],
  ["GLOVES", "장갑"],
  ["SHOES", "신발"],
  ["OVERALL", "한벌옷"],
  ["TOP", "상의"],
  ["BOTTOM", "하의"],
  ["SHIELD", "방패"],
  ["EARRING", "귀고리"],
  ["CAPE", "망토"],
]);

export const ATTACK_SPEED = new Map([
  ["VERY_SLOW", "매우 느림"],
  ["SLOW", "느림"],
  ["NORMAL", "보통"],
  ["FAST", "빠름"],
  ["VERY_FAST", "매우 빠름"],
]);