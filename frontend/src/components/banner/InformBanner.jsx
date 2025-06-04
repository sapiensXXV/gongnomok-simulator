import styles from "./InformBanner.module.css";

export default function InformBanner() {
  return (
    <>
      <div className={`${styles.container} ${styles.banner}`}>
        <div>6/4 ~ 기록이 초기화되었습니다</div>
      </div>
    </>
  )
}