import { memo } from "react"

function ShortcutInfo({ description }) {
  console.log('shortcut info render')
  return (
    <>
        <span className="shortcut-description">{description}</span>
    </>
  )
}

export default memo(ShortcutInfo);