import type {
  AttackSpeed,
  ItemCategory,
  ItemDetail,
  ItemStatus,
  StatusKey,
} from '../types/item'
import type { SuccessScrollCount } from '../types/scroll'

export const DEFAULT_FETCH_SIZE = 30
export const DEFAULT_RANKING_FETCH_SIZE = 5
export const MAXIMUM_RANKING_PAGE = 10

export const ITEM_CATEGORIES: ItemCategory[] = [
  'ONE_HANDED_SWORD',
  'TWO_HANDED_SWORD',
  'ONE_HANDED_AXE',
  'TWO_HANDED_AXE',
  'ONE_HANDED_BLUNT',
  'TWO_HANDED_BLUNT',
  'SPEAR',
  'POLEARM',
  'BOW',
  'CROSSBOW',
  'WAND',
  'STAFF',
  'DAGGER',
  'CLAW',
  'HAT',
  'GLOVES',
  'SHOES',
  'OVERALL',
  'TOP',
  'BOTTOM',
  'SHIELD',
  'EARRING',
  'CAPE',
  'PENDANT',
]

/** 기록 표시용 기본 형태. (UI 초기 상태) */
export const DEFAULT_ITEM_RECORD = {
  name: 'default_user',
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
  },
  tries: 0,
}

export const DEAFULT_SUCCESS_SCROLL: SuccessScrollCount = {
  total: 0,
  ten: 0,
  sixty: 0,
  hundred: 0,
}

const emptyStatusRange = { normal: 0, lower: 0, upper: 0 }
const emptyItemStatus: ItemStatus = {
  str: { ...emptyStatusRange },
  dex: { ...emptyStatusRange },
  intel: { ...emptyStatusRange },
  luk: { ...emptyStatusRange },
  phyAtk: { ...emptyStatusRange },
  mgAtk: { ...emptyStatusRange },
  phyDef: { ...emptyStatusRange },
  mgDef: { ...emptyStatusRange },
  hp: { ...emptyStatusRange },
  mp: { ...emptyStatusRange },
  acc: { ...emptyStatusRange },
  avo: { ...emptyStatusRange },
  move: { ...emptyStatusRange },
  jump: { ...emptyStatusRange },
}

/** 아이템 정보 fetch 전 placeholder. */
export const INIT_ITEM_INFO: ItemDetail = {
  name: '',
  requiredStatus: {
    level: 0,
    str: 0,
    dex: 0,
    intel: 0,
    luk: 0,
    pop: 0,
  },
  availableJob: {
    common: false,
    warrior: false,
    bowman: false,
    magician: false,
    thief: false,
  },
  category: 'ONE_HANDED_SWORD',
  status: emptyItemStatus,
  viewCount: 0,
  attackSpeed: 'NONE',
  upgradableCount: 0,
  knockBackPercent: 0,
}

export const CATEGORY_NAME: Map<ItemCategory, string> = new Map([
  ['ONE_HANDED_SWORD', '한손검'],
  ['TWO_HANDED_SWORD', '두손검'],
  ['ONE_HANDED_AXE', '한손 도끼'],
  ['TWO_HANDED_AXE', '두손 도끼'],
  ['ONE_HANDED_BLUNT', '한손 둔기'],
  ['TWO_HANDED_BLUNT', '두손 둔기'],
  ['SPEAR', '창'],
  ['POLEARM', '폴암'],
  ['BOW', '활'],
  ['CROSSBOW', '석궁'],
  ['WAND', '완드'],
  ['STAFF', '스태프'],
  ['DAGGER', '단검'],
  ['CLAW', '아대'],
  ['HAT', '모자'],
  ['GLOVES', '장갑'],
  ['SHOES', '신발'],
  ['OVERALL', '한벌옷'],
  ['TOP', '상의'],
  ['BOTTOM', '하의'],
  ['SHIELD', '방패'],
  ['EARRING', '귀고리'],
  ['CAPE', '망토'],
  ['PENDANT', '펜던트'],
])

export const ATTACK_SPEED: Map<AttackSpeed, string> = new Map([
  ['VERY_SLOW', '매우 느림'],
  ['SLOW', '느림'],
  ['NORMAL', '보통'],
  ['FAST', '빠름'],
  ['VERY_FAST', '매우 빠름'],
])

// re-export 으로 다른 파일이 import 경로를 굳이 ../types/item 으로 바꾸지 않아도 동작합니다.
export type { StatusKey }
