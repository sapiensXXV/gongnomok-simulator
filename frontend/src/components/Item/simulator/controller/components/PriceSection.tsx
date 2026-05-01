import { type ChangeEvent, type RefObject } from 'react'
import { ASSETS_URL } from '../../../../../global/uri'
import PriceCalculator from './PriceCalculator'
import type { ScrollPercent } from './Scroll'

const PERCENTS: ScrollPercent[] = [10, 60, 100]

interface ScrollEntry {
  price: number
  buyCount: number
  successCount: number
}

interface Props {
  itemPrice: number
  itemBuyCount: number
  scrolls: Record<ScrollPercent, ScrollEntry>
  total: number
  onItemPriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onScrollPriceChange: (percent: ScrollPercent) => (e: ChangeEvent<HTMLInputElement>) => void
  onPurchaseReset: () => void
  purchaseResetRef: RefObject<HTMLButtonElement | null>
}

/** 시뮬레이터 가격 입력 영역 + 합계 + 구매기록 리셋. */
export default function PriceSection({
  itemPrice,
  itemBuyCount,
  scrolls,
  total,
  onItemPriceChange,
  onScrollPriceChange,
  onPurchaseReset,
  purchaseResetRef,
}: Props) {
  return (
    <div className="item-price-info">
      <PriceCalculator
        isScroll={false}
        price={itemPrice}
        buyCount={itemBuyCount}
        inputHandler={onItemPriceChange}
      />
      {PERCENTS.map((percent) => (
        <PriceCalculator
          key={`scroll-price-${percent}`}
          isScroll={true}
          percent={percent}
          price={scrolls[percent].price}
          buyCount={scrolls[percent].buyCount}
          successCount={scrolls[percent].successCount}
          inputHandler={onScrollPriceChange(percent)}
        />
      ))}

      <section className="total-price-info-section">
        <div className="total-price-info">
          <img src={`${ASSETS_URL}/images/etc/meso.png`} />
          <span>{total.toLocaleString()}</span>
        </div>
        <button
          ref={purchaseResetRef}
          className="total-price-reset-btn"
          id="purchase-reset-button"
          onClick={onPurchaseReset}
          onMouseUp={() => (document.activeElement as HTMLElement | null)?.blur()}
        >
          구매기록 리셋
        </button>
      </section>
    </div>
  )
}
