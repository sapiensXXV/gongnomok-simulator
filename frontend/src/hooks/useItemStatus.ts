import { useReducer, useCallback } from 'react'
import type { ItemDetail, StatusKey } from '../types/item'
import type { ScrollUpgradeEffect } from '../types/scroll'

const STATUS_KEYS: StatusKey[] = [
  'str', 'dex', 'intel', 'luk',
  'phyAtk', 'mgAtk', 'phyDef', 'mgDef',
  'acc', 'avo', 'move', 'jump',
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
  /** 적용된 강화 횟수 (성공 + 실패 = 시도 횟수가 아니라 *성공* 횟수). */
  upgradedCount: number
  /** 넉백 확률 (정보 표시용, 강화 영향 없음). */
  knockBackPercent: number
}

type Action =
  | { type: 'init'; detail: ItemDetail }
  | { type: 'apply-upgrade'; effects: ScrollUpgradeEffect[] }
  | { type: 'set-base'; key: StatusKey; value: number }
  | { type: 'reset' }

const INITIAL: State = {
  current: { ...ZERO_STATUS },
  base: { ...ZERO_STATUS },
  upgradable: 0,
  baseUpgradable: 0,
  upgradedCount: 0,
  knockBackPercent: 0,
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

    case 'set-base': {
      // 옵션 선택은 base 만 바꾸고, 호출 측에서 reset() 까지 보통 함께 호출함.
      return {
        ...state,
        base: { ...state.base, [action.key]: action.value },
      }
    }

    case 'reset':
      return {
        ...state,
        current: { ...state.base },
        upgradable: state.baseUpgradable,
        upgradedCount: 0,
      }
  }
}

/**
 * 시뮬레이터의 능력치(현재값/정옵/upgradable/upgradedCount) 묶음 reducer hook.
 *
 * 기존에 16개의 useState + 15개의 useRef 로 흩어져 있던 상태를 하나로 통합.
 */
export function useItemStatus() {
  const [state, dispatch] = useReducer(reducer, INITIAL)

  const init = useCallback((detail: ItemDetail) => dispatch({ type: 'init', detail }), [])

  const applyUpgrade = useCallback(
    (effects: ScrollUpgradeEffect[]) => dispatch({ type: 'apply-upgrade', effects }),
    [],
  )

  const setBase = useCallback(
    (key: StatusKey, value: number) => dispatch({ type: 'set-base', key, value }),
    [],
  )

  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  return { state, init, applyUpgrade, setBase, reset }
}

export type { State as ItemStatusState }
export { STATUS_KEYS }
