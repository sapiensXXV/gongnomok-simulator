import styles from './ScrollSuccess.module.css'

function ScrollSuccess({success}) {
  return (
    <>
      <main className={styles.main_flex}>
        <div>
          <img className={styles.scroll_img} src='/images/scroll/10.png'/>
          <span> x {success.ten}</span>
        </div>

        <div>
          <img className={styles.scroll_img} src='/images/scroll/60.png'/>
          <span> x {success.sixty}</span>
        </div>

        <div>
          <img className={styles.scroll_img} src='/images/scroll/100.png'/>
          <span> x {success.hundred}</span>
        </div>
      </main>

    </>
  );
}

export default ScrollSuccess;
