import type { ItemGrade } from '../types/item'
import type { PotentialOption, PotentialStatType } from '../types/potential'

/**
 * 잠재능력 옵션을 게임 내 표기 형식의 한국어 문자열로 변환.
 *
 * 예시:
 *   { stat: 'all_stat', unit: 'percent', value: 6 }  → "올스탯 : +6%"
 *   { stat: 'phyAtk',   unit: 'flat',    value: 3 }  → "공격력 : +3"
 *   { stat: 'cooldown_reduction', unit: 'seconds', value: 1 } → "모든 스킬의 재사용 대기시간 : -1초"
 */

const STAT_LABEL: Record<PotentialStatType, string> = {
  str: 'STR',
  dex: 'DEX',
  intel: 'INT',
  luk: 'LUK',
  all_stat: '올스탯',
  phyAtk: '공격력',
  mgAtk: '마력',
  phyDef: '물리방어력',
  mgDef: '마법방어력',
  hp: 'HP',
  mp: 'MP',
  move: '이동속도',
  jump: '점프력',
  crit_rate: '크리티컬 확률',
  crit_damage: '크리티컬 데미지',
  boss_damage: '보스 데미지',
  monster_def_ignore: '몬스터 방어율 무시',
  cooldown_reduction: '모든 스킬의 재사용 대기시간',
}

export function formatPotentialOption(opt: PotentialOption | null): string {
  if (!opt) return '—'
  const label = STAT_LABEL[opt.stat]
  if (opt.unit === 'percent') return `${label} : +${opt.value}%`
  if (opt.unit === 'seconds') return `${label} : -${opt.value}초`
  return `${label} : +${opt.value}`
}

/**
 * 등급별 한국어 표기.
 * 예: itemGrade='UNIQUE' → "(유니크 아이템)"
 */
const GRADE_LABEL: Record<ItemGrade, string> = {
  NORMAL: '',
  RARE: '레어',
  EPIC: '에픽',
  UNIQUE: '유니크',
}

export function formatGradeLabel(grade: ItemGrade): string {
  if (grade === 'NORMAL') return ''
  return `(${GRADE_LABEL[grade]} 아이템)`
}

/** 등급별 색상 클래스 (CSS 변수와 매핑). */
export const GRADE_COLOR_CLASS: Record<ItemGrade, string> = {
  NORMAL: '',
  RARE: 'grade-rare',
  EPIC: 'grade-epic',
  UNIQUE: 'grade-unique',
}
