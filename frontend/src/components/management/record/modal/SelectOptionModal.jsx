import styles from './SelectOptionModal.module.css';

function SelectOptionModal({
  isOpen,
  deleteRecordByName,
  updateRecordAsFirst,
  blockUserByIp,
  cancelHandler
}) {
  return (
    <>
      {isOpen &&
        <main className={styles.modal_root}>
          <section className={styles.modal_container}>
            <div className={styles.modal_title}>
              동작 선택
            </div>
            <section className={styles.button_section}>
              <button onClick={deleteRecordByName} >이 사용자의 기록 삭제</button>
              <button onClick={updateRecordAsFirst} >최고기록으로 등록</button>
              <button onClick={blockUserByIp} className={`${styles.primary_red_btn}`} >유저 차단</button>
              <button onClick={cancelHandler}>나가기</button>
            </section>
          </section>
        </main>
      }
    </>
  )
}

export default SelectOptionModal;