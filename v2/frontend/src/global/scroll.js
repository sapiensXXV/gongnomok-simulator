const wand_mg_atk = {
  keyword: "WAND_MG_ATK",
  name: "완드 마력 주문서",
  shortcut: "완마",
  category: "WAND",
  upgradeValue: {
    _10: [
      { name: "mgAtk", value: 5 },
      { name: "intel", value: 3 },
      { name: "mgDef", value: 1 }
    ],
    _60: [
      { name: "mgAtk", value: 2 },
      { name: "intel", value: 1 },
    ],
    _100: [
      { name: "mgAtk", value: 1 },
    ],
  }
};

export const SCROLL_NAME_LIST = [
  "WAND_MG_ATK",
]

export const SCROLL_INFO = new Map([
  ["WAND_MG_ATK", wand_mg_atk],
])


export const defaultScrollInfo = { ...wand_mg_atk }

