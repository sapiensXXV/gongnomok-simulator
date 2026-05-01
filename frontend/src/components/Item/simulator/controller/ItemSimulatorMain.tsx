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
  STATUS_KEYS,
} from '../../../../hooks'

import ItemInfoCard from './components/ItemInfoCard'
import ScrollSelectorPanel from './components/ScrollSelectorPanel'
import PriceSection from './components/PriceSection'
import ChallengeScrollSuccessCount from './components/ChallengeScrollSuccessCount'
import type { ScrollPercent } from './components/Scroll'

import Comments from '../../comment/Comments'
import BestRecordItem from '../record/BestRecordItem'
import RecordChallengeModal from '../modal/RecordChallengeModal'
import RecordChallengeResultModal from '../modal/RecordChallengeResultModal'
import ShortcutBanner from '../shortcut/ShortcutBanner'

import type { ScrollInfo, SuccessScrollCount } from '../../../../types/scroll'
import type { StatusKey } from '../../../../types/item'

function rollScroll(percent: ScrollPercent): boolean {
  const threshold = percent / 10
  return Math.floor(Math.random() * 10 + 1) <= threshold
}

function ievColor(iev: number, upgradedCount: number): string {
  if (iev >= 0 && iev <= 5) return upgradedCount === 0 ? 'white' : 'orange'
  if (iev >= 6 && iev <= 22) return 'blue'
  if (iev >= 23 && iev <= 39) return 'purple'
  if (iev >= 40 && iev <= 56) return 'yellow'
  if (iev >= 57 && iev <= 73) return 'green'
  return 'white'
}

/** hp/mp 는 1/10 가중치를 적용한 능력치 합 (IEV 계산 보조). */
function weightedSum(values: Record<StatusKey, number>): number {
  return STATUS_KEYS.reduce((sum, key) => {
    const v = values[key]
    return key === 'hp' || key === 'mp' ? sum + v / 10 : sum + v
  }, 0)
}

export default function ItemSimulatorMain() {
  const { itemId } = useParams<{ itemId: string }>()

  // ---------- 데이터 + 상태 ----------
  const { info, infoCopy, availableScroll } = useItemDetail(itemId)
  const { state: status, init, applyUpgrade, setBase, reset } = useItemStatus()
  const purchase = usePurchaseRecord()
  const { imgRef: scrollAnimationRef, playSuccess, playFailure, transparentSrc } =
    useScrollAnimation()
  const triesRef = useRef(1)

  const [currentScroll, setCurrentScroll] = useState<ScrollInfo | null>(null)
  const [successScroll, setSuccessScroll] = useState<SuccessScrollCount>(DEAFULT_SUCCESS_SCROLL)
  const refreshSuccessScroll = () => setSuccessScroll(DEAFULT_SUCCESS_SCROLL)

  useEffect(() => {
    if (info) init(info)
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
    [applyUpgrade, currentScroll, playFailure, playSuccess, purchase],
  )

  const onScrollClick = useCallback(
    (percent: ScrollPercent) => {
      if (status.upgradable <= 0) return
      applyScrollResult(percent, rollScroll(percent))
      purchase.recordBuy(percent)
    },
    [status.upgradable, applyScrollResult, purchase],
  )

  const onOptionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>, key: StatusKey) => {
      setBase(key, Number(e.target.value))
      reset()
      refreshSuccessScroll()
      triesRef.current += 1
    },
    [setBase, reset],
  )

  const onResetClick = useCallback(() => {
    playDiceSound()
    reset()
    refreshSuccessScroll()
    triesRef.current += 1
    purchase.incItemBuy()
  }, [reset, purchase])

  const onPurchaseReset = useCallback(() => {
    playPurchaseSound()
    reset()
    refreshSuccessScroll()
    triesRef.current += 1
    purchase.resetAll()
  }, [reset, purchase])

  // ---------- 단축키 ----------
  const scroll10Ref = useRef<HTMLButtonElement | null>(null)
  const scroll60Ref = useRef<HTMLButtonElement | null>(null)
  const scroll100Ref = useRef<HTMLButtonElement | null>(null)
  const resetRef = useRef<HTMLButtonElement | null>(null)
  const purchaseResetRef = useRef<HTMLButtonElement | null>(null)

  useScrollHotkeys({
    q: { action: () => onScrollClick(10), buttonRef: scroll10Ref },
    w: { action: () => onScrollClick(60), buttonRef: scroll60Ref },
    e: { action: () => onScrollClick(100), buttonRef: scroll100Ref },
    r: { action: onResetClick, buttonRef: resetRef },
    f: { action: onPurchaseReset, buttonRef: purchaseResetRef },
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

  return (
    <>
      <ShortcutBanner />
      <section className="item-simulator-root">
        <div className="item-simulator-section bg-light my-3 py-3 px-3">
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
            />

            <ChallengeScrollSuccessCount successInfo={successScroll} />

            <section className="item-record-challenge-section">
              <button
                className="item-record-challenge-btn"
                onClick={challenge.openModal}
                onMouseUp={() => (document.activeElement as HTMLElement | null)?.blur()}
              >
                기록 도전
              </button>
            </section>

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
                  scroll10Ref={scroll10Ref}
                  scroll60Ref={scroll60Ref}
                  scroll100Ref={scroll100Ref}
                  resetRef={resetRef}
                />
                <PriceSection
                  itemPrice={purchase.state.itemPrice}
                  itemBuyCount={purchase.state.itemBuyCount}
                  scrolls={purchase.state.scrolls}
                  total={purchase.total}
                  onItemPriceChange={onItemPriceChange}
                  onScrollPriceChange={onScrollPriceChange}
                  onPurchaseReset={onPurchaseReset}
                  purchaseResetRef={purchaseResetRef}
                />
              </section>
            </section>
          </div>
        </div>

        <BestRecordItem itemId={itemId} info={infoCopy} />
      </section>

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

      <Comments itemId={itemId} />
    </>
  )
}
