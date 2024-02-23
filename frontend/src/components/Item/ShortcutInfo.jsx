import { memo } from "react"

function ShortcutInfo({ description }) {
  return (
    <>
        <span className="shortcut-description">{description}</span>
    </>
  )
}

export default memo(ShortcutInfo);