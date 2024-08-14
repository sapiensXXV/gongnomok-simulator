import { memo } from "react"
import styles from "./ShortcutInfo.module.css"

function ShortcutInfo({ description }) {
  return (
    <>
        <span className={`shortcut-description ${styles.description}`}>{description}</span>
    </>
  )
}

export default memo(ShortcutInfo);