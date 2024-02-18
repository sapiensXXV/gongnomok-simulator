import { useEffect, useRef, useState } from "react"
import { SCROLL_INFO } from "../../global/scroll"
import { STATUS_NAME } from "../../global/status" 

export default function Scroll({ 
  percent, 
  currentScroll,
  onClick,
}) {

  const getScrollStatus = (value) => {
    if (percent === 10) {
      return value?.upgradeValue?._10;
    } else if (percent === 60) {
      return value?.upgradeValue?._60;
    } else if (percent === 100) {
      return value?.upgradeValue?._100;
    }
  }

  return (
    <>
      <div className='scroll-info'>
        <button id={`scroll-button-${percent}`}
          onClick={() => onClick(percent)}
          onMouseUp={() => document.activeElement.blur()}
        >
          <img src={`/images/scroll/${percent}.png`}></img>
        </button>
        <span>{currentScroll?.shortcut}{percent}%</span>
        {
          getScrollStatus(currentScroll)?.map((upgrade) => {
            return (
              <span 
                key={`${upgrade.name}${upgrade.value}${percent}`}
              >
                {STATUS_NAME.get(upgrade.name)}+{upgrade.value}
              </span>
            )
          })
        }
      </div>
    </>
  )
}