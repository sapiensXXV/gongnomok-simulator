import styles from "./InformBanner.module.css";

export default function InformBanner() {
  return (
    <>
      <div className={`${styles.container} ${styles.banner}`}>
        <div>8/14 ~ 기록 초기화</div>
        <div>8/14 ~ 인기 아이템 초기화</div>
        <div>★ 궁수 아이템, 노란색/빨간색/파란색/보라색/갈색/회색 노가다 목장갑 추가  ★</div>
      </div>
    </>
  )
}