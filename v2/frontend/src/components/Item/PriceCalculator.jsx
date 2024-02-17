export default function PriceCalculator({ 
  isScroll, 
  percent, 
  buyCount,
  successCount,
  inputHandler 
}) {
  return (
    <>
      <div className="price-input-container">
        <span className="price-input-description">{isScroll ? `${percent}% 가격: ` : '아이템 가격: '}</span>
        <input   type="text" onChange={inputHandler} placeholder={0}/>
        <span>{isScroll ? `${successCount}/${buyCount}개` : `${buyCount}개`}</span>
      </div>
    </>
  );
}