import styles from "./NoticeBanner.module.css";

function NoticeBanner() {
  return (
    <>
      <div className={`${styles.container} ${styles.banner}`}>
        <div>안녕하세요, 메이플 주문서 시뮬레이터 개발자 입니다.</div>
        <div>어제 기록 랭킹 업데이트 이후 부적절한 요청으로 기록을 등록하는 유저가 생겨나</div>
        <div>지속적으로 기록이 지워지고 있습니다. 주문서 요청 하나하나 서버측에서 검증한다면 ,</div>
        <div>해결할 수 있지만 서버 비용문제로 해당 방법은 사용하지 못해 대안을 고민중에 있습니다.</div>
        <div>빠른 시일내에 방지할 수 있는 방법을 찾겠습니다. 불편을 드려서 죄송합니다.</div>
      </div>
    </>
  )
}

export default NoticeBanner;