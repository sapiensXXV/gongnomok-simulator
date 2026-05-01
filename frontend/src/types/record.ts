import type { SuccessScrollCount } from './scroll'

/**
 * 기록(record) 도메인 타입 정의.
 *
 * 기록은 사용자가 시뮬레이터에서 만든 강화 결과를 서버에 등록한 것입니다.
 */

/** 강화 후 능력치 증분. (status 의 각 값은 default 대비 증가량) */
export interface RecordStatusDelta {
  str: number
  dex: number
  intel: number
  luk: number
  phyAtk: number
  mgAtk: number
  phyDef: number
  mgDef: number
  acc: number
  avo: number
  move: number
  jump: number
  hp: number
  mp: number
}

/** POST /api/item/{id}/enhanced 요청 바디. (기록 도전) */
export interface ChallengeRecordPayload {
  name: string
  upgradable: number
  iev: number
  scroll: string
  success: SuccessScrollCount
  status: RecordStatusDelta
  tries: number
}

/** POST /api/item/{id}/enhanced 응답. */
export interface ChallengeRecordResponse {
  status: 'SUCCESS' | 'FAILURE'
}

/** GET /api/item/ranking/record 등 기록 랭킹 항목. */
export interface RecordRankingItem {
  rank: number
  name: string
  itemId: number
  itemName: string
  scrollSuccess: SuccessScrollCount
}
