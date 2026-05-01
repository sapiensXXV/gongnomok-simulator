/**
 * 아이템 도메인 타입 정의.
 *
 * 운영 API 응답 (GET /api/item/{id}, /api/items 등) shape 을 그대로 반영합니다.
 * 백엔드와 계약이 바뀌면 이 파일을 갱신합니다.
 */

export type ItemCategory =
  | 'ONE_HANDED_SWORD'
  | 'TWO_HANDED_SWORD'
  | 'ONE_HANDED_AXE'
  | 'TWO_HANDED_AXE'
  | 'ONE_HANDED_BLUNT'
  | 'TWO_HANDED_BLUNT'
  | 'SPEAR'
  | 'POLEARM'
  | 'BOW'
  | 'CROSSBOW'
  | 'WAND'
  | 'STAFF'
  | 'DAGGER'
  | 'CLAW'
  | 'HAT'
  | 'GLOVES'
  | 'SHOES'
  | 'OVERALL'
  | 'TOP'
  | 'BOTTOM'
  | 'SHIELD'
  | 'EARRING'
  | 'CAPE'
  | 'PENDANT'

export type AttackSpeed =
  | 'VERY_SLOW'
  | 'SLOW'
  | 'NORMAL'
  | 'FAST'
  | 'VERY_FAST'
  | 'NONE'

/**
 * 아이템 등급 — 잠재능력 시스템의 등급 위계와 연동.
 * 메이플 플래닛 사양상 LEGENDARY 는 도달 불가 (유니크가 상한).
 */
export type ItemGrade = 'NORMAL' | 'RARE' | 'EPIC' | 'UNIQUE'

export const ITEM_GRADE_ORDER: ItemGrade[] = ['NORMAL', 'RARE', 'EPIC', 'UNIQUE']

/** 한 단계 위 등급 반환. UNIQUE 는 그대로. */
export function nextGrade(grade: ItemGrade): ItemGrade {
  const idx = ITEM_GRADE_ORDER.indexOf(grade)
  return idx < ITEM_GRADE_ORDER.length - 1 ? ITEM_GRADE_ORDER[idx + 1] : grade
}

export type JobName = 'warrior' | 'magician' | 'bowman' | 'thief'

/**
 * 능력치 키. 시뮬레이터·주문서·기록 등 모든 곳에서 동일하게 사용.
 */
export type StatusKey =
  | 'str'
  | 'dex'
  | 'intel'
  | 'luk'
  | 'phyAtk'
  | 'mgAtk'
  | 'phyDef'
  | 'mgDef'
  | 'acc'
  | 'avo'
  | 'move'
  | 'jump'
  | 'hp'
  | 'mp'

/** 능력치 1개당 평균치(normal) + 옵션 범위(lower/upper). */
export interface StatusRange {
  normal: number
  lower: number
  upper: number
}

/** 아이템 능력치 셋. 모든 status 가 StatusRange 형태로 옴. */
export type ItemStatus = Record<StatusKey, StatusRange>

/** 착용 요구 능력치. */
export interface RequiredStatus {
  level: number
  str: number
  dex: number
  intel: number
  luk: number
  pop: number
}

/** 직업별 착용 가능 여부. common=true 면 모든 직업 가능. */
export interface AvailableJob {
  common: boolean
  warrior: boolean
  bowman: boolean
  magician: boolean
  thief: boolean
}

/** GET /api/item/{id} 응답. */
export interface ItemDetail {
  name: string
  requiredStatus: RequiredStatus
  availableJob: AvailableJob
  category: ItemCategory
  status: ItemStatus
  viewCount: number
  attackSpeed: AttackSpeed | null
  upgradableCount: number
  knockBackPercent: number
}

/** GET /api/items?... 목록 응답의 단일 항목. */
export interface ItemSummary {
  itemId: number
  name: string
}

/** GET /api/items?... 응답 wrapper. */
export interface ItemListResponse {
  items: ItemSummary[]
}
