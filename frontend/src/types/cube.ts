import type { ItemGrade } from './item'
import type { PotentialState } from './potential'

/**
 * 큐브 도메인 타입.
 *
 * 메이플 플래닛 사양:
 * - 수상한 큐브 / 미라클 큐브 둘 다 등급 상승률 동일 (레어→에픽 6%, 에픽→유니크 1.8%)
 * - 두 큐브의 차이는 가격/획득 경로 등 게임 외 요소 (시뮬레이션 동작은 동일)
 */

export type CubeKind = 'STRANGE' | 'MIRACLE'

/** 큐브 1회 사용 결과. */
export interface CubeRollResult {
  /** 큐브 사용 전 상태 (롤백/히스토리용). */
  before: PotentialState
  /** 사용 후 새 상태. */
  after: PotentialState
  /** 등급 상승이 발생했는지 (UI 강조 효과용). */
  gradeUpgraded: boolean
  /** 어느 등급에서 어느 등급으로 상승했는지 (gradeUpgraded == true 일 때만 의미 있음). */
  fromGrade: ItemGrade
  toGrade: ItemGrade
}

/** 큐브 사용 카운터 — 기록 등록 시 백엔드에 보냄. */
export interface CubeUsageCount {
  strange: number
  miracle: number
}
