import type { ItemGrade } from '../types/item'
import type {
  PotentialOption,
  PotentialPoolKey,
} from '../types/potential'

/**
 * 잠재능력 옵션 풀 시드 데이터.
 *
 * 메이플 플래닛 사양 (등급 상한 = UNIQUE) + 본가 메이플 빅뱅 직전~중기 옵션 풀을 기준.
 * 핵심 패턴:
 *   - RARE  : flat 옵션 위주 (+3 / +60 / +1%)
 *   - EPIC  : flat +6, 주스탯 % +3, +6
 *   - UNIQUE: flat +9, 주스탯 % +6, +9 (+9 가 최상위), 보스데미지·크뎀·방무 등 특수 옵션
 *
 * 균등 무작위 추첨이라 실제 게임의 가중치와 1:1 일치는 아니지만 *분포의 결*은 맞춥니다.
 * 본가에선 등급별로 옵션 풀에 가중치가 있어 1번째 줄에 최상위(+9%)가, 2번째 줄에 한 단계
 * 낮은(+6%)이 더 자주 등장하지만, 본 시뮬은 단순화 — 동일 등급 내에선 균등 추첨.
 */

type GradePool = Record<Exclude<ItemGrade, 'NORMAL'>, PotentialOption[]>

const WEAPON_POOL: GradePool = {
  RARE: [
    { stat: 'phyAtk', unit: 'percent', value: 1 },
    { stat: 'mgAtk', unit: 'percent', value: 1 },
    { stat: 'phyAtk', unit: 'flat', value: 1 },
    { stat: 'mgAtk', unit: 'flat', value: 1 },
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'intel', unit: 'flat', value: 3 },
    { stat: 'luk', unit: 'flat', value: 3 },
    { stat: 'all_stat', unit: 'flat', value: 1 },
  ],
  EPIC: [
    { stat: 'phyAtk', unit: 'percent', value: 3 },
    { stat: 'phyAtk', unit: 'percent', value: 6 },
    { stat: 'mgAtk', unit: 'percent', value: 3 },
    { stat: 'mgAtk', unit: 'percent', value: 6 },
    { stat: 'phyAtk', unit: 'flat', value: 2 },
    { stat: 'mgAtk', unit: 'flat', value: 2 },
    { stat: 'str', unit: 'flat', value: 6 },
    { stat: 'dex', unit: 'flat', value: 6 },
    { stat: 'intel', unit: 'flat', value: 6 },
    { stat: 'luk', unit: 'flat', value: 6 },
    { stat: 'all_stat', unit: 'flat', value: 2 },
    { stat: 'boss_damage', unit: 'percent', value: 5 },
  ],
  UNIQUE: [
    { stat: 'phyAtk', unit: 'percent', value: 6 },
    { stat: 'phyAtk', unit: 'percent', value: 9 },
    { stat: 'mgAtk', unit: 'percent', value: 6 },
    { stat: 'mgAtk', unit: 'percent', value: 9 },
    { stat: 'phyAtk', unit: 'flat', value: 3 },
    { stat: 'mgAtk', unit: 'flat', value: 3 },
    { stat: 'str', unit: 'flat', value: 9 },
    { stat: 'dex', unit: 'flat', value: 9 },
    { stat: 'intel', unit: 'flat', value: 9 },
    { stat: 'luk', unit: 'flat', value: 9 },
    { stat: 'all_stat', unit: 'flat', value: 3 },
    { stat: 'boss_damage', unit: 'percent', value: 10 },
    { stat: 'boss_damage', unit: 'percent', value: 15 },
    { stat: 'monster_def_ignore', unit: 'percent', value: 10 },
    { stat: 'monster_def_ignore', unit: 'percent', value: 15 },
  ],
}

const HAT_POOL: GradePool = {
  RARE: [
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'intel', unit: 'flat', value: 3 },
    { stat: 'luk', unit: 'flat', value: 3 },
    { stat: 'str', unit: 'percent', value: 1 },
    { stat: 'dex', unit: 'percent', value: 1 },
    { stat: 'intel', unit: 'percent', value: 1 },
    { stat: 'luk', unit: 'percent', value: 1 },
    { stat: 'hp', unit: 'flat', value: 60 },
    { stat: 'mp', unit: 'flat', value: 60 },
    { stat: 'all_stat', unit: 'flat', value: 1 },
  ],
  EPIC: [
    { stat: 'str', unit: 'flat', value: 6 },
    { stat: 'dex', unit: 'flat', value: 6 },
    { stat: 'intel', unit: 'flat', value: 6 },
    { stat: 'luk', unit: 'flat', value: 6 },
    { stat: 'str', unit: 'percent', value: 3 },
    { stat: 'str', unit: 'percent', value: 6 },
    { stat: 'dex', unit: 'percent', value: 3 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'intel', unit: 'percent', value: 3 },
    { stat: 'intel', unit: 'percent', value: 6 },
    { stat: 'luk', unit: 'percent', value: 3 },
    { stat: 'luk', unit: 'percent', value: 6 },
    { stat: 'all_stat', unit: 'percent', value: 3 },
    { stat: 'hp', unit: 'flat', value: 120 },
    { stat: 'mp', unit: 'flat', value: 120 },
    { stat: 'all_stat', unit: 'flat', value: 2 },
  ],
  UNIQUE: [
    { stat: 'str', unit: 'flat', value: 9 },
    { stat: 'dex', unit: 'flat', value: 9 },
    { stat: 'intel', unit: 'flat', value: 9 },
    { stat: 'luk', unit: 'flat', value: 9 },
    { stat: 'str', unit: 'percent', value: 6 },
    { stat: 'str', unit: 'percent', value: 9 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'dex', unit: 'percent', value: 9 },
    { stat: 'intel', unit: 'percent', value: 6 },
    { stat: 'intel', unit: 'percent', value: 9 },
    { stat: 'luk', unit: 'percent', value: 6 },
    { stat: 'luk', unit: 'percent', value: 9 },
    { stat: 'all_stat', unit: 'percent', value: 3 },
    { stat: 'all_stat', unit: 'percent', value: 6 },
    { stat: 'hp', unit: 'percent', value: 6 },
    { stat: 'hp', unit: 'percent', value: 9 },
    { stat: 'all_stat', unit: 'flat', value: 3 },
    { stat: 'cooldown_reduction', unit: 'seconds', value: 1 },
  ],
}

const ARMOR_BODY_POOL: GradePool = {
  RARE: [
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'intel', unit: 'flat', value: 3 },
    { stat: 'luk', unit: 'flat', value: 3 },
    { stat: 'hp', unit: 'flat', value: 60 },
    { stat: 'mp', unit: 'flat', value: 60 },
    { stat: 'all_stat', unit: 'flat', value: 1 },
  ],
  EPIC: [
    { stat: 'str', unit: 'flat', value: 6 },
    { stat: 'dex', unit: 'flat', value: 6 },
    { stat: 'intel', unit: 'flat', value: 6 },
    { stat: 'luk', unit: 'flat', value: 6 },
    { stat: 'str', unit: 'percent', value: 3 },
    { stat: 'str', unit: 'percent', value: 6 },
    { stat: 'dex', unit: 'percent', value: 3 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'intel', unit: 'percent', value: 3 },
    { stat: 'intel', unit: 'percent', value: 6 },
    { stat: 'luk', unit: 'percent', value: 3 },
    { stat: 'luk', unit: 'percent', value: 6 },
    { stat: 'all_stat', unit: 'percent', value: 3 },
    { stat: 'hp', unit: 'flat', value: 120 },
    { stat: 'all_stat', unit: 'flat', value: 2 },
  ],
  UNIQUE: [
    { stat: 'str', unit: 'flat', value: 9 },
    { stat: 'dex', unit: 'flat', value: 9 },
    { stat: 'intel', unit: 'flat', value: 9 },
    { stat: 'luk', unit: 'flat', value: 9 },
    { stat: 'str', unit: 'percent', value: 6 },
    { stat: 'str', unit: 'percent', value: 9 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'dex', unit: 'percent', value: 9 },
    { stat: 'intel', unit: 'percent', value: 6 },
    { stat: 'intel', unit: 'percent', value: 9 },
    { stat: 'luk', unit: 'percent', value: 6 },
    { stat: 'luk', unit: 'percent', value: 9 },
    { stat: 'all_stat', unit: 'percent', value: 6 },
    { stat: 'hp', unit: 'percent', value: 6 },
    { stat: 'hp', unit: 'percent', value: 9 },
    { stat: 'all_stat', unit: 'flat', value: 3 },
  ],
}

const GLOVES_POOL: GradePool = {
  RARE: [
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'phyAtk', unit: 'flat', value: 1 },
    { stat: 'mgAtk', unit: 'flat', value: 1 },
    { stat: 'crit_rate', unit: 'percent', value: 3 },
  ],
  EPIC: [
    { stat: 'str', unit: 'flat', value: 6 },
    { stat: 'phyAtk', unit: 'flat', value: 2 },
    { stat: 'mgAtk', unit: 'flat', value: 2 },
    { stat: 'crit_rate', unit: 'percent', value: 5 },
    { stat: 'crit_rate', unit: 'percent', value: 8 },
  ],
  UNIQUE: [
    { stat: 'phyAtk', unit: 'flat', value: 3 },
    { stat: 'mgAtk', unit: 'flat', value: 3 },
    { stat: 'crit_rate', unit: 'percent', value: 8 },
    { stat: 'crit_rate', unit: 'percent', value: 12 },
    { stat: 'crit_damage', unit: 'percent', value: 5 },
    { stat: 'crit_damage', unit: 'percent', value: 9 },
  ],
}

const SHOES_POOL: GradePool = {
  RARE: [
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'move', unit: 'flat', value: 3 },
    { stat: 'jump', unit: 'flat', value: 3 },
  ],
  EPIC: [
    { stat: 'dex', unit: 'flat', value: 6 },
    { stat: 'dex', unit: 'percent', value: 3 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'move', unit: 'flat', value: 6 },
    { stat: 'jump', unit: 'flat', value: 6 },
    { stat: 'all_stat', unit: 'flat', value: 2 },
  ],
  UNIQUE: [
    { stat: 'dex', unit: 'flat', value: 9 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'dex', unit: 'percent', value: 9 },
    { stat: 'move', unit: 'flat', value: 10 },
    { stat: 'jump', unit: 'flat', value: 10 },
    { stat: 'all_stat', unit: 'flat', value: 3 },
    { stat: 'all_stat', unit: 'percent', value: 6 },
  ],
}

const CAPE_POOL: GradePool = {
  RARE: [
    { stat: 'all_stat', unit: 'flat', value: 1 },
    { stat: 'hp', unit: 'flat', value: 60 },
    { stat: 'mp', unit: 'flat', value: 60 },
    { stat: 'phyDef', unit: 'flat', value: 60 },
  ],
  EPIC: [
    { stat: 'all_stat', unit: 'flat', value: 2 },
    { stat: 'all_stat', unit: 'percent', value: 3 },
    { stat: 'hp', unit: 'flat', value: 120 },
    { stat: 'phyDef', unit: 'flat', value: 120 },
    { stat: 'hp', unit: 'percent', value: 3 },
    { stat: 'hp', unit: 'percent', value: 6 },
  ],
  UNIQUE: [
    { stat: 'all_stat', unit: 'flat', value: 3 },
    { stat: 'all_stat', unit: 'percent', value: 6 },
    { stat: 'all_stat', unit: 'percent', value: 9 },
    { stat: 'hp', unit: 'percent', value: 6 },
    { stat: 'hp', unit: 'percent', value: 9 },
    { stat: 'phyDef', unit: 'percent', value: 6 },
    { stat: 'mgDef', unit: 'percent', value: 6 },
  ],
}

const SHIELD_POOL: GradePool = {
  RARE: [
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'phyDef', unit: 'flat', value: 60 },
    { stat: 'phyAtk', unit: 'flat', value: 1 },
  ],
  EPIC: [
    { stat: 'str', unit: 'flat', value: 6 },
    { stat: 'phyAtk', unit: 'flat', value: 2 },
    { stat: 'phyAtk', unit: 'percent', value: 3 },
    { stat: 'mgAtk', unit: 'percent', value: 3 },
    { stat: 'phyDef', unit: 'flat', value: 120 },
  ],
  UNIQUE: [
    { stat: 'str', unit: 'flat', value: 9 },
    { stat: 'phyAtk', unit: 'flat', value: 3 },
    { stat: 'phyAtk', unit: 'percent', value: 6 },
    { stat: 'phyAtk', unit: 'percent', value: 9 },
    { stat: 'mgAtk', unit: 'percent', value: 6 },
    { stat: 'mgAtk', unit: 'percent', value: 9 },
    { stat: 'phyDef', unit: 'percent', value: 6 },
  ],
}

const ACCESSORY_POOL: GradePool = {
  RARE: [
    { stat: 'str', unit: 'flat', value: 3 },
    { stat: 'dex', unit: 'flat', value: 3 },
    { stat: 'intel', unit: 'flat', value: 3 },
    { stat: 'luk', unit: 'flat', value: 3 },
    { stat: 'mp', unit: 'flat', value: 60 },
    { stat: 'mgAtk', unit: 'flat', value: 1 },
    { stat: 'all_stat', unit: 'flat', value: 1 },
  ],
  EPIC: [
    { stat: 'str', unit: 'flat', value: 6 },
    { stat: 'dex', unit: 'flat', value: 6 },
    { stat: 'intel', unit: 'flat', value: 6 },
    { stat: 'luk', unit: 'flat', value: 6 },
    { stat: 'str', unit: 'percent', value: 3 },
    { stat: 'dex', unit: 'percent', value: 3 },
    { stat: 'intel', unit: 'percent', value: 3 },
    { stat: 'luk', unit: 'percent', value: 3 },
    { stat: 'mgAtk', unit: 'flat', value: 2 },
    { stat: 'all_stat', unit: 'flat', value: 2 },
    { stat: 'all_stat', unit: 'percent', value: 3 },
  ],
  UNIQUE: [
    { stat: 'str', unit: 'flat', value: 9 },
    { stat: 'dex', unit: 'flat', value: 9 },
    { stat: 'intel', unit: 'flat', value: 9 },
    { stat: 'luk', unit: 'flat', value: 9 },
    { stat: 'str', unit: 'percent', value: 6 },
    { stat: 'str', unit: 'percent', value: 9 },
    { stat: 'dex', unit: 'percent', value: 6 },
    { stat: 'dex', unit: 'percent', value: 9 },
    { stat: 'intel', unit: 'percent', value: 6 },
    { stat: 'intel', unit: 'percent', value: 9 },
    { stat: 'luk', unit: 'percent', value: 6 },
    { stat: 'luk', unit: 'percent', value: 9 },
    { stat: 'mgAtk', unit: 'flat', value: 3 },
    { stat: 'all_stat', unit: 'flat', value: 3 },
    { stat: 'all_stat', unit: 'percent', value: 6 },
  ],
}

export const POTENTIAL_POOL: Record<PotentialPoolKey, GradePool> = {
  weapon: WEAPON_POOL,
  hat: HAT_POOL,
  armor_body: ARMOR_BODY_POOL,
  gloves: GLOVES_POOL,
  shoes: SHOES_POOL,
  cape: CAPE_POOL,
  shield: SHIELD_POOL,
  accessory: ACCESSORY_POOL,
}

export function pickRandomOption(
  poolKey: PotentialPoolKey,
  grade: Exclude<ItemGrade, 'NORMAL'>,
): PotentialOption {
  const candidates = POTENTIAL_POOL[poolKey][grade]
  const idx = Math.floor(Math.random() * candidates.length)
  return candidates[idx]
}
