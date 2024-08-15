import styles from "./SuccessScrollCount.module.css";

function SuccessScrollCount({ percent, count }) {
  return (
    <>
      <main className={styles.success_scroll_count}>
        <img className={styles.scroll_img} src={`/images/scroll/${percent}.png`} />
        <span> x </span>
        <span>{count}</span>
      </main>
    </>
  )
}

export default SuccessScrollCount;