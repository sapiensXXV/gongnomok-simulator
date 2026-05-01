import { useEffect, useRef, useState, type RefObject } from 'react'
import { ASSETS_URL } from '../../../../../global/uri'
import { ATTACK_SPEED, CATEGORY_NAME } from '../../../../../global/item'
import {
  formatGradeLabel,
  formatPotentialOption,
  GRADE_COLOR_CLASS,
} from '../../../../../global/potentialDisplay'
import RequiredStatus from './RequiredStatus'
import { STATUS_KEYS } from '../../../../../hooks/useItemStatus'
import type { ItemDetail, ItemGrade, StatusKey } from '../../../../../types/item'
import type { PotentialState } from '../../../../../types/potential'

type FlashDir = 'up' | 'down'

interface Props {
  itemId: string | undefined
  info: ItemDetail | null
  current: Record<StatusKey, number>
  upgradable: number
  upgradedCount: number
  knockBackPercent: number
  nameColor: string
  scrollAnimationRef: RefObject<HTMLImageElement | null>
  transparentSrc: string

  /** 잠재능력 상태. null 이면 잠재 미부여 (NORMAL). */
  potential: PotentialState | null
  /**
   * 리셋/옵션변경 등 사용자 의도가 아닌 능력치 변동 시 flash 를 막기 위한 시그널.
   * 이 값이 변경되면 다음 current 변경은 flash 없이 prev 만 동기화.
   */
  resetSignal?: number
  /** 보라 박스(.item-info-section) DOM ref — 이미지 캡쳐 대상. */
  captureRef?: RefObject<HTMLElement | null>
  /** 복구 가능 횟수 — 능력치 영역 마지막 줄에 노출. */
  recoverableSlots?: number
}

/** 시뮬레이터 좌측 보라색 아이템 정보 카드. (디자인 보존 영역 + 잠재 추가) */
export default function ItemInfoCard({
  itemId,
  info,
  current,
  upgradable,
  upgradedCount,
  knockBackPercent,
  nameColor,
  scrollAnimationRef,
  transparentSrc,
  potential,
  recoverableSlots = 0,
  resetSignal = 0,
  captureRef,
}: Props) {
  const itemGrade: ItemGrade = potential?.itemGrade ?? 'NORMAL'
  const sectionGradeClass = GRADE_COLOR_CLASS[itemGrade]
  const gradeLabel = formatGradeLabel(itemGrade)

  // 큐브 사용 시마다 잠재 줄을 새 element 로 mount → CSS animation 재생.
  const [revealKey, setRevealKey] = useState(0)
  useEffect(() => {
    setRevealKey((k) => k + 1)
  }, [potential])

  // 등급 변화 감지 (NORMAL→RARE→EPIC→UNIQUE) → 박스 외곽 등급 색 flash
  const prevGradeRef = useRef(itemGrade)
  const [isGradeFlashing, setIsGradeFlashing] = useState(false)
  useEffect(() => {
    if (prevGradeRef.current !== itemGrade && itemGrade !== 'NORMAL') {
      setIsGradeFlashing(true)
      const t = setTimeout(() => setIsGradeFlashing(false), 700)
      prevGradeRef.current = itemGrade
      return () => clearTimeout(t)
    }
    prevGradeRef.current = itemGrade
  }, [itemGrade])

  /*
   * 능력치 변화 감지 — 변경된 줄에만 flash highlight.
   * 일반 주문서 / 혼돈의 주문서는 current 가 바뀌므로 트리거됨.
   * 큐브는 current 를 건드리지 않으므로 자연스럽게 트리거 안 됨 (잠재만 변경).
   * 리셋·옵션변경(resetSignal 변경)은 다음 current 변경 1회를 flash 없이 skip.
   */
  const prevCurrentRef = useRef(current)
  // 첫 진입(데이터 fetch 직후 init) 시 0 → 정옵 변화로 flash 가 트리거되는 것을 방지.
  const skipFlashRef = useRef(true)
  const [flash, setFlash] = useState<Partial<Record<StatusKey, FlashDir>>>({})

  // resetSignal 변경 → 다음 current 변경에서 flash 스킵
  useEffect(() => {
    skipFlashRef.current = true
  }, [resetSignal])

  useEffect(() => {
    if (skipFlashRef.current) {
      skipFlashRef.current = false
      prevCurrentRef.current = current
      return
    }
    const prev = prevCurrentRef.current
    const next: Partial<Record<StatusKey, FlashDir>> = {}
    for (const key of STATUS_KEYS) {
      if (current[key] > prev[key]) next[key] = 'up'
      else if (current[key] < prev[key]) next[key] = 'down'
    }
    prevCurrentRef.current = current
    if (Object.keys(next).length === 0) return
    setFlash(next)
    const timer = setTimeout(() => setFlash({}), 500)
    return () => clearTimeout(timer)
  }, [current])

  const flashClass = (key: StatusKey): string =>
    flash[key] === 'up' ? 'stat-flash-up' : flash[key] === 'down' ? 'stat-flash-down' : ''

  // 데이터 fetch 중 — 스켈레톤 표시
  if (!info) return <ItemInfoCardSkeleton />


  return (
    <section className="item-info-section-container">
      <section
        ref={captureRef}
        className={`item-info-section mx-1 ${sectionGradeClass} ${
          isGradeFlashing ? 'flash-grade-up' : ''
        }`}
      >
        <span className={`item-info-name ${nameColor}`}>
          {info?.name}
          {upgradedCount > 0 && `(+${upgradedCount})`}
        </span>
        {gradeLabel && (
          <span className={`item-grade-label ${sectionGradeClass}`}>{gradeLabel}</span>
        )}

        <div className="item-info-basic">
          <div className="item-img-container">
            <img className="item-img" src={`${ASSETS_URL}/images/item/${itemId}.png`} />
            <img
              ref={scrollAnimationRef}
              src={transparentSrc}
              className="scroll-animation"
              id="scroll-animation"
            />
          </div>
          <div className="item-info-required">
            <RequiredStatus name="LEV" value={info?.requiredStatus.level} />
            <RequiredStatus name="STR" value={info?.requiredStatus.str} />
            <RequiredStatus name="DEX" value={info?.requiredStatus.dex} />
            <RequiredStatus name="INT" value={info?.requiredStatus.intel} />
            <RequiredStatus name="LUK" value={info?.requiredStatus.luk} />
            <RequiredStatus name="POP" value={info?.requiredStatus.pop} />
            <span className="item-useless-info">ITEM LEV : -</span>
            <span className="item-useless-info">ITEM EXP : -</span>
          </div>
        </div>

        <div className="item-info-job">
          <span className={info?.availableJob.common ? '' : 'red'}>초보자</span>
          <span className={info?.availableJob.warrior || info?.availableJob.common ? '' : 'red'}>전사</span>
          <span className={info?.availableJob.magician || info?.availableJob.common ? '' : 'red'}>마법사</span>
          <span className={info?.availableJob.bowman || info?.availableJob.common ? '' : 'red'}>궁수</span>
          <span className={info?.availableJob.thief || info?.availableJob.common ? '' : 'red'}>도적</span>
          <span className={info?.availableJob.common ? '' : 'red'}>해적</span>
        </div>

        <hr />

        <div className="item-info-status">
          <span>장비분류 : {info && CATEGORY_NAME.get(info.category)}</span>
          {info?.attackSpeed && info.attackSpeed !== 'NONE' && (
            <span>공격속도 : {ATTACK_SPEED.get(info.attackSpeed)}</span>
          )}
          {current.str > 0 && <span className={flashClass('str')}>STR : +{current.str}</span>}
          {current.dex > 0 && <span className={flashClass('dex')}>DEX : +{current.dex}</span>}
          {current.intel > 0 && <span className={flashClass('intel')}>INT : +{current.intel}</span>}
          {current.luk > 0 && <span className={flashClass('luk')}>LUK : +{current.luk}</span>}
          {current.acc > 0 && <span className={flashClass('acc')}>명중률 : +{current.acc}</span>}
          {current.avo > 0 && <span className={flashClass('avo')}>회피율 : +{current.avo}</span>}
          {current.phyAtk > 0 && <span className={flashClass('phyAtk')}>공격력 : +{current.phyAtk}</span>}
          {current.mgAtk > 0 && <span className={flashClass('mgAtk')}>마력 : +{current.mgAtk}</span>}
          {current.phyDef > 0 && <span className={flashClass('phyDef')}>물리방어력 : +{current.phyDef}</span>}
          {current.mgDef > 0 && <span className={flashClass('mgDef')}>마법방어력 : +{current.mgDef}</span>}
          {current.hp > 0 && <span className={flashClass('hp')}>HP : +{current.hp}</span>}
          {current.mp > 0 && <span className={flashClass('mp')}>MP : +{current.mp}</span>}
          {current.move > 0 && <span className={flashClass('move')}>이동속도 : +{current.move}</span>}
          {current.jump > 0 && <span className={flashClass('jump')}>점프력 : +{current.jump}</span>}
          {knockBackPercent > 0 && (
            <span>직접 타격시 넉백 확률 : +{knockBackPercent}%</span>
          )}
          <span>업그레이드 가능 횟수 : {upgradable}</span>
          {recoverableSlots > 0 && (
            <span>복구 가능 횟수 : {recoverableSlots}</span>
          )}
        </div>

        {/* 잠재능력 — 능력치 영역과 같은 스타일의 hr 구분선 + 옵션 줄 (큐브 사용 시 fade-in) */}
        {potential && potential.lines.length > 0 && (
          <>
            <hr />
            <div className="item-potential-section">
              {potential.lines.map((line, idx) => (
                <span
                  // 매 큐브 사용마다 새 key 로 re-mount → CSS animation 재생
                  key={`${revealKey}-${idx}`}
                  className={`item-potential-line potential-fade-in ${GRADE_COLOR_CLASS[line.grade] || 'grade-normal'}`}
                >
                  {formatPotentialOption(line.option)}
                </span>
              ))}
            </div>
          </>
        )}
      </section>
    </section>
  )
}

/**
 * 데이터 fetch 대기 중 placeholder.
 * 보라 박스 외형은 그대로 유지하고 안의 텍스트만 shimmer 줄로 대체.
 */
function ItemInfoCardSkeleton() {
  return (
    <section className="item-info-section-container">
      <section className="item-info-section mx-1">
        {/* 아이템 이름 자리 */}
        <span className="skeleton-line" style={{ width: '60%', height: 22, margin: '6px auto' }} />

        <div className="item-info-basic">
          <div className="item-img-container">
            <span className="skeleton-block" style={{ width: 70, height: 70 }} />
          </div>
          <div className="item-info-required" style={{ flex: 1, gap: 6, display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="skeleton-line" style={{ width: '85%', height: 14 }} />
            ))}
          </div>
        </div>

        {/* 직업 줄 */}
        <span className="skeleton-line" style={{ width: '90%', height: 16, margin: '8px auto' }} />

        <hr />

        {/* 능력치 줄들 */}
        <div className="item-info-status" style={{ gap: 6 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="skeleton-line" style={{ width: '55%', height: 14 }} />
          ))}
        </div>
      </section>
    </section>
  )
}
