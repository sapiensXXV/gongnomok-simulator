import styles from './ShortcutBanner.module.css'

interface KeyDef {
  k: string
  desc: string
}

const ROW_1: KeyDef[] = [
  { k: 'Q', desc: '10%' },
  { k: 'W', desc: '60%' },
  { k: 'E', desc: '100%' },
  { k: 'R', desc: '강화 리셋' },
]

const ROW_2: KeyDef[] = [
  { k: 'A', desc: '혼돈' },
  { k: 'S', desc: '순백' },
  { k: 'D', desc: '수상한' },
  { k: 'F', desc: '미라클' },
]

const ROW_3: KeyDef[] = [{ k: 'V', desc: '구매 리셋' }]

function ShortcutBanner() {
  return (
    <section className={`shortcut-guide-section ${styles.main}`}>
      <span className={styles.title}>단축키</span>
      <div className={styles.keyboard}>
        <div className={`${styles.kbd_row} ${styles.kbd_row_1}`}>
          {ROW_1.map((it) => (
            <ShortcutKey key={it.k} {...it} />
          ))}
        </div>
        <div className={`${styles.kbd_row} ${styles.kbd_row_2}`}>
          {ROW_2.map((it) => (
            <ShortcutKey key={it.k} {...it} />
          ))}
        </div>
        <div className={`${styles.kbd_row} ${styles.kbd_row_3}`}>
          {ROW_3.map((it) => (
            <ShortcutKey key={it.k} {...it} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ShortcutKey({ k, desc }: KeyDef) {
  return (
    <div className={styles.kbd_cell}>
      <kbd className={styles.kbd_key}>{k}</kbd>
      <span className={styles.kbd_desc}>{desc}</span>
    </div>
  )
}

export default ShortcutBanner
