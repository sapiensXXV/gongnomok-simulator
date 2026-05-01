import type { ItemCategory } from '../../../types/item'

/** 메인 페이지 아이템 검색 조건. */
export interface SearchCondition {
  name: string
  jobs: {
    warrior: boolean
    bowman: boolean
    magician: boolean
    thief: boolean
  }
  minLevel: number
  category: ItemCategory | 'ALL'
}

export const INITIAL_SEARCH_CONDITION: SearchCondition = {
  name: '',
  jobs: {
    warrior: false,
    bowman: false,
    magician: false,
    thief: false,
  },
  minLevel: 0,
  category: 'ALL',
}
