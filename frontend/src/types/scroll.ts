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
