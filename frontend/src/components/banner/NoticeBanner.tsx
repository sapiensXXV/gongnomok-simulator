import styles from "./NoticeBanner.module.css";

function NoticeBanner() {
  return (
    <>
      <div className={`${styles.container} ${styles.banner}`}>
        <div>신발 점프력 주문서가 적용되지 않는 버그가 수정되었습니다</div>
      </div>
    </>
  )
}

export default NoticeBanner;