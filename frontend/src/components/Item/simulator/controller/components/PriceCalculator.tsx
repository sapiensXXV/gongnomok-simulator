import type { ChangeEvent } from 'react'

type Props =
  | {
      isScroll: false
      percent?: undefined
      price: number | string
      buyCount: number
      successCount?: undefined
      inputHandler: (e: ChangeEvent<HTMLInputElement>) => void
    }
  | {
      isScroll: true
      percent: 10 | 60 | 100
      price: number | string
      buyCount: number
      successCount: number
      inputHandler: (e: ChangeEvent<HTMLInputElement>) => void
    }

export default function PriceCalculator(props: Props) {
  const { isScroll, price, buyCount, inputHandler } = props
  return (
    <div className="price-input-container">
      <span className="price-input-description">
        {isScroll ? `${props.percent}% 가격: ` : '아이템 가격: '}
      </span>
      <input type="text" value={price} onChange={inputHandler} placeholder="0" />
      <span>{isScroll ? `${props.successCount}/${buyCount}개` : `${buyCount}개`}</span>
    </div>
  )
}
