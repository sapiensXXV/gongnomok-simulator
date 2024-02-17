import { useEffect, useState } from "react"
import { SCROLL_INFO } from "../../global/scroll"
import { STATUS_NAME } from "../../global/status" 

export default function Scroll({ percent, name, onClick }) {

  const [scrollInfo, setScrollInfo] = useState({})

  useEffect(() => {
    setScrollInfo(SCROLL_INFO.get(name))
    // console.log(SCROLL_INFO.get(name))
  }, [])

  const getScrollStatus = (value) => {
    if (percent === 10) {
      return value.upgradeValue._10;
    } else if (percent === 60) {
      return value.upgradeValue._60;
    } else if (percent === 100) {
      return value.upgradeValue._100;
    }
  }

  return (
    <>
      <div className="scroll-info">
        <button onClick={() => onClick(percent)}>
          <img src={`/images/scroll/${percent}.png`}></img>
        </button>
        <span>{scrollInfo.shortcut}{percent}%</span>
        {
          getScrollStatus(SCROLL_INFO.get(name)).map((upgrade) => {
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