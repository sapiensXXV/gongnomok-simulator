import styles from "./InformBanner.module.css";

export default function InformBanner() {
  return (
    <>
      <div className={`${styles.container} ${styles.banner}`}>
        {/*<div>8/14 ~ 기록 초기화</div>*/}
        {/*<div>8/14 ~ 인기 아이템 초기화</div>*/}
        <div>10/1 기록 초기화 예정</div>
      </div>
    </>
  )
}