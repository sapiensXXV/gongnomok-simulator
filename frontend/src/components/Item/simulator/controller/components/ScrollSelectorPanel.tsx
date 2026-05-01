import { type ChangeEvent, type RefObject } from 'react'
import { ASSETS_URL } from '../../../../../global/uri'
import OptionSelect from './OptionSelect'
import Scroll, { type ScrollPercent } from './Scroll'
import type { ItemStatus, StatusKey } from '../../../../../types/item'
import type { ScrollInfo } from '../../../../../types/scroll'

const PERCENTS: ScrollPercent[] = [10, 60, 100]

interface Props {
  availableScroll: ScrollInfo[]
  currentScroll: ScrollInfo | null
  statusInfo: ItemStatus | undefined
  onScrollChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onOptionChange: (e: ChangeEvent<HTMLSelectElement>, key: StatusKey) => void
  onScrollClick: (percent: ScrollPercent) => void
  onResetClick: () => void
  /** 혼돈의 주문서 클릭. */
  onChaosClick: () => void
  /** 순백의 주문서 클릭. */
  onWhiteClick: () => void
  /** 순백 사용 가능 여부 (복구 가능 횟수 > 0). */
  whiteEnabled: boolean
  /** 수상한 큐브 클릭. */
  onStrangeCubeClick: () => void
  /** 미라클 큐브 클릭. */
  onMiracleCubeClick: () => void
  scroll10Ref: RefObject<HTMLButtonElement | null>
  scroll60Ref: RefObject<HTMLButtonElement | null>
  scroll100Ref: RefObject<HTMLButtonElement | null>
  chaosRef: RefObject<HTMLButtonElement | null>
  whiteRef: RefObject<HTMLButtonElement | null>
  strangeCubeRef: RefObject<HTMLButtonElement | null>
  miracleCubeRef: RefObject<HTMLButtonElement | null>
  resetRef: RefObject<HTMLButtonElement | null>
}

/** 시뮬레이터 가운데 영역 — 주문서 선택 + 적용 버튼 + 리셋. */
export default function ScrollSelectorPanel({
  availableScroll,
  currentScroll,
  statusInfo,
  onScrollChange,
  onOptionChange,
  onScrollClick,
  onResetClick,
  onChaosClick,
  onWhiteClick,
  whiteEnabled,
  onStrangeCubeClick,
  onMiracleCubeClick,
  scroll10Ref,
  scroll60Ref,
  scroll100Ref,
  chaosRef,
  whiteRef,
  strangeCubeRef,
  miracleCubeRef,
  resetRef,
}: Props) {
  const refOf = (percent: ScrollPercent) =>
    percent === 10 ? scroll10Ref : percent === 60 ? scroll60Ref : scroll100Ref

  const blurActive = () => (document.activeElement as HTMLElement | null)?.blur()

  return (
    <>
      <select
        className="form-select form-select-sm"
        onChange={onScrollChange}
        value={currentScroll?.keyword ?? ''}
      >
        {availableScroll.map((scroll) => (
          <option key={scroll.keyword} value={scroll.keyword}>
            {scroll.name}
          </option>
        ))}
      </select>

      <section className="option-select-container">
        <OptionSelect statusInfo={statusInfo} optionSelectHandler={onOptionChange} />
      </section>

      {/* 1열: 10/60/100 + 리셋 (기존) */}
      <div className="scroll-select">
        {PERCENTS.map((percent) => (
          <Scroll
            key={percent}
            ref={refOf(percent)}
            percent={percent}
            currentScroll={currentScroll ?? undefined}
            onClick={onScrollClick}
          />
        ))}
        <div className="scroll-info">
          <button
            ref={resetRef}
            onClick={onResetClick}
            id="reset-button"
            onMouseUp={blurActive}
            title="강화 리셋 (R)"
          >
            <span className="shortcut-key-label">R</span>
            <img src={`${ASSETS_URL}/images/etc/reset.png`} />
          </button>
        </div>
      </div>

      {/* 2열: 혼돈 / 순백 / 수상한 큐브 / 미라클 큐브 */}
      <div className="scroll-select scroll-select--extras">
        <div className="scroll-info">
          <button
            ref={chaosRef}
            onClick={onChaosClick}
            onMouseUp={blurActive}
            title="혼돈의 주문서 (A)"
          >
            <span className="shortcut-key-label">A</span>
            <img src={`${ASSETS_URL}/images/scroll/chaos.webp`} alt="혼돈의 주문서" />
          </button>
          <span>혼돈 60%</span>
        </div>

        <div className="scroll-info">
          <button
            ref={whiteRef}
            onClick={onWhiteClick}
            onMouseUp={blurActive}
            disabled={!whiteEnabled}
            title={whiteEnabled ? '순백의 주문서 (S)' : '복구 가능 횟수가 없습니다'}
          >
            <span className="shortcut-key-label">S</span>
            <img src={`${ASSETS_URL}/images/scroll/white.png`} alt="순백의 주문서" />
          </button>
          <span>순백 100%</span>
        </div>

        <div className="scroll-info">
          <button
            ref={strangeCubeRef}
            onClick={onStrangeCubeClick}
            onMouseUp={blurActive}
            title="수상한 큐브 (D)"
          >
            <span className="shortcut-key-label">D</span>
            <img src={`${ASSETS_URL}/images/cube/strange.png`} alt="수상한 큐브" />
          </button>
          <span>수상한 큐브</span>
        </div>

        <div className="scroll-info">
          <button
            ref={miracleCubeRef}
            onClick={onMiracleCubeClick}
            onMouseUp={blurActive}
            title="미라클 큐브 (F)"
          >
            <span className="shortcut-key-label">F</span>
            <img
              className="cube-miracle-img"
              src={`${ASSETS_URL}/images/cube/miracle.png`}
              alt="미라클 큐브"
            />
          </button>
          <span>미라클 큐브</span>
        </div>
      </div>
    </>
  )
}
