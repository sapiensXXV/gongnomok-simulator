import { useCallback, useReducer } from 'react'
import type { ScrollPercent } from '../components/Item/simulator/controller/components/Scroll'

interface ScrollPriceEntry {
  price: number
  buyCount: number
  successCount: number
}

interface State {
  itemPrice: number
  itemBuyCount: number
  scrolls: Record<ScrollPercent, ScrollPriceEntry>
}

type Action =
  | { type: 'set-item-price'; price: number }
  | { type: 'set-scroll-price'; percent: ScrollPercent; price: number }
  | { type: 'record-buy'; percent: ScrollPercent }
  | { type: 'record-success'; percent: ScrollPercent }
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
    case 'inc-item-buy':
      return { ...state, itemBuyCount: state.itemBuyCount + 1 }
    case 'dec-item-buy':
      return { ...state, itemBuyCount: state.itemBuyCount - 1 }
    case 'reset-all':
      return INITIAL
  }
}

/** 가격·구매·성공 카운터 9개 + 합계 계산을 한 곳에서 관리. */
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
  const incItemBuy = useCallback(() => dispatch({ type: 'inc-item-buy' }), [])
  const decItemBuy = useCallback(() => dispatch({ type: 'dec-item-buy' }), [])
  const resetAll = useCallback(() => dispatch({ type: 'reset-all' }), [])

  const total =
    state.itemPrice * state.itemBuyCount +
    state.scrolls[10].price * state.scrolls[10].buyCount +
    state.scrolls[60].price * state.scrolls[60].buyCount +
    state.scrolls[100].price * state.scrolls[100].buyCount

  return {
    state,
    total,
    setItemPrice,
    setScrollPrice,
    recordBuy,
    recordSuccess,
    incItemBuy,
    decItemBuy,
    resetAll,
  }
}
