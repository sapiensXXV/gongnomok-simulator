import { memo } from "react";

export default function PriceCalculator({ 
  isScroll, 
  percent,
  price,
  buyCount,
  successCount,
  inputHandler 
}) {

  // console.log('price calculator render')

  return (
    <>
      <div className="price-input-container">
        <span className="price-input-description">{isScroll ? `${percent}% 가격: ` : '아이템 가격: '}</span>
        <input type="text" value={price} onChange={inputHandler} placeholder={0} />
        <span>{isScroll ? `${successCount}/${buyCount}개` : `${buyCount}개`}</span>
      </div>
    </>
  );
}



