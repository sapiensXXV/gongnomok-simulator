export default function CategoryCondition({
  category,
  condition,
  name,
  representationItemNumber,
  changeHandler
}) {
  return (
    <>
      <button 
        className={`category-select-button ${condition === category ? 'select-active-text' : ''}`}
        onClick={(e) => changeHandler(e, category)}
      >
        <img src={`/images/item/${representationItemNumber}.png`}/>
        <span>{name}</span>
      </button>
    </>
  )
}