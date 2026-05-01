import type { ItemCategory, StatusKey } from './item'

/**
 * 주문서 도메인 타입 정의.
 *
 * 주문서는 클라이언트 상수입니다 (서버에서 받지 않음 — `src/global/scroll.js` 참조).
 */

/** 주문서 한 종류가 적용 시 올려주는 능력치 한 항목. */
export interface ScrollUpgradeEffect {
  name: StatusKey
  value: number
}

/** 주문서의 성공률 별 효과. _10 = 10% 주문서, _60 = 60%, _100 = 100%. */
export interface ScrollUpgradeValue {
  _10: ScrollUpgradeEffect[]
  _60: ScrollUpgradeEffect[]
  _100: ScrollUpgradeEffect[]
}

/** 주문서 1종 정의. SCROLL_INFO Map 의 value. */
export interface ScrollInfo {
  /** 백엔드 enum 과 일치하는 식별 키. ex) "ONE_HANDED_SWORD_PHY_ATK" */
  keyword: string
  /** 한국어 표시 이름. ex) "한손검 공격력 주문서" */
  name: string
  /** 짧은 별칭. ex) "공격력" */
  shortcut: string
  /** 주문서가 적용 가능한 아이템 카테고리. */
  category: ItemCategory
  upgradeValue: ScrollUpgradeValue
}

/** 주문서 성공 횟수 카운터 (시뮬레이터 화면 우측 상단 표시). */
export interface SuccessScrollCount {
  total: number
  ten: number
  sixty: number
  hundred: number
}

/* ============================================================
 * 메이플 플래닛 신 주문서 — 혼돈 / 순백
 * ============================================================ */

/**
 * 혼돈의 주문서.
 * 성공 시 모든 능력치를 -5 ~ +5 범위 무작위 변동 (각 능력치 독립).
 * 실패 시 능력치 변화 없음, 가능 횟수만 차감.
 *
 * 변형:
 * - 'BASIC' = 표준 (-5~+5)
 * - 'AMAZING' = 「놀라운」 (-6~+6)
 * - 'POSITIVE' = 「긍정의」 (0~+5)
 * - 'AMAZING_POSITIVE' = 「놀라운 긍정의」 (0~+6)
 */
export type ChaosScrollVariant = 'BASIC' | 'AMAZING' | 'POSITIVE' | 'AMAZING_POSITIVE'

export interface ChaosScrollSpec {
  variant: ChaosScrollVariant
  successRate: number // 보통 0.6 (60%)
  /** 변동 폭. ±range. POSITIVE 변형은 음수 절대 적용 안 함. */
  range: number
  /** 음수 변동 가능 여부 (POSITIVE 변형은 false). */
  allowNegative: boolean
}

/**
 * 순백의 주문서.
 * 성공 시 강화 가능 횟수 +1, 복구 가능 횟수 -1.
 * 실패 시 복구 가능 횟수 유지 (주문서만 소모).
 * 사용 가능 조건: 복구 가능 횟수 > 0.
 */
export type WhiteScrollVariant = 'PERCENT_1' | 'PERCENT_3' | 'PERCENT_5' | 'PERCENT_10' | 'PERCENT_100'

export interface WhiteScrollSpec {
  variant: WhiteScrollVariant
  successRate: number // 0.01 / 0.03 / 0.05 / 0.10 / 1.00
}

/** 강화에 사용된 신 주문서 카운터 — 기록 등록 시 페이로드. */
export interface NewScrollUsageCount {
  /** 혼돈의 주문서 사용 총횟수 (변형 합산). */
  chaos: number
  /** 순백의 주문서 사용 총횟수 (변형 합산). */
  white: number
}
