import styles from "./NoticeBanner.module.css";

function NoticeBanner() {
  return (
    <>
      <div className={`${styles.container} ${styles.banner}`}>
        <div>안녕하세요, 메이플 주문서 시뮬레이터 개발자입니다.</div>
        <div>어제 기록 랭킹 업데이트 이후, 부적절한 요청으로 인해 기록이 </div>
        <div>지속적으로 조작되거나 삭제되고 있습니다. 서버 측에서 요청을 검증하는 </div>
        <div>방식으로 해결할 수 있으나 서버 비용 문제로 다른 대안을 고민 중입니다.</div>
        <div>빠른 시일 내에 해결책을 마련하겠습니다. 불편을 드려 죄송합니다.</div>
      </div>
    </>
  )
}

export default NoticeBanner;