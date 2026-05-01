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
  scroll10Ref: RefObject<HTMLButtonElement | null>
  scroll60Ref: RefObject<HTMLButtonElement | null>
  scroll100Ref: RefObject<HTMLButtonElement | null>
  resetRef: RefObject<HTMLButtonElement | null>
}

/** 시뮬레이터 가운데 영역: 주문서 드롭다운 + 옵션 선택 + 주문서 3개 + 리셋 버튼. */
export default function ScrollSelectorPanel({
  availableScroll,
  currentScroll,
  statusInfo,
  onScrollChange,
  onOptionChange,
  onScrollClick,
  onResetClick,
  scroll10Ref,
  scroll60Ref,
  scroll100Ref,
  resetRef,
}: Props) {
  const refOf = (percent: ScrollPercent) =>
    percent === 10 ? scroll10Ref : percent === 60 ? scroll60Ref : scroll100Ref

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
            onMouseUp={() => (document.activeElement as HTMLElement | null)?.blur()}
          >
            <img src={`${ASSETS_URL}/images/etc/reset.png`} />
          </button>
        </div>
      </div>
    </>
  )
}
