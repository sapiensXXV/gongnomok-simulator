export default function CategorySelect({
  category,
  condition,
  name,
  representationItemNumber,
  changeHandler
}) {
  return (
    <>
      <button 
        className={`category-select-button ${condition === category ? 'condition-title' : ''}`}
        onClick={(e) => changeHandler(e, category)}
      >
        <img src={`/images/item/${representationItemNumber}.png`}/>
        <span>{name}</span>
      </button>
    </>
  )
}