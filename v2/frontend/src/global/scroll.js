const glove_phy_atk = {
  keyword: "GLOVE_PHY_ATK",
  name: "장갑 공격력 주문서",
  shortcut: "장공",
  category: "GLOVE",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 3 }
    ],
    _60: [
      { name: "phyAtk", value: 2 }
    ],
    _100: [
      { name: "phyAtk", value: 1 }
    ]
  }
}

const glove_swift = {
  keyword: "GLOVE_SWIFT",
  name: "장갑 민첩성 주문서",
  shortcut: "장민",
  category: "GLOVE",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "dex", value: 3 },
      { name: "avo", value: 1 },
    ],
    _60: [
      { name: "acc", value: 2 },
      { name: "dex", value: 1 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const glove_health = {
  keyword: "GLOVE_HEALTH",
  name: "장갑 체력 주문서",
  shortcut: "장체",
  category: "GLOVE",
  upgradeValue: {
    _10: [
      { name: "hp", value: 30 }
    ],
    _60: [
      { name: "hp", value: 15 }
    ],
    _100: [
      { name: "hp", value: 5 }
    ]
  }
}

const hat_swift = {
  keyword: "HAT_SWIFT",
  name: "투구 민첩성 주문서",
  shortcut: "투민",
  category: "HAT",
  upgradeValue: {
    _10: [
      { name: "dex", value: 3 }
    ],
    _60: [
      { name: "dex", value: 2 }
    ],
    _100: [
      { name: "dex", value: 1 }
    ]
  }
}


const hat_defence = {
  keyword: "HAT_DEFENCE",
  name: "투구 방어력 주문서",
  shortcut: "투방",
  category: "HAT",
  upgradeValue: {
    _10: [
      { name: "phyDef", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "acc", value: 1 },
    ],
    _60: [
      { name: "phyDef", value: 2 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "phyDef", value: 1 },
    ]
  }
}

const hat_intel = {
  keyword: "HAT_INTEL",
  name: "투구 지력 주문서",
  shortcut: "투지",
  category: "HAT",
  upgradeValue: {
    _10: [
      { name: "intel", value: 3 }
    ],
    _60: [
      { name: "intel", value: 2 }
    ],
    _100: [
      { name: "intel", value: 1 }
    ]
  }
}

const hat_health = {
  keyword: "HAT_HEALTH",
  name: "투구 체력 주문서",
  shortcut: "투체",
  category: "HAT",
  upgradeValue: {
    _10: [
      { name: "hp", value: 30 }
    ],
    _60: [
      { name: "hp", value: 10 }
    ],
    _100: [
      { name: "hp", value: 5 }
    ]
  }
}

const overall_swift = {
  keyword: "OVERALL_SWIFT",
  name: "전신 갑옷 민첩성 주문서",
  shortcut: "전민",
  category: "OVERALL",
  upgradeValue: {
    _10: [
      { name: "dex", value: 5 },
      { name: "acc", value: 3 },
      { name: "move", value: 1 }
    ],
    _60: [
      { name: "dex", value: 2 },
      { name: "acc", value: 1 },
    ],
    _100: [
      { name: "dex", value: 1 },
    ]
  }
}

const overall_defence = {
  keyword: "OVERALL_DEFENCE",
  name: "전신 갑옷 방어력 주문서",
  shortcut: "전방",
  category: "OVERALL",
  upgradeValue: {
    _10: [
      { name: "phyDef", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "hp", value: 10 }
    ],
    _60: [
      { name: "phyDef", value: 2 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "phyDef", value: 1 },
    ]
  }
}

const overall_intel = {
  keyword: "OVERALL_INTEL",
  name: "전신 갑옷 지력 주문서",
  shortcut: "전지",
  category: "OVERALL",
  upgradeValue: {
    _10: [
      { name: "intel", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "mp", value: 10 }
    ],
    _60: [
      { name: "intel", value: 2 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "intel", value: 1 },
    ]
  }
}

const overall_lucky = {
  keyword: "OVERALL_LUCKY",
  name: "전신 갑옷 행운 주문서",
  shortcut: "전행",
  category: "OVERALL",
  upgradeValue: {
    _10: [
      { name: "luk", value: 5 },
      { name: "avo", value: 3 },
      { name: "acc", value: 1 }
    ],
    _60: [
      { name: "luk", value: 2 },
      { name: "avo", value: 1 },
    ],
    _100: [
      { name: "luk", value: 1 },
    ]
  }
}

const overall_strength = {
  keyword: "OVERALL_STRENGTH",
  name: "전신 갑옷 힘 주문서",
  shortcut: "전힘",
  category: "OVERALL",
  upgradeValue: {
    _10: [
      { name: "str", value: 3 },
      { name: "phyDef", value: 3 },
      { name: "hp", value: 5 }
    ],
    _60: [
      { name: "str", value: 2 },
      { name: "phyDef", value: 1 },
    ],
    _100: [
      { name: "str", value: 1 },
    ]
  }
}

const top_defence = {
  keyword: "TOP_DEFENCE",
  name: "상의 방어력 주문서",
  shortcut: "상방",
  category: "TOP",
  upgradeValue: {
    _10: [
      { name: "phyDef", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "hp", value: 10 },
    ],
    _60: [
      { name: "phyDef", value: 2 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "phyDef", value: 1 },
    ]
  }
}

const top_health = {
  keyword: "TOP_HEALTH",
  name: "상의 체력 주문서",
  shortcut: "상체",
  category: "TOP",
  upgradeValue: {
    _10: [
      { name: "hp", value: 30 },
    ],
    _60: [
      { name: "hp", value: 15 },
    ],
    _100: [
      { name: "hp", value: 5 },
    ]
  }
}

const top_lucky = {
  keyword: "TOP_LUCKY",
  name: "상의 행운 주문서",
  shortcut: "상행",
  category: "TOP",
  upgradeValue: {
    _10: [
      { name: "luk", value: 3 },
    ],
    _60: [
      { name: "luk", value: 2 },
    ],
    _100: [
      { name: "luk", value: 1 },
    ]
  }
}

const top_strength = {
  keyword: "TOP_STRENGTH",
  name: "상의 힘 주문서",
  shortcut: "상힘",
  category: "TOP",
  upgradeValue: {
    _10: [
      { name: "str", value: 3 },
    ],
    _60: [
      { name: "str", value: 2 },
    ],
    _100: [
      { name: "str", value: 1 },
    ]
  }
}

const bottom_swift = {
  keyword: "BOTTOM_SWIFT",
  name: "하의 민첩성 주문서",
  shortcut: "하민",
  category: "BOTTOM",
  upgradeValue: {
    _10: [
      { name: "dex", value: 3 },
      { name: "acc", value: 2 },
      { name: "move", value: 1 },
    ],
    _60: [
      { name: "dex", value: 2 },
      { name: "acc", value: 1 },
    ],
    _100: [
      { name: "dex", value: 1 },
    ]
  }
}

const bottom_defence = {
  keyword: "BOTTOM_DEFENCE",
  name: "하의 방어력 주문서",
  shortcut: "하방",
  category: "BOTTOM",
  upgradeValue: {
    _10: [
      { name: "phyDef", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "hp", value: 10 },
    ],
    _60: [
      { name: "phyDef", value: 2 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "phyDef", value: 1 },
    ]
  }
}

const bottom_jump = {
  keyword: "BOTTOM_JUMP",
  name: "하의 점프 주문서",
  shortcut: "하점",
  category: "BOTTOM",
  upgradeValue: {
    _10: [
      { name: "jump", value: 4 },
      { name: "avo", value: 2 },
    ],
    _60: [
      { name: "jump", value: 2 },
      { name: "avo", value: 1 },
    ],
    _100: [
      { name: "jump", value: 1 },
    ]
  }
}

const bottom_health = {
  keyword: "BOTTOM_HEALTH",
  name: "하의 체력 주문서",
  shortcut: "하체",
  category: "BOTTOM",
  upgradeValue: {
    _10: [
      { name: "hp", value: 30 },
    ],
    _60: [
      { name: "hp", value: 10 },
    ],
    _100: [
      { name: "hp", value: 5 },
    ]
  }
}

const shoes_swift = {
  keyword: "SHOES_SWIFT",
  name: "신발 민첩성 주문서",
  shortcut: "신민",
  category: "SHOES",
  upgradeValue: {
    _10: [
      { name: "avo", value: 5 },
      { name: "acc", value: 3 },
      { name: "move", value: 1 },
    ],
    _60: [
      { name: "avo", value: 2 },
      { name: "acc", value: 1 },
    ],
    _100: [
      { name: "avo", value: 1 },
    ]
  }
}

const shoes_move = {
  keyword: "SHOES_MOVE",
  name: "신발 이동속도 주문서",
  shortcut: "신속",
  category: "SHOES",
  upgradeValue: {
    _10: [
      { name: "move", value: 3 },
    ],
    _60: [
      { name: "move", value: 2 },
    ],
    _100: [
      { name: "move", value: 1 },
    ]
  }
}

const shoes_jump = {
  keyword: "SHOES_JUMP",
  name: "신발 점프력 주문서",
  shortcut: "신점",
  category: "SHOES",
  upgradeValue: {
    _10: [
      { name: "jump", value: 5 },
      { name: "dex", value: 3 },
      { name: "move", value: 1 },
    ],
    _60: [
      { name: "jump", value: 2 },
      { name: "dex", value: 1 },
    ],
    _100: [
      { name: "jump", value: 1 },
    ]
  }
}

const one_handed_sword_phy_atk = {
  keyword: "ONE_HANDED_SWORD_PHY_ATK",
  name: "한손검 공격력 주문서",
  shortcut: "공격력",
  category: "ONE_HANDED_SWORD",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const one_handed_sword_acc = {
  keyword: "ONE_HANDED_SWORD_ACC",
  name: "한손검 공격력 주문서",
  shortcut: "명중률",
  category: "ONE_HANDED_SWORD",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const one_handed_axe_phy_atk = {
  keyword: "ONE_HANDED_AXE_PHY_ATK",
  name: "한손도끼 공격력 주문서",
  shortcut: "공격력",
  category: "ONE_HANDED_AXE",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const one_handed_axe_acc = {
  keyword: "ONE_HANDED_AXE_ACC",
  name: "한손도끼 명중률 주문서",
  shortcut: "명중률",
  category: "ONE_HANDED_AXE",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const one_handed_blunt_phy_atk = {
  keyword: "ONE_HANDED_BLUNT_PHY_ATK",
  name: "한손둔기 공격력 주문서",
  shortcut: "공격력",
  category: "ONE_HANDED_BLUNT",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const one_handed_blunt_acc = {
  keyword: "ONE_HANDED_BLUNT_ACC",
  name: "한손둔기 명중률 주문서",
  shortcut: "명중률",
  category: "ONE_HANDED_BLUNT",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "str", value: 1 },
      { name: "phyDef", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const two_handed_sword_phy_atk = {
  keyword: "TWO_HANDED_SWORD_PHY_ATK",
  name: "두손검 공격력 주문서",
  shortcut: "공격력",
  category: "TWO_HANDED_SWORD",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const two_handed_sword_acc = {
  keyword: "TWO_HANDED_SWORD_ACC",
  name: "두손검 명중률 주문서",
  shortcut: "명중률",
  category: "TWO_HANDED_SWORD",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const two_handed_axe_phy_atk = {
  keyword: "TWO_HANDED_AXE_PHY_ATK",
  name: "두손도끼 공격력 주문서",
  shortcut: "공격력",
  category: "TWO_HANDED_AXE",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const two_handed_axe_acc = {
  keyword: "TWO_HANDED_AXE_ACC",
  name: "두손도끼 명중률 주문서",
  shortcut: "명중률",
  category: "TWO_HANDED_AXE",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const two_handed_blunt_phy_atk = {
  keyword: "TWO_HANDED_BLUNT_PHY_ATK",
  name: "두손둔기 공격력 주문서",
  shortcut: "공격력",
  category: "TWO_HANDED_BLUNT",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const two_handed_blunt_acc = {
  keyword: "TWO_HANDED_BLUNT_ACC",
  name: "두손둔기 명중률 주문서",
  shortcut: "명중률",
  category: "TWO_HANDED_BLUNT",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const spear_phy_atk = {
  keyword: "SPEAR_PHY_ATK",
  name: "창 공격력 주문서",
  shortcut: "창공",
  category: "SPEAR",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const spear_acc = {
  keyword: "SPEAR_ACC",
  name: "창 명중률 주문서",
  shortcut: "명중률",
  category: "SPEAR",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const polearm_phy_atk = {
  keyword: "POLEARM_PHY_ATK",
  name: "폴암 공격력 주문서",
  shortcut: "폴공",
  category: "POLEARM",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "str", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "str", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const polearm_acc = {
  keyword: "POLEARM_ACC",
  name: "폴암 명중률 주문서",
  shortcut: "폴명",
  category: "POLEARM",
  upgradeValue: {
    _10: [
      { name: "acc", value: 5 },
      { name: "phyAtk", value: 3 },
      { name: "dex", value: 3 },
    ],
    _60: [
      { name: "acc", value: 3 },
      { name: "phyAtk", value: 1 },
      { name: "dex", value: 2 },
    ],
    _100: [
      { name: "acc", value: 1 },
    ]
  }
}

const claw_phy_atk = {
  keyword: "CLAW_PHY_ATK",
  name: "아대 공격력 주문서",
  shortcut: "아공",
  category: "CLAW",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "acc", value: 3 },
      { name: "luk", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "acc", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const dagger_phy_atk = {
  keyword: "DAGGER_PHY_ATK",
  name: "단검 공격력 주문서",
  shortcut: "단공",
  category: "DAGGER",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "luk", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "luk", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const bow_phy_atk = {
  keyword: "BOW_PHY_ATK",
  name: "활 공격력 주문서",
  shortcut: "활공",
  category: "BOW",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "acc", value: 3 },
      { name: "dex", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "acc", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

const crossbow_phy_atk = {
  keyword: "CROSSBOW_PHY_ATK",
  name: "석궁 공격력 주문서",
  shortcut: "석공",
  category: "CROSSBOW",
  upgradeValue: {
    _10: [
      { name: "phyAtk", value: 5 },
      { name: "acc", value: 3 },
      { name: "dex", value: 1 },
    ],
    _60: [
      { name: "phyAtk", value: 2 },
      { name: "acc", value: 1 },
    ],
    _100: [
      { name: "phyAtk", value: 1 },
    ]
  }
}

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

const staff_mg_atk = {
  keyword: "STAFF_MG_ATK",
  name: "스태프 마력 주문서",
  shortcut: "스마",
  category: "STAFF",
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

const earring_swift = {
  keyword: "EARRING_SWIFT",
  name: "귀 장식 민첩 주문서",
  shortcut: "귀민",
  category: "EARRING",
  upgradeValue: {
    _10: [
      { name: "dex", value: 3 }
    ],
    _60: [
      { name: "dex", value: 2 }
    ],
    _100: [
      { name: "dex", value: 1 }
    ]
  }
}

const earring_intel = {
  keyword: "EARRING_INTEL",
  name: "귀 장식 지력 주문서",
  shortcut: "귀지",
  category: "EARRING",
  upgradeValue: {
    _10: [
      { name: "mgAtk", value: 5 },
      { name: "intel", value: 3 },
      { name: "mgDef", value: 1 },
    ],
    _60: [
      { name: "mgAtk", value: 2 },
      { name: "intel", value: 1 },
    ],
    _100: [
      { name: "mgAtk", value: 1 },
    ]
  }
}

const earring_lucky = {
  keyword: "EARRING_LUCKY",
  name: "귀 장식 행운 주문서",
  shortcut: "귀행",
  category: "EARRING",
  upgradeValue: {
    _10: [
      { name: "luk", value: 3 }
    ],
    _60: [
      { name: "luk", value: 2 }
    ],
    _100: [
      { name: "luk", value: 1 }
    ]
  }
}

const earring_health = {
  keyword: "EARRING_HEALTH",
  name: "귀 장식 체력 주문서",
  shortcut: "귀체",
  category: "EARRING",
  upgradeValue: {
    _10: [
      { name: "hp", value: 30 }
    ],
    _60: [
      { name: "hp", value: 15 }
    ],
    _100: [
      { name: "hp", value: 5 }
    ]
  }
}

const cape_mana = {
  keyword: "CAPE_MANA",
  name: "망토 마나 주문서",
  shortcut: "망마",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "mp", value: 20 }
    ],
    _60: [
      { name: "mp", value: 10 }
    ],
    _100: [
      { name: "mp", value: 5 }
    ]
  }
}

const cape_swift = {
  keyword: "CAPE_SWIFT",
  name: "망토 민첩성 주문서",
  shortcut: "망민",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "dex", value: 3 }
    ],
    _60: [
      { name: "dex", value: 2 }
    ],
    _100: [
      { name: "dex", value: 1 }
    ]
  }
}

const cape_intel = {
  keyword: "CAPE_INTEL",
  name: "망토 지력 주문서",
  shortcut: "망지",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "intel", value: 3 }
    ],
    _60: [
      { name: "intel", value: 2 }
    ],
    _100: [
      { name: "intel", value: 1 }
    ]
  }
}

const cape_health = {
  keyword: "CAPE_HEALTH",
  name: "망토 체력 주문서",
  shortcut: "망체",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "hp", value: 20 }
    ],
    _60: [
      { name: "hp", value: 10 }
    ],
    _100: [
      { name: "hp", value: 5 }
    ]
  }
}

const cape_lucky = {
  keyword: "CAPE_LUCKY",
  name: "망토 행운 주문서",
  shortcut: "망행",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "luk", value: 3 }
    ],
    _60: [
      { name: "luk", value: 2 }
    ],
    _100: [
      { name: "luk", value: 1 }
    ]
  }
}

const cape_strength = {
  keyword: "CAPE_STRENGTH",
  name: "망토 힘 주문서",
  shortcut: "망힘",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "str", value: 3 }
    ],
    _60: [
      { name: "str", value: 2 }
    ],
    _100: [
      { name: "str", value: 1 }
    ]
  }
}

const cape_mg_def = {
  keyword: "CAPE_MG_DEF",
  name: "망토 마법방어력 주문서",
  shortcut: "망마방",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "mgDef", value: 5 },
      { name: "phyDef", value: 3 },
      { name: "mp", value: 10 },
    ],
    _60: [
      { name: "mgDef", value: 3 },
      { name: "phyDef", value: 1 },
    ],
    _100: [
      { name: "mgDef", value: 1 },
    ]
  }
}

const cape_phy_def = {
  keyword: "CAPE_PHY_DEF",
  name: "망토 물리방어력 주문서",
  shortcut: "망물방",
  category: "CAPE",
  upgradeValue: {
    _10: [
      { name: "phyDef", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "hp", value: 10 },
    ],
    _60: [
      { name: "phyDef", value: 3 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "phyDef", value: 1 },
    ]
  }
}

const shield_defence = {
  keyword: "SHIELD_DEFENCE",
  name: "방패 방어력 주문서",
  shortcut: "방어력",
  category: "SHIELD",
  upgradeValue: {
    _10: [
      { name: "phyDef", value: 5 },
      { name: "mgDef", value: 3 },
      { name: "hp", value: 10 },
    ],
    _60: [
      { name: "phyDef", value: 2 },
      { name: "mgDef", value: 1 },
    ],
    _100: [
      { name: "phyDef", value: 1 },
    ]
  }
}

const shield_health = {
  keyword: "SHIELD_HEALTH",
  name: "방패 체력 주문서",
  shortcut: "방체",
  category: "SHIELD",
  upgradeValue: {
    _10: [
      { name: "hp", value: 30 },
    ],
    _60: [
      { name: "hp", value: 15 },
    ],
    _100: [
      { name: "hp", value: 5 },
    ]
  }
}

const shield_lucky = {
  keyword: "SHIELD_LUCKY",
  name: "방패 행운 주문서",
  shortcut: "방행",
  category: "SHIELD",
  upgradeValue: {
    _10: [
      { name: "luk", value: 3 },
    ],
    _60: [
      { name: "luk", value: 2 },
    ],
    _100: [
      { name: "luk", value: 1 },
    ]
  }
}

const shield_strength = {
  keyword: "SHIELD_STRENGTH",
  name: "방패 힘 주문서",
  shortcut: "방힘",
  category: "SHIELD",
  upgradeValue: {
    _10: [
      { name: "str", value: 3 },
    ],
    _60: [
      { name: "str", value: 2 },
    ],
    _100: [
      { name: "str", value: 1 },
    ]
  }
}

export const SCROLL_NAME_LIST = [
  "GLOVE_PHY_ATK",
  "GLOVE_SWIFT",
  "GLOVE_HEALTH",

  "HAT_SWIFT",
  "HAT_DEFENCE",
  "HAT_INTEL",
  "HAT_HEALTH",

  "OVERALL_SWIFT",
  "OVERALL_DEFENCE",
  "OVERALL_INTEL",
  "OVERALL_LUCKY",
  "OVERALL_STRENGTH",

  "TOP_DEFENCE",
  "TOP_HEALTH",
  "TOP_LUCKY",
  "TOP_STRENGTH",

  "BOTTOM_SWIFT",
  "BOTTOM_DEFENCE",
  "BOTTOM_JUMP",
  "BOTTOM_HEALTH",

  "SHOES_SWIFT",
  "SHOES_MOVE",
  "SHOES_JUMP",

  "ONE_HANDED_SWORD_PHY_ATK",
  "ONE_HANDED_SWORD_ACC",

  "ONE_HANDED_AXE_PHY_ATK",
  "ONE_HANDED_AXE_ACC",

  "ONE_HANDED_BLUNT_PHY_ATK",
  "ONE_HANDED_BLUNT_ACC",

  "TWO_HANDED_SWORD_PHY_ATK",
  "TWO_HANDED_SWORD_ACC",

  "TWO_HANDED_AXE_PHY_ATK",
  "TWO_HANDED_AXE_ACC",

  "TWO_HANDED_BLUNT_PHY_ATK",
  "TWO_HANDED_BLUNT_ACC",

  "SPEAR_PHY_ATK",
  "SPEAR_ACC",

  "POLEARM_PHY_ATK",
  "POLEARM_ACC",

  "CLAW_PHY_ATK",
  "DAGGER_PHY_ATK",

  "BOW_PHY_ATK",
  "CROSSBOW_PHY_ATK",

  "WAND_MG_ATK",
  "STAFF_MG_ATK",

  "EARRING_SWIFT",
  "EARRING_INTEL",
  "EARRING_LUCKY",
  "EARRING_HEALTH",

  "CAPE_STRENGTH",
  "CAPE_SWIFT",
  "CAPE_INTEL",
  "CAPE_LUCKY",
  "CAPE_MANA",
  "CAPE_HEALTH",
  "CAPE_MG_DEF",
  "CAPE_PHY_DEF",

  "SHIELD_DEFENCE",
  "SHIELD_HEALTH",
  "SHIELD_LUCKY",
  "SHIELD_STRENGTH",
]



export const SCROLL_INFO = new Map([
  ["GLOVE_PHY_ATK", glove_phy_atk],
  ["GLOVE_SWIFT", glove_swift],
  ["GLOVE_HEALTH", glove_health],

  ["HAT_SWIFT", hat_swift],
  ["HAT_DEFENCE", hat_defence],
  ["HAT_INTEL", hat_intel],
  ["HAT_HEALTH", hat_health],
  
  ["OVERALL_SWIFT", overall_swift],
  ["OVERALL_DEFENCE", overall_defence],
  ["OVERALL_INTEL", overall_intel],
  ["OVERALL_LUCKY", overall_lucky],
  ["OVERALL_STRENGTH", overall_strength],

  ["TOP_DEFENCE", top_defence],
  ["TOP_HEALTH", top_health],
  ["TOP_LUCKY", top_lucky],
  ["TOP_STRENGTH", top_strength],

  ["BOTTOM_SWIFT", bottom_swift],
  ["BOTTOM_DEFENCE", bottom_defence],
  ["BOTTOM_JUMP", bottom_jump],
  ["BOTTOM_HEALTH", bottom_health],

  ["SHOES_SWIFT", shoes_swift],
  ["SHOES_MOVE", shoes_move],
  ["SHOES_JUMP", shoes_jump],

  ["ONE_HANDED_SWORD_PHY_ATK", one_handed_sword_phy_atk],
  ["ONE_HANDED_SWORD_ACC", one_handed_sword_acc],

  ["ONE_HANDED_AXE_PHY_ATK", one_handed_axe_phy_atk],
  ["ONE_HANDED_AXE_ACC", one_handed_axe_acc],

  ["ONE_HANDED_BLUNT_PHY_ATK", one_handed_blunt_phy_atk],
  ["ONE_HANDED_BLUNT_ACC", one_handed_blunt_acc],

  ["TWO_HANDED_SWORD_PHY_ATK", two_handed_sword_phy_atk],
  ["TWO_HANDED_SWORD_ACC", two_handed_sword_acc],

  ["TWO_HANDED_AXE_PHY_ATK", two_handed_axe_phy_atk],
  ["TWO_HANDED_AXE_ACC", two_handed_axe_acc],

  ["TWO_HANDED_BLUNT_PHY_ATK", two_handed_blunt_phy_atk],
  ["TWO_HANDED_BLUNT_ACC", two_handed_blunt_acc],

  ["SPEAR_PHY_ATK", spear_phy_atk],
  ["SPEAR_ACC", spear_acc],

  ["POLEARM_PHY_ATK", polearm_phy_atk],
  ["POLEARM_ACC", polearm_acc],

  ["CLAW_PHY_ATK", claw_phy_atk],
  ["DAGGER_PHY_ATK", dagger_phy_atk],

  ["BOW_PHY_ATK", bow_phy_atk],
  ["CROSSBOW_PHY_ATK", crossbow_phy_atk],

  ["WAND_MG_ATK", wand_mg_atk],
  ["STAFF_MG_ATK", staff_mg_atk],

  ["EARRING_SWIFT", earring_swift],
  ["EARRING_INTEL", earring_intel],
  ["EARRING_LUCKY", earring_lucky],
  ["EARRING_HEALTH", earring_health],

  ["CAPE_STRENGTH", cape_strength],
  ["CAPE_SWIFT", cape_swift],
  ["CAPE_INTEL", cape_intel],
  ["CAPE_LUCKY", cape_lucky],
  ["CAPE_HEALTH", cape_health],
  ["CAPE_MANA", cape_mana],
  ["CAPE_PHY_DEF", cape_phy_def],
  ["CAPE_MG_DEF", cape_mg_def],

  ["SHIELD_DEFENCE", shield_defence],
  ["SHIELD_HEALTH", shield_health],
  ["SHIELD_STRENGTH", shield_strength],
  ["SHIELD_LUCKY", shield_lucky],
  
])
