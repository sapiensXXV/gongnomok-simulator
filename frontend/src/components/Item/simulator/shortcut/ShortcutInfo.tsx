import { memo } from "react"
import styles from "./ShortcutInfo.module.css"

function ShortcutInfo({ shortcutKey, description }) {
  return (
    <>
      <main>
        <span className={styles.key_color}>{shortcutKey}</span>
        <span> - </span>
        <span className={`${styles.description}`}>{description}</span>
      </main>
    </>
  )
}

export default memo(ShortcutInfo);