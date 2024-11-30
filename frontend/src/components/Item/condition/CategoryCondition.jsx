import {ASSETS_URL} from "../../../global/uri.js";

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
        <img src={`${ASSETS_URL}/images/item/${representationItemNumber}.png`}/>
        <span>{name}</span>
      </button>
    </>
  )
}