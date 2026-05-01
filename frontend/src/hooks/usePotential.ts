import { useCallback, useReducer } from 'react'
import { rollCube } from '../global/cubeRoll'
import type { CubeKind, CubeRollResult } from '../types/cube'
import type {
  PotentialPoolKey,
  PotentialSlotCount,
  PotentialState,
} from '../types/potential'

const INITIAL: PotentialState = {
  itemGrade: 'NORMAL',
  lines: [],
}

type Action = { type: 'set'; state: PotentialState } | { type: 'reset' }

function reducer(state: PotentialState, action: Action): PotentialState {
  switch (action.type) {
    case 'set':
      return action.state
    case 'reset':
      return INITIAL
  }
}

interface Args {
  /** 카테고리에 맞는 옵션 풀 키. (예: 'weapon', 'hat'). */
  poolKey: PotentialPoolKey | null
  /** 잠재 슬롯 수 (대부분 3). */
  slotCount?: PotentialSlotCount
}

/**
 * 잠재능력 상태 관리 + 큐브 적용.
 *
 * `applyCube(kind)` 호출 시 rollCube 결과를 state 에 반영하고,
 * `CubeRollResult` 를 반환해 UI 가 등급 상승 알림 등에 사용 가능.
 */
export function usePotential({ poolKey, slotCount = 3 }: Args) {
  const [state, dispatch] = useReducer(reducer, INITIAL)

  const applyCube = useCallback(
    (_kind: CubeKind): CubeRollResult | null => {
      if (!poolKey) return null
      const result = rollCube(state, poolKey, slotCount)
      dispatch({ type: 'set', state: result.after })
      return result
    },
    [poolKey, slotCount, state],
  )

  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  return { state, applyCube, reset }
}
