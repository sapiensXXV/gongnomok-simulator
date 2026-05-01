import type { ItemGrade } from '../types/item'
import { nextGrade } from '../types/item'
import type {
  PotentialLine,
  PotentialPoolKey,
  PotentialSlotCount,
  PotentialState,
} from '../types/potential'
import type { CubeRollResult } from '../types/cube'
import {
  GRADE_UPGRADE_RATE,
  LINE_GRADE_DISTRIBUTION,
  rollLineGrade,
} from './cubeProbabilities'
import { POTENTIAL_POOL } from './potentialPool'

/**
 * 큐브 1회 사용.
 *
 * 동작 (도메인 5):
 *  1. 잠재능력이 NORMAL 이면 → 첫 부여로 RARE 등급 + 줄 수만큼 RARE 옵션 부여.
 *  2. 잠재능력이 있으면 → 등급 상승 시도(GRADE_UPGRADE_RATE):
 *     - 상승: nextGrade 로 등급 증가
 *     - 미상승: 현재 등급 유지
 *     이후 newGrade 기준 LINE_GRADE_DISTRIBUTION 으로 줄별 등급 추첨,
 *     각 줄은 해당 등급의 옵션 풀에서 균등 무작위 옵션 1개 선택.
 *
 * 메이플 플래닛: 수상한 큐브 / 미라클 큐브 둘 다 동일한 등급 상승률을 사용.
 * 차이는 가격 (게임 외 요소).
 */
export function rollCube(
  state: PotentialState,
  poolKey: PotentialPoolKey,
  slotCount: PotentialSlotCount = 3,
): CubeRollResult {
  // 첫 큐브 사용 — RARE 부여
  if (state.itemGrade === 'NORMAL') {
    const newState = createInitialPotential('RARE', poolKey, slotCount)
    return {
      before: state,
      after: newState,
      gradeUpgraded: true,
      fromGrade: 'NORMAL',
      toGrade: 'RARE',
    }
  }

  // 등급 상승 시도
  const upgradeRate = GRADE_UPGRADE_RATE[state.itemGrade] ?? 0
  const upgraded = Math.random() < upgradeRate
  const newGrade = upgraded ? nextGrade(state.itemGrade) : state.itemGrade

  // newGrade 기준으로 줄별 등급 분포에 따라 reroll
  const lines: PotentialLine[] = []
  const distribution = LINE_GRADE_DISTRIBUTION[newGrade as Exclude<ItemGrade, 'NORMAL'>]
  for (let i = 0; i < state.lines.length; i++) {
    const lineGrade = rollLineGrade(distribution[i])
    lines.push(createLine(lineGrade, poolKey))
  }

  return {
    before: state,
    after: { itemGrade: newGrade, lines },
    gradeUpgraded: upgraded,
    fromGrade: state.itemGrade,
    toGrade: newGrade,
  }
}

/** 등급에 맞는 옵션 풀에서 균등 무작위 옵션 선택. NORMAL 이면 빈 줄. */
function createLine(grade: ItemGrade, poolKey: PotentialPoolKey): PotentialLine {
  if (grade === 'NORMAL') return { grade, option: null }
  const pool = POTENTIAL_POOL[poolKey][grade]
  const idx = Math.floor(Math.random() * pool.length)
  return { grade, option: pool[idx] }
}

/** 첫 큐브 사용 — 새 잠재능력 부여. */
function createInitialPotential(
  itemGrade: Exclude<ItemGrade, 'NORMAL'>,
  poolKey: PotentialPoolKey,
  slotCount: PotentialSlotCount,
): PotentialState {
  const distribution = LINE_GRADE_DISTRIBUTION[itemGrade]
  const lines: PotentialLine[] = []
  for (let i = 0; i < slotCount; i++) {
    const lineGrade = rollLineGrade(distribution[i])
    lines.push(createLine(lineGrade, poolKey))
  }
  return { itemGrade, lines }
}
