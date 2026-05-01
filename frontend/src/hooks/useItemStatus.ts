import { useReducer, useCallback } from 'react'
import type { ItemDetail, StatusKey } from '../types/item'
import type { ScrollUpgradeEffect } from '../types/scroll'

const STATUS_KEYS: StatusKey[] = [
  'str', 'dex', 'intel', 'luk',
  'phyAtk', 'mgAtk', 'phyDef', 'mgDef',
  'acc', 'avo', 'move', 'jump',
  'hp', 'mp',
]

/** 혼돈의 주문서 변동 대상 (도메인 5.6.1). 능력치 13개 (acc 제외). */
const CHAOS_TARGETS: StatusKey[] = [
  'str', 'dex', 'intel', 'luk',
  'phyAtk', 'mgAtk', 'phyDef', 'mgDef',
  'avo', 'move', 'jump',
  'hp', 'mp',
]

type StatusValues = Record<StatusKey, number>

const ZERO_STATUS: StatusValues = STATUS_KEYS.reduce(
  (acc, key) => ({ ...acc, [key]: 0 }),
  {} as StatusValues,
)

interface State {
  /** 현재 표시 중인 능력치 (강화 결과 포함). */
  current: StatusValues
  /** 정옵/옵션 선택값. 강화 리셋 시 current 가 이 값으로 복원됨. */
  base: StatusValues
  /** 남은 강화 가능 횟수. */
  upgradable: number
  /** 처음 받았던 upgradable 값 (리셋 시 복원). */
  baseUpgradable: number
  /** 적용된 강화 *성공* 횟수. */
  upgradedCount: number
  /** 넉백 확률 (정보 표시용, 강화 영향 없음). */
  knockBackPercent: number
  /**
   * 복구 가능 횟수 — 강화 실패가 누적될 때마다 +1, 순백 성공 시 -1.
   * 도메인 5.7.2 메커닉.
   */
  recoverableSlots: number
}

type Action =
  | { type: 'init'; detail: ItemDetail }
  | { type: 'apply-upgrade'; effects: ScrollUpgradeEffect[] }
  | { type: 'fail-upgrade' }
  | {
      type: 'apply-chaos'
      isSuccess: boolean
      /** 성공 시 각 능력치에 적용할 -range~+range 범위의 random delta. */
      deltas?: Partial<Record<StatusKey, number>>
    }
  | { type: 'recover-slot'; isSuccess: boolean }
  | { type: 'set-base'; key: StatusKey; value: number }
  | { type: 'reset' }

const INITIAL: State = {
  current: { ...ZERO_STATUS },
  base: { ...ZERO_STATUS },
  upgradable: 0,
  baseUpgradable: 0,
  upgradedCount: 0,
  knockBackPercent: 0,
  recoverableSlots: 0,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'init': {
      const next: StatusValues = { ...ZERO_STATUS }
      for (const key of STATUS_KEYS) next[key] = action.detail.status[key].normal
      return {
        current: { ...next },
        base: { ...next },
        upgradable: action.detail.upgradableCount,
        baseUpgradable: action.detail.upgradableCount,
        upgradedCount: 0,
        knockBackPercent: action.detail.knockBackPercent,
        recoverableSlots: 0,
      }
    }

    case 'apply-upgrade': {
      const next = { ...state.current }
      for (const effect of action.effects) next[effect.name] += effect.value
      return {
        ...state,
        current: next,
        upgradable: state.upgradable - 1,
        upgradedCount: state.upgradedCount + 1,
      }
    }

    case 'fail-upgrade':
      // 일반 주문서 실패 — 능력치 변화 없음, 가능 횟수 -1, 복구 가능 횟수 +1
      return {
        ...state,
        upgradable: state.upgradable - 1,
        recoverableSlots: state.recoverableSlots + 1,
      }

    case 'apply-chaos': {
      // 혼돈의 주문서 — 성공: 능력치 변동, 실패: 변화 없음. 양쪽 다 가능 횟수 -1.
      if (action.isSuccess && action.deltas) {
        const next = { ...state.current }
        for (const key of Object.keys(action.deltas) as StatusKey[]) {
          const delta = action.deltas[key] ?? 0
          next[key] = Math.max(0, next[key] + delta) // 음수로 떨어지지 않게 0 floor
        }
        return {
          ...state,
          current: next,
          upgradable: state.upgradable - 1,
          upgradedCount: state.upgradedCount + 1,
        }
      }
      // 실패 — 일반 주문서 실패와 동일하게 복구 가능 횟수 누적
      return {
        ...state,
        upgradable: state.upgradable - 1,
        recoverableSlots: state.recoverableSlots + 1,
      }
    }

    case 'recover-slot':
      // 순백의 주문서 — 성공: 가능 횟수 +1, 복구 가능 횟수 -1. 실패: 변화 없음.
      if (action.isSuccess) {
        return {
          ...state,
          upgradable: state.upgradable + 1,
          recoverableSlots: state.recoverableSlots - 1,
        }
      }
      return state

    case 'set-base':
      return {
        ...state,
        base: { ...state.base, [action.key]: action.value },
      }

    case 'reset':
      return {
        ...state,
        current: { ...state.base },
        upgradable: state.baseUpgradable,
        upgradedCount: 0,
        recoverableSlots: 0,
      }
  }
}

/**
 * 시뮬레이터 능력치 reducer hook.
 *
 * 기본 주문서(10/60/100), 혼돈의 주문서, 순백의 주문서, 옵션 선택, 리셋을 모두 지원.
 */
export function useItemStatus() {
  const [state, dispatch] = useReducer(reducer, INITIAL)

  const init = useCallback((detail: ItemDetail) => dispatch({ type: 'init', detail }), [])

  const applyUpgrade = useCallback(
    (effects: ScrollUpgradeEffect[]) => dispatch({ type: 'apply-upgrade', effects }),
    [],
  )

  const failUpgrade = useCallback(() => dispatch({ type: 'fail-upgrade' }), [])

  const applyChaos = useCallback(
    (isSuccess: boolean, deltas?: Partial<Record<StatusKey, number>>) =>
      dispatch({ type: 'apply-chaos', isSuccess, deltas }),
    [],
  )

  const recoverSlot = useCallback(
    (isSuccess: boolean) => dispatch({ type: 'recover-slot', isSuccess }),
    [],
  )

  const setBase = useCallback(
    (key: StatusKey, value: number) => dispatch({ type: 'set-base', key, value }),
    [],
  )

  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  return { state, init, applyUpgrade, failUpgrade, applyChaos, recoverSlot, setBase, reset }
}

export type { State as ItemStatusState }
export { STATUS_KEYS, CHAOS_TARGETS }
