import { forwardRef, type Ref } from 'react'
import { STATUS_NAME } from '../../../../../global/status'
import { ASSETS_URL } from '../../../../../global/uri'
import type { ScrollInfo, ScrollUpgradeEffect } from '../../../../../types/scroll'

export type ScrollPercent = 10 | 60 | 100

interface Props {
  percent: ScrollPercent
  currentScroll: ScrollInfo | string | undefined
  onClick: (percent: ScrollPercent) => void
}

const KEY_LABEL: Record<ScrollPercent, string> = { 10: 'Q', 60: 'W', 100: 'E' }

function Scroll({ percent, currentScroll, onClick }: Props, ref: Ref<HTMLButtonElement>) {
  const scrollObj = typeof currentScroll === 'object' ? currentScroll : undefined

  const getScrollStatus = (value: ScrollInfo | undefined): ScrollUpgradeEffect[] | undefined => {
    if (percent === 10) return value?.upgradeValue?._10
    if (percent === 60) return value?.upgradeValue?._60
    if (percent === 100) return value?.upgradeValue?._100
  }

  return (
    <div className="scroll-info">
      <button
        ref={ref}
        id={`scroll-button-${percent}`}
        onClick={() => onClick(percent)}
        onMouseUp={() => (document.activeElement as HTMLElement | null)?.blur()}
      >
        <span className="shortcut-key-label">{KEY_LABEL[percent]}</span>
        <img src={`${ASSETS_URL}/images/scroll/${percent}.png`} />
      </button>
      <span>
        {scrollObj?.shortcut}
        {percent}%
      </span>
      {getScrollStatus(scrollObj)?.map((upgrade) => (
        <span key={`${upgrade.name}${upgrade.value}${percent}`}>
          {STATUS_NAME.get(upgrade.name)}+{upgrade.value}
        </span>
      ))}
    </div>
  )
}

export default forwardRef(Scroll)
