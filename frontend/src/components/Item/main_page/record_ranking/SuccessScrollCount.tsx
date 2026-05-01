import styles from "./SuccessScrollCount.module.css";
import {ASSETS_URL} from "../../../../global/uri";

function SuccessScrollCount({ percent, count }) {
  return (
    <>
      <main className={styles.success_scroll_count}>
        <img className={styles.scroll_img} src={`${ASSETS_URL}/images/scroll/${percent}.png`} />
        <span> x </span>
        <span>{count}</span>
      </main>
    </>
  )
}

export default SuccessScrollCount;