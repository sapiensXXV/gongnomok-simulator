export default function CategorySelect({
  isSelected,
  name,
  representationItemNumber,
  changeHandler
}) {
  return (
    <>
      <button 
        className={`category-select-button ${isSelected ? 'condition-title' : ''}`}
        onClick={(e) => changeHandler(e)}
      >
        <img src={`/images/item/${representationItemNumber}.png`}/>
        <span>{name}</span>
      </button>
    </>
  )
}