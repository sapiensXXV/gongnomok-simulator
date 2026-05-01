import type { ItemCategory, ItemGrade } from './item'

/**
 * 잠재능력 도메인 타입.
 *
 * 메이플 플래닛 「수상한 큐브 / 미라클 큐브」 시스템 모델링.
 * 등급 위계: NORMAL → RARE → EPIC → UNIQUE (LEGENDARY 미도달).
 */

/**
 * 잠재능력 옵션이 영향을 주는 능력치 종류.
 * status.ts 의 StatusKey 보다 광범위 — 올스탯, 보스 데미지, 크리티컬 등 잠재 전용 옵션 포함.
 */
export type PotentialStatType =
  | 'str'
  | 'dex'
  | 'intel'
  | 'luk'
  | 'all_stat'
  | 'phyAtk'
  | 'mgAtk'
  | 'phyDef'
  | 'mgDef'
  | 'hp'
  | 'mp'
  | 'move'
  | 'jump'
  | 'crit_rate'
  | 'crit_damage'
  | 'boss_damage'
  | 'monster_def_ignore'
  | 'cooldown_reduction'

/**
 * 옵션 단위 — flat(고정값), percent(퍼센트), seconds(초 단위 — 쿨감 등).
 */
export type PotentialUnit = 'flat' | 'percent' | 'seconds'

/**
 * 옵션 그룹 제약 — 메이플 플래닛 공식 사양.
 * 같은 그룹의 옵션들은 한 잠재 세트(최대 3줄)에 합산 N개까지만 등장.
 *
 * - RARE_MAX_ONE: 한 세트에 최대 1개 (예: 쓸만한 스킬 계열, 피격 후 무적시간 증가)
 * - RARE_MAX_TWO: 한 세트에 최대 2개 (예: 피격 시 데미지 % 무시, 피격 시 일정 시간 무적)
 *
 * 미지정(undefined) 옵션은 무제한.
 * 도메인 문서 5.8.4 참조.
 */
export type ExclusiveGroupKey = 'RARE_MAX_ONE' | 'RARE_MAX_TWO'

export const EXCLUSIVE_GROUP_LIMIT: Record<ExclusiveGroupKey, number> = {
  RARE_MAX_ONE: 1,
  RARE_MAX_TWO: 2,
}

/** 잠재능력 1줄의 옵션. */
export interface PotentialOption {
  stat: PotentialStatType
  unit: PotentialUnit
  value: number
  /** 그룹 제약 — 같은 그룹 옵션은 한 세트에 EXCLUSIVE_GROUP_LIMIT 만큼만. */
  exclusiveGroup?: ExclusiveGroupKey
}

/** 잠재능력 1줄 = (등급, 옵션). NORMAL 등급일 때 옵션은 null (빈 줄). */
export interface PotentialLine {
  grade: ItemGrade
  option: PotentialOption | null
}

/** 아이템에 부여된 잠재능력 전체 상태. */
export interface PotentialState {
  /** 아이템의 잠재 등급 = 1번째 줄의 등급. UI 의 보더 색깔도 이걸로 결정. */
  itemGrade: ItemGrade
  /** 1~3줄. 줄 수는 아이템에 따라 다름. */
  lines: PotentialLine[]
}

/** 잠재능력 슬롯 수 (대부분 2 또는 3). */
export type PotentialSlotCount = 1 | 2 | 3

/**
 * 옵션 풀 키 — 부위 카테고리를 옵션 풀 그룹으로 매핑할 때 사용.
 * 도메인 문서 5.8.1 참조.
 */
export type PotentialPoolKey =
  | 'weapon'
  | 'hat'
  | 'armor_body'
  | 'gloves'
  | 'shoes'
  | 'cape'
  | 'shield'
  | 'accessory'

/** ItemCategory → PotentialPoolKey 매핑. */
export function poolKeyFromCategory(category: ItemCategory): PotentialPoolKey {
  switch (category) {
    case 'ONE_HANDED_SWORD':
    case 'TWO_HANDED_SWORD':
    case 'ONE_HANDED_AXE':
    case 'TWO_HANDED_AXE':
    case 'ONE_HANDED_BLUNT':
    case 'TWO_HANDED_BLUNT':
    case 'SPEAR':
    case 'POLEARM':
    case 'BOW':
    case 'CROSSBOW':
    case 'WAND':
    case 'STAFF':
    case 'DAGGER':
    case 'CLAW':
      return 'weapon'
    case 'HAT':
      return 'hat'
    case 'OVERALL':
    case 'TOP':
    case 'BOTTOM':
      return 'armor_body'
    case 'GLOVES':
      return 'gloves'
    case 'SHOES':
      return 'shoes'
    case 'CAPE':
      return 'cape'
    case 'SHIELD':
      return 'shield'
    case 'EARRING':
    case 'PENDANT':
      return 'accessory'
  }
}
