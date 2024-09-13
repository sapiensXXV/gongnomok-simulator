import {CDN_URL} from "../../../global/uri.js";

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
        <img src={`${CDN_URL}/images/item/${representationItemNumber}.png`}/>
        <span>{name}</span>
      </button>
    </>
  )
}