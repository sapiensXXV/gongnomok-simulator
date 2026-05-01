import { type ChangeEvent, type RefObject } from 'react'
import { ASSETS_URL } from '../../../../../global/uri'
import type { ScrollPercent } from './Scroll'

const PERCENTS: ScrollPercent[] = [10, 60, 100]

interface ScrollEntry {
  price: number
  buyCount: number
  successCount: number
}

interface Props {
  /** 아이템 가격 행에 시뮬 중인 아이템 아이콘을 표시하기 위한 ID. */
  itemId: string | undefined
  itemPrice: number
  itemBuyCount: number
  scrolls: Record<ScrollPercent, ScrollEntry>
  chaos: ScrollEntry
  white: ScrollEntry
  strangeCube: ScrollEntry
  miracleCube: ScrollEntry
  total: number
  onItemPriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onScrollPriceChange: (percent: ScrollPercent) => (e: ChangeEvent<HTMLInputElement>) => void
  onChaosPriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onWhitePriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onStrangeCubePriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onMiracleCubePriceChange: (e: ChangeEvent<HTMLInputElement>) => void
  onPurchaseReset: () => void
  purchaseResetRef: RefObject<HTMLButtonElement | null>
}

export default function PriceSection({
  itemId,
  itemPrice,
  itemBuyCount,
  scrolls,
  chaos,
  white,
  strangeCube,
  miracleCube,
  total,
  onItemPriceChange,
  onScrollPriceChange,
  onChaosPriceChange,
  onWhitePriceChange,
  onStrangeCubePriceChange,
  onMiracleCubePriceChange,
  onPurchaseReset,
  purchaseResetRef,
}: Props) {
  return (
    <div className="item-price-info">
      {/* 그룹 1 — 아이템 + 일반 주문서 (10/60/100) */}
      <PriceRow
        iconSrc={itemId ? `${ASSETS_URL}/images/item/${itemId}.png` : undefined}
        label="아이템 가격"
        price={itemPrice}
        countText={`${itemBuyCount}개`}
        onChange={onItemPriceChange}
      />
      {PERCENTS.map((percent) => (
        <PriceRow
          key={`scroll-${percent}`}
          iconSrc={`${ASSETS_URL}/images/scroll/${percent}.png`}
          label={`${percent}%`}
          price={scrolls[percent].price}
          countText={`${scrolls[percent].successCount}/${scrolls[percent].buyCount}개`}
          onChange={onScrollPriceChange(percent)}
        />
      ))}

      <div className="price-group-divider" />

      {/* 그룹 2 — 신주문서 (혼돈 / 순백) */}
      <PriceRow
        iconSrc={`${ASSETS_URL}/images/scroll/chaos.webp`}
        label="혼돈"
        price={chaos.price}
        countText={`${chaos.successCount}/${chaos.buyCount}개`}
        onChange={onChaosPriceChange}
      />
      <PriceRow
        iconSrc={`${ASSETS_URL}/images/scroll/white.png`}
        label="순백"
        price={white.price}
        countText={`${white.successCount}/${white.buyCount}개`}
        onChange={onWhitePriceChange}
      />

      <div className="price-group-divider" />

      {/* 그룹 3 — 큐브 (수상한 / 미라클) */}
      <PriceRow
        iconSrc={`${ASSETS_URL}/images/cube/strange.png`}
        label="수상한 큐브"
        price={strangeCube.price}
        countText={`${strangeCube.buyCount}개`}
        onChange={onStrangeCubePriceChange}
      />
      <PriceRow
        iconSrc={`${ASSETS_URL}/images/cube/miracle.png`}
        label="미라클 큐브"
        price={miracleCube.price}
        countText={`${miracleCube.buyCount}개`}
        onChange={onMiracleCubePriceChange}
        iconExtraClass="cube-miracle-img"
      />

      {/* 합계 + 구매기록 리셋 */}
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
          title="구매기록 리셋 (V)"
        >
          <span className="shortcut-key-label">V</span>
          구매기록 리셋
        </button>
      </section>
    </div>
  )
}

interface PriceRowProps {
  iconSrc?: string
  iconExtraClass?: string
  label: string
  price: number
  countText: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PriceRow({ iconSrc, iconExtraClass, label, price, countText, onChange }: PriceRowProps) {
  return (
    <div className="price-input-container">
      <span className="price-input-icon">
        {iconSrc ? <img src={iconSrc} alt="" className={iconExtraClass} /> : null}
      </span>
      <span className="price-input-description">{label}</span>
      <input type="text" value={price} onChange={onChange} placeholder="0" />
      <span className="price-input-count">{countText}</span>
    </div>
  )
}
