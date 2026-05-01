import { useCallback, useReducer } from 'react'
import type { ScrollPercent } from '../components/Item/simulator/controller/components/Scroll'

export interface ScrollPriceEntry {
  price: number
  buyCount: number
  successCount: number
}

/** 신 주문서 키. */
export type ExtraScrollKind = 'chaos' | 'white'

/** 큐브 종류 키. */
export type CubeKindKey = 'strange' | 'miracle'

interface State {
  itemPrice: number
  itemBuyCount: number
  scrolls: Record<ScrollPercent, ScrollPriceEntry>
  /** 혼돈/순백 — 가격, 사용 횟수, 성공 횟수. */
  extras: Record<ExtraScrollKind, ScrollPriceEntry>
  /** 수상한/미라클 큐브 — 가격, 사용 횟수 (성공 개념 X, 등급 상승 횟수는 별도). */
  cubes: Record<CubeKindKey, ScrollPriceEntry>
}

type Action =
  | { type: 'set-item-price'; price: number }
  | { type: 'set-scroll-price'; percent: ScrollPercent; price: number }
  | { type: 'record-buy'; percent: ScrollPercent }
  | { type: 'record-success'; percent: ScrollPercent }
  | { type: 'set-extra-price'; kind: ExtraScrollKind; price: number }
  | { type: 'record-extra-buy'; kind: ExtraScrollKind }
  | { type: 'record-extra-success'; kind: ExtraScrollKind }
  | { type: 'set-cube-price'; kind: CubeKindKey; price: number }
  | { type: 'record-cube-buy'; kind: CubeKindKey }
  | { type: 'inc-item-buy' }
  | { type: 'dec-item-buy' }
  | { type: 'reset-all' }

const EMPTY_SCROLL: ScrollPriceEntry = { price: 0, buyCount: 0, successCount: 0 }

const INITIAL: State = {
  itemPrice: 0,
  itemBuyCount: 1,
  scrolls: {
    10: { ...EMPTY_SCROLL },
    60: { ...EMPTY_SCROLL },
    100: { ...EMPTY_SCROLL },
  },
  extras: {
    chaos: { ...EMPTY_SCROLL },
    white: { ...EMPTY_SCROLL },
  },
  cubes: {
    strange: { ...EMPTY_SCROLL },
    miracle: { ...EMPTY_SCROLL },
  },
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-item-price':
      return { ...state, itemPrice: action.price }
    case 'set-scroll-price': {
      const cur = state.scrolls[action.percent]
      return {
        ...state,
        scrolls: { ...state.scrolls, [action.percent]: { ...cur, price: action.price } },
      }
    }
    case 'record-buy': {
      const cur = state.scrolls[action.percent]
      return {
        ...state,
        scrolls: {
          ...state.scrolls,
          [action.percent]: { ...cur, buyCount: cur.buyCount + 1 },
        },
      }
    }
    case 'record-success': {
      const cur = state.scrolls[action.percent]
      return {
        ...state,
        scrolls: {
          ...state.scrolls,
          [action.percent]: { ...cur, successCount: cur.successCount + 1 },
        },
      }
    }
    case 'set-extra-price': {
      const cur = state.extras[action.kind]
      return {
        ...state,
        extras: { ...state.extras, [action.kind]: { ...cur, price: action.price } },
      }
    }
    case 'record-extra-buy': {
      const cur = state.extras[action.kind]
      return {
        ...state,
        extras: {
          ...state.extras,
          [action.kind]: { ...cur, buyCount: cur.buyCount + 1 },
        },
      }
    }
    case 'record-extra-success': {
      const cur = state.extras[action.kind]
      return {
        ...state,
        extras: {
          ...state.extras,
          [action.kind]: { ...cur, successCount: cur.successCount + 1 },
        },
      }
    }
    case 'set-cube-price': {
      const cur = state.cubes[action.kind]
      return {
        ...state,
        cubes: { ...state.cubes, [action.kind]: { ...cur, price: action.price } },
      }
    }
    case 'record-cube-buy': {
      const cur = state.cubes[action.kind]
      return {
        ...state,
        cubes: {
          ...state.cubes,
          [action.kind]: { ...cur, buyCount: cur.buyCount + 1 },
        },
      }
    }
    case 'inc-item-buy':
      return { ...state, itemBuyCount: state.itemBuyCount + 1 }
    case 'dec-item-buy':
      return { ...state, itemBuyCount: state.itemBuyCount - 1 }
    case 'reset-all':
      return INITIAL
  }
}

/** 가격·구매·성공 카운터 + 합계 계산. (10/60/100 + 혼돈/순백) */
export function usePurchaseRecord() {
  const [state, dispatch] = useReducer(reducer, INITIAL)

  const setItemPrice = useCallback(
    (price: number) => dispatch({ type: 'set-item-price', price }),
    [],
  )
  const setScrollPrice = useCallback(
    (percent: ScrollPercent, price: number) =>
      dispatch({ type: 'set-scroll-price', percent, price }),
    [],
  )
  const recordBuy = useCallback(
    (percent: ScrollPercent) => dispatch({ type: 'record-buy', percent }),
    [],
  )
  const recordSuccess = useCallback(
    (percent: ScrollPercent) => dispatch({ type: 'record-success', percent }),
    [],
  )
  const setExtraPrice = useCallback(
    (kind: ExtraScrollKind, price: number) =>
      dispatch({ type: 'set-extra-price', kind, price }),
    [],
  )
  const recordExtraBuy = useCallback(
    (kind: ExtraScrollKind) => dispatch({ type: 'record-extra-buy', kind }),
    [],
  )
  const recordExtraSuccess = useCallback(
    (kind: ExtraScrollKind) => dispatch({ type: 'record-extra-success', kind }),
    [],
  )
  const setCubePrice = useCallback(
    (kind: CubeKindKey, price: number) =>
      dispatch({ type: 'set-cube-price', kind, price }),
    [],
  )
  const recordCubeBuy = useCallback(
    (kind: CubeKindKey) => dispatch({ type: 'record-cube-buy', kind }),
    [],
  )
  const incItemBuy = useCallback(() => dispatch({ type: 'inc-item-buy' }), [])
  const decItemBuy = useCallback(() => dispatch({ type: 'dec-item-buy' }), [])
  const resetAll = useCallback(() => dispatch({ type: 'reset-all' }), [])

  const total =
    state.itemPrice * state.itemBuyCount +
    state.scrolls[10].price * state.scrolls[10].buyCount +
    state.scrolls[60].price * state.scrolls[60].buyCount +
    state.scrolls[100].price * state.scrolls[100].buyCount +
    state.extras.chaos.price * state.extras.chaos.buyCount +
    state.extras.white.price * state.extras.white.buyCount +
    state.cubes.strange.price * state.cubes.strange.buyCount +
    state.cubes.miracle.price * state.cubes.miracle.buyCount

  return {
    state,
    total,
    setItemPrice,
    setScrollPrice,
    recordBuy,
    recordSuccess,
    setExtraPrice,
    recordExtraBuy,
    recordExtraSuccess,
    setCubePrice,
    recordCubeBuy,
    incItemBuy,
    decItemBuy,
    resetAll,
  }
}
