import styles from './ScrollSuccess.module.css'
import {CDN_URL} from "../../../../global/uri.js";

function ScrollSuccess({success}) {
  return (
    <>
      <main className={styles.main_flex}>
        <div>
          <img className={styles.scroll_img} src={`${CDN_URL}/images/scroll/10.png`}/>
          <span> x {success.ten}</span>
        </div>

        <div>
          <img className={styles.scroll_img} src={`${CDN_URL}/images/scroll/60.png`}/>
          <span> x {success.sixty}</span>
        </div>

        <div>
          <img className={styles.scroll_img} src={`${CDN_URL}/images/scroll/100.png`}/>
          <span> x {success.hundred}</span>
        </div>
      </main>

    </>
  );
}

export default ScrollSuccess;
