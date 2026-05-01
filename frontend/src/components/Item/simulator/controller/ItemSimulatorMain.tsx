import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { DEAFULT_SUCCESS_SCROLL } from '../../../../global/item'
import { SCROLL_INFO } from '../../../../global/scroll'
import {
  playDiceSound,
  playFailureSound,
  playPurchaseSound,
  playSuccessSound,
} from '../../../../global/util/soundPlay'

import {
  useItemDetail,
  useItemStatus,
  usePurchaseRecord,
  useScrollAnimation,
  useScrollHotkeys,
  useChallengeRecord,
  usePotential,
  STATUS_KEYS,
} from '../../../../hooks'
import { poolKeyFromCategory } from '../../../../types/potential'
import type { CubeKind } from '../../../../types/cube'
import type { CubeKindKey } from '../../../../hooks/usePurchaseRecord'

import ItemInfoCard from './components/ItemInfoCard'
import ScrollSelectorPanel from './components/ScrollSelectorPanel'
import PriceSection from './components/PriceSection'
import ChallengeScrollSuccessCount from './components/ChallengeScrollSuccessCount'
import type { ScrollPercent } from './components/Scroll'

import Comments from '../../comment/Comments'
import BestRecordItem from '../record/BestRecordItem'
import RecordChallengeModal from '../modal/RecordChallengeModal'
import RecordChallengeResultModal from '../modal/RecordChallengeResultModal'
import { RECORD_FEATURE_ENABLED } from '../../../../global/featureFlags'

import type { ScrollInfo, SuccessScrollCount } from '../../../../types/scroll'
import type { StatusKey } from '../../../../types/item'

/** 혼돈의 주문서 — 메이플 플래닛 사양: 60% 성공률 + ±5 균등 무작위 변동. */
const CHAOS_SUCCESS_RATE = 0.6
const CHAOS_RANGE = 5

/** 순백의 주문서 — 100% 사양 (기본). 다른 % 변형은 별도 도입 시 분기. */
const WHITE_SUCCESS_RATE = 1.0

/** 혼돈의 주문서 변동 대상 능력치 (도메인 5.6.1). */
const CHAOS_TARGET_KEYS: StatusKey[] = [
  'str', 'dex', 'intel', 'luk',
  'phyAtk', 'mgAtk', 'phyDef', 'mgDef',
  'avo', 'move', 'jump',
  'hp', 'mp',
]

/** -range ~ +range 범위 정수 무작위. */
function randomDelta(range: number): number {
  return Math.floor(Math.random() * (2 * range + 1)) - range
}

function rollScroll(percent: ScrollPercent): boolean {
  const threshold = percent / 10
  return Math.floor(Math.random() * 10 + 1) <= threshold
}

/*
 * IEV 산정 가중치.
 *
 * 메이플 본가/플래닛이 색을 결정할 때 사용하는 내부 점수와 *체감* 일치하도록 잡음.
 * 공격력/마력 기여도가 가장 높고, 보조 스탯(이동·점프·명중·회피)은 거의 영향 없음.
 * hp/mp 는 절대값 자체가 크니 1/10 로 축소 (이전 v/10 와 동일).
 *
 * 혼돈의 주문서로 인한 변동도 이 가중치로 평가됨 — 공격력·주스탯이 양수면 색이 빠르게 오름.
 */
const STAT_WEIGHTS: Record<StatusKey, number> = {
  phyAtk: 4,
  mgAtk: 4,
  str: 1,
  dex: 1,
  intel: 1,
  luk: 1,
  phyDef: 0.5,
  mgDef: 0.5,
  acc: 0.3,
  avo: 0.3,
  move: 0.3,
  jump: 0.3,
  hp: 0.1,
  mp: 0.1,
}

function weightedSum(values: Record<StatusKey, number>): number {
  return STATUS_KEYS.reduce((sum, key) => sum + values[key] * STAT_WEIGHTS[key], 0)
}

/*
 * 색상 컷라인 — 가중치 ×2.5 정도 확대됐으므로 컷라인도 비례 확대.
 * 0~5/6~22/23~39/40~56/57~73 → 0~12/13~50/51~95/96~140/141+
 */
function ievColor(iev: number, upgradedCount: number): string {
  if (iev <= 12) return upgradedCount === 0 ? 'white' : 'orange'
  if (iev <= 50) return 'blue'
  if (iev <= 95) return 'purple'
  if (iev <= 140) return 'yellow'
  return 'green'
}

export default function ItemSimulatorMain() {
  const { itemId } = useParams<{ itemId: string }>()

  // ---------- 데이터 + 상태 ----------
  const { info, infoCopy, availableScroll } = useItemDetail(itemId)
  const {
    state: status,
    init,
    applyUpgrade,
    failUpgrade,
    applyChaos,
    recoverSlot,
    setBase,
    reset,
  } = useItemStatus()
  const purchase = usePurchaseRecord()
  const { imgRef: scrollAnimationRef, playSuccess, playFailure, transparentSrc } =
    useScrollAnimation()
  const triesRef = useRef(1)

  // 잠재능력 — 카테고리에 맞는 옵션 풀 키.
  const poolKey = info ? poolKeyFromCategory(info.category) : null
  const {
    state: potential,
    applyCube,
    reset: resetPotential,
  } = usePotential({ poolKey })

  const [currentScroll, setCurrentScroll] = useState<ScrollInfo | null>(null)
  const [successScroll, setSuccessScroll] = useState<SuccessScrollCount>(DEAFULT_SUCCESS_SCROLL)
  const refreshSuccessScroll = () => setSuccessScroll(DEAFULT_SUCCESS_SCROLL)

  // 리셋·옵션변경 시 ItemInfoCard 의 능력치 flash 를 스킵하기 위한 카운터.
  const [resetSignal, setResetSignal] = useState(0)
  const bumpResetSignal = () => setResetSignal((s) => s + 1)

  useEffect(() => {
    if (info) {
      init(info)
      // 첫 진입 / 아이템 변경 시 0 → 정옵 변화로 인한 flash 를 스킵.
      bumpResetSignal()
    }
  }, [info, init])

  useEffect(() => {
    if (availableScroll.length > 0 && currentScroll == null) {
      setCurrentScroll(availableScroll[0])
    }
  }, [availableScroll, currentScroll])

  // ---------- 핸들러 ----------
  const onScrollChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = SCROLL_INFO.get(e.target.value)
    if (next) setCurrentScroll(next)
  }

  const applyScrollResult = useCallback(
    (percent: ScrollPercent, isSuccess: boolean) => {
      if (!isSuccess) {
        playFailureSound()
        playFailure()
        failUpgrade()
        return
      }
      playSuccessSound()
      playSuccess()
      setSuccessScroll((prev) => ({
        ...prev,
        total: prev.total + 1,
        ten: percent === 10 ? prev.ten + 1 : prev.ten,
        sixty: percent === 60 ? prev.sixty + 1 : prev.sixty,
        hundred: percent === 100 ? prev.hundred + 1 : prev.hundred,
      }))
      purchase.recordSuccess(percent)
      const effects =
        percent === 10
          ? currentScroll?.upgradeValue._10
          : percent === 60
          ? currentScroll?.upgradeValue._60
          : currentScroll?.upgradeValue._100
      if (effects) applyUpgrade(effects)
    },
    [applyUpgrade, failUpgrade, currentScroll, playFailure, playSuccess, purchase],
  )

  const onScrollClick = useCallback(
    (percent: ScrollPercent) => {
      if (status.upgradable <= 0) return
      applyScrollResult(percent, rollScroll(percent))
      purchase.recordBuy(percent)
    },
    [status.upgradable, applyScrollResult, purchase],
  )

  // ---------- 혼돈의 주문서 ----------
  const onChaosClick = useCallback(() => {
    if (status.upgradable <= 0) return
    purchase.recordExtraBuy('chaos')
    const isSuccess = Math.random() < CHAOS_SUCCESS_RATE
    if (!isSuccess) {
      playFailureSound()
      playFailure()
      applyChaos(false)
      return
    }
    playSuccessSound()
    playSuccess()
    purchase.recordExtraSuccess('chaos')
    // 능력치 13개 각각 독립적으로 -5~+5 무작위
    const deltas: Partial<Record<StatusKey, number>> = {}
    for (const key of CHAOS_TARGET_KEYS) deltas[key] = randomDelta(CHAOS_RANGE)
    applyChaos(true, deltas)
  }, [status.upgradable, applyChaos, playFailure, playSuccess, purchase])

  // ---------- 순백의 주문서 ----------
  const onWhiteClick = useCallback(() => {
    if (status.recoverableSlots <= 0) return
    purchase.recordExtraBuy('white')
    const isSuccess = Math.random() < WHITE_SUCCESS_RATE
    if (!isSuccess) {
      playFailureSound()
      playFailure()
      recoverSlot(false)
      return
    }
    playSuccessSound()
    playSuccess()
    purchase.recordExtraSuccess('white')
    recoverSlot(true)
  }, [status.recoverableSlots, recoverSlot, playFailure, playSuccess, purchase])

  // ---------- 큐브 (수상한 / 미라클) ----------
  const onCubeClick = useCallback(
    (kind: CubeKind, recordKey: CubeKindKey) => {
      if (!poolKey) return
      purchase.recordCubeBuy(recordKey)
      const result = applyCube(kind)
      if (result?.gradeUpgraded) {
        // 등급 상승 — 사운드/이펙트는 현 단계에선 일반 성공 사운드로 대체.
        playSuccessSound()
        playSuccess()
      } else {
        // 옵션만 reroll — 시각 피드백 약하게
        playSuccessSound()
      }
    },
    [poolKey, applyCube, purchase, playSuccess],
  )

  const onStrangeCubeClick = useCallback(
    () => onCubeClick('STRANGE', 'strange'),
    [onCubeClick],
  )
  const onMiracleCubeClick = useCallback(
    () => onCubeClick('MIRACLE', 'miracle'),
    [onCubeClick],
  )

  const onOptionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>, key: StatusKey) => {
      setBase(key, Number(e.target.value))
      reset()
      resetPotential()
      refreshSuccessScroll()
      bumpResetSignal()
      triesRef.current += 1
    },
    [setBase, reset, resetPotential],
  )

  const onResetClick = useCallback(() => {
    playDiceSound()
    reset()
    resetPotential()
    refreshSuccessScroll()
    bumpResetSignal()
    triesRef.current += 1
    purchase.incItemBuy()
  }, [reset, resetPotential, purchase])

  const onPurchaseReset = useCallback(() => {
    playPurchaseSound()
    reset()
    resetPotential()
    refreshSuccessScroll()
    bumpResetSignal()
    triesRef.current += 1
    purchase.resetAll()
  }, [reset, resetPotential, purchase])

  // ---------- 단축키 ----------
  const scroll10Ref = useRef<HTMLButtonElement | null>(null)
  const scroll60Ref = useRef<HTMLButtonElement | null>(null)
  const scroll100Ref = useRef<HTMLButtonElement | null>(null)
  const chaosRef = useRef<HTMLButtonElement | null>(null)
  const whiteRef = useRef<HTMLButtonElement | null>(null)
  const strangeCubeRef = useRef<HTMLButtonElement | null>(null)
  const miracleCubeRef = useRef<HTMLButtonElement | null>(null)
  const resetRef = useRef<HTMLButtonElement | null>(null)
  const purchaseResetRef = useRef<HTMLButtonElement | null>(null)

  useScrollHotkeys({
    q: { action: () => onScrollClick(10), buttonRef: scroll10Ref },
    w: { action: () => onScrollClick(60), buttonRef: scroll60Ref },
    e: { action: () => onScrollClick(100), buttonRef: scroll100Ref },
    a: { action: onChaosClick, buttonRef: chaosRef },
    s: { action: onWhiteClick, buttonRef: whiteRef },
    d: { action: onStrangeCubeClick, buttonRef: strangeCubeRef },
    f: { action: onMiracleCubeClick, buttonRef: miracleCubeRef },
    r: { action: onResetClick, buttonRef: resetRef },
    v: { action: onPurchaseReset, buttonRef: purchaseResetRef },
  })

  // ---------- 기록 도전 ----------
  const iev = weightedSum(status.current) - weightedSum(status.base)
  const nameColor = ievColor(iev, status.upgradedCount)

  const buildChallengePayload = useCallback(
    (challengerName: string) => {
      const statusDelta = STATUS_KEYS.reduce(
        (acc, key) => ({ ...acc, [key]: status.current[key] - status.base[key] }),
        {} as Record<StatusKey, number>,
      )
      return {
        name: challengerName,
        upgradable: infoCopy?.upgradableCount ?? 0,
        iev,
        scroll: currentScroll?.keyword ?? '',
        success: successScroll,
        status: statusDelta,
        tries: triesRef.current,
      }
    },
    [status, infoCopy, iev, currentScroll, successScroll],
  )

  const challenge = useChallengeRecord({ itemId, buildPayload: buildChallengePayload })

  // ---------- 가격 input 핸들러 ----------
  const onItemPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    purchase.setItemPrice(Number(e.target.value) || 0)

  const onScrollPriceChange =
    (percent: ScrollPercent) => (e: ChangeEvent<HTMLInputElement>) =>
      purchase.setScrollPrice(percent, Number(e.target.value) || 0)

  const onChaosPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    purchase.setExtraPrice('chaos', Number(e.target.value) || 0)

  const onWhitePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    purchase.setExtraPrice('white', Number(e.target.value) || 0)

  const onStrangeCubePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    purchase.setCubePrice('strange', Number(e.target.value) || 0)

  const onMiracleCubePriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    purchase.setCubePrice('miracle', Number(e.target.value) || 0)

  return (
    <>
      <section className="item-simulator-root">
        <div
          className="item-simulator-section bg-light my-2 py-3 px-3"
          style={!RECORD_FEATURE_ENABLED ? { flex: 1 } : undefined}
        >
          <section className="item-info-and-overflow-message">
            <ItemInfoCard
              itemId={itemId}
              info={info}
              current={status.current}
              upgradable={status.upgradable}
              upgradedCount={status.upgradedCount}
              knockBackPercent={status.knockBackPercent}
              nameColor={nameColor}
              scrollAnimationRef={scrollAnimationRef}
              transparentSrc={transparentSrc}
              potential={potential}
              recoverableSlots={status.recoverableSlots}
              resetSignal={resetSignal}
            />

            <ChallengeScrollSuccessCount
              successInfo={successScroll}
              chaosSuccessCount={purchase.state.extras.chaos.successCount}
              whiteSuccessCount={purchase.state.extras.white.successCount}
            />

            <p className="planet-spec-note">※ 본 시뮬레이터의 사양은 메이플 플래닛을 따릅니다 ※</p>

            {RECORD_FEATURE_ENABLED && (
              <section className="item-record-challenge-section">
                <button
                  className="item-record-challenge-btn"
                  onClick={challenge.openModal}
                  onMouseUp={() => (document.activeElement as HTMLElement | null)?.blur()}
                >
                  기록 도전
                </button>
              </section>
            )}

            <section className="overflow-message">
              {status.upgradable <= 0 && (
                <span className="d-flex scroll-overflow-msg">강화 횟수를 초과하였습니다</span>
              )}
            </section>
          </section>

          <div>
            <section className="d-flex justify-content-center">
              <section className="item-controller-section mx-1">
                <ScrollSelectorPanel
                  availableScroll={availableScroll}
                  currentScroll={currentScroll}
                  statusInfo={info?.status}
                  onScrollChange={onScrollChange}
                  onOptionChange={onOptionChange}
                  onScrollClick={onScrollClick}
                  onResetClick={onResetClick}
                  onChaosClick={onChaosClick}
                  onWhiteClick={onWhiteClick}
                  whiteEnabled={status.recoverableSlots > 0}
                  onStrangeCubeClick={onStrangeCubeClick}
                  onMiracleCubeClick={onMiracleCubeClick}
                  scroll10Ref={scroll10Ref}
                  scroll60Ref={scroll60Ref}
                  scroll100Ref={scroll100Ref}
                  chaosRef={chaosRef}
                  whiteRef={whiteRef}
                  strangeCubeRef={strangeCubeRef}
                  miracleCubeRef={miracleCubeRef}
                  resetRef={resetRef}
                />
                <PriceSection
                  itemId={itemId}
                  itemPrice={purchase.state.itemPrice}
                  itemBuyCount={purchase.state.itemBuyCount}
                  scrolls={purchase.state.scrolls}
                  chaos={purchase.state.extras.chaos}
                  white={purchase.state.extras.white}
                  strangeCube={purchase.state.cubes.strange}
                  miracleCube={purchase.state.cubes.miracle}
                  total={purchase.total}
                  onItemPriceChange={onItemPriceChange}
                  onScrollPriceChange={onScrollPriceChange}
                  onChaosPriceChange={onChaosPriceChange}
                  onWhitePriceChange={onWhitePriceChange}
                  onStrangeCubePriceChange={onStrangeCubePriceChange}
                  onMiracleCubePriceChange={onMiracleCubePriceChange}
                  onPurchaseReset={onPurchaseReset}
                  purchaseResetRef={purchaseResetRef}
                />
              </section>
            </section>
          </div>
        </div>

        {RECORD_FEATURE_ENABLED && <BestRecordItem itemId={itemId} info={infoCopy} />}
      </section>

      {RECORD_FEATURE_ENABLED && (
        <>
          <RecordChallengeModal
            isOpen={challenge.open}
            name={challenge.name}
            nameInputChangeHandler={challenge.onNameChange}
            isNameInputEmpty={challenge.isNameEmpty}
            acceptButtonClickedHandler={challenge.submit}
            cancelButtonClickedHandler={challenge.closeModal}
          />
          <RecordChallengeResultModal
            isOpen={challenge.resultOpen}
            isSuccess={challenge.isSuccess}
            okButtonClickedHandler={challenge.closeResult}
          />
        </>
      )}

      <Comments itemId={itemId} />
    </>
  )
}
