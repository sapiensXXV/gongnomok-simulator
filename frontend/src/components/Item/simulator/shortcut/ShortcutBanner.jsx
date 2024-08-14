import ShortcutInfo from "./ShortcutInfo.jsx";
import styles from "./ShortcutBanner.module.css";

function ShortcutBanner() {
  return (
    <section className={`shortcut-guide-section ${styles.main}`}>
      <span className={`${styles.title}`}>단축키</span>
      <div className="shortcut-info">
        <ShortcutInfo shortcutKey='Q' description='10%적용'/>
        <ShortcutInfo shortcutKey='W' description='60%적용'/>
        <ShortcutInfo shortcutKey='E' description='100%적용'/>
        <ShortcutInfo shortcutKey='R' description='강화 리셋'/>
        <ShortcutInfo shortcutKey='F' description='구매기록 리셋'/>
      </div>
    </section>
  )
}

export default ShortcutBanner;