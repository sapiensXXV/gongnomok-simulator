import styles from "./InformBanner.module.css";

export default function InformBanner() {
  return (
    <>
      <div className={`${styles.inform_banner} ${styles.banner}`}>
        <div>8/14 ~ 기록 초기화</div>
        <div>★ 궁수 아이템 추가 ★</div>
      </div>
    </>
  )
}