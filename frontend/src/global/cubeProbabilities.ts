import type { ItemGrade } from '../types/item'

/**
 * 큐브 확률 상수.
 *
 * 메이플 플래닛 사양:
 * - 수상한 큐브 / 미라클 큐브 모두 동일한 등급 상승률
 * - 등급 상한 = UNIQUE (LEGENDARY 미도달)
 *
 * 출처: mapleplanet.co.kr/Cube + 디시 메이플 플래닛 마갤 정리본 11153/11748.
 * 도메인 문서 5.3, 5.5 참조.
 */

/** 등급 상승 확률 (0~1). */
export const GRADE_UPGRADE_RATE: Partial<Record<ItemGrade, number>> = {
  RARE: 0.06, // 레어 → 에픽 6%
  EPIC: 0.018, // 에픽 → 유니크 1.8%
  UNIQUE: 0, // 유니크 → 레전더리: 메이플 플래닛 미도달
  // NORMAL 은 큐브 사용 자체가 안 됨 (보통 게임에서)
}

/**
 * 줄별 옵션 등급 분포.
 *
 * 키: 아이템 등급 (= 1번째 줄 등급).
 * 값: 1번째/2번째/3번째 줄의 가능한 등급과 그 등장 확률.
 *
 * 도메인 문서 5.3 표 그대로.
 */

export interface LineGradeDistribution {
  /** 어느 등급이 어느 확률로 등장하는지. 합 = 1. */
  rolls: { grade: ItemGrade; rate: number }[]
}

type DistByItemGrade = Record<
  Exclude<ItemGrade, 'NORMAL'>,
  [LineGradeDistribution, LineGradeDistribution, LineGradeDistribution]
>

export const LINE_GRADE_DISTRIBUTION: DistByItemGrade = {
  RARE: [
    { rolls: [{ grade: 'RARE', rate: 1.0 }] },
    {
      rolls: [
        { grade: 'RARE', rate: 0.1 },
        { grade: 'NORMAL', rate: 0.9 },
      ],
    },
    {
      rolls: [
        { grade: 'RARE', rate: 0.01 },
        { grade: 'NORMAL', rate: 0.99 },
      ],
    },
  ],
  EPIC: [
    { rolls: [{ grade: 'EPIC', rate: 1.0 }] },
    {
      rolls: [
        { grade: 'EPIC', rate: 0.1 },
        { grade: 'RARE', rate: 0.9 },
      ],
    },
    {
      rolls: [
        { grade: 'EPIC', rate: 0.01 },
        { grade: 'RARE', rate: 0.99 },
      ],
    },
  ],
  UNIQUE: [
    { rolls: [{ grade: 'UNIQUE', rate: 1.0 }] },
    {
      rolls: [
        { grade: 'UNIQUE', rate: 0.1 },
        { grade: 'EPIC', rate: 0.9 },
      ],
    },
    {
      rolls: [
        { grade: 'UNIQUE', rate: 0.01 },
        { grade: 'EPIC', rate: 0.99 },
      ],
    },
  ],
}

/** 등급 분포에서 무작위 등급 추첨. */
export function rollLineGrade(dist: LineGradeDistribution): ItemGrade {
  const r = Math.random()
  let acc = 0
  for (const { grade, rate } of dist.rolls) {
    acc += rate
    if (r < acc) return grade
  }
  return dist.rolls[dist.rolls.length - 1].grade
}
