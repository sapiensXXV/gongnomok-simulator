function RecordChallengeResultModal({
  isOpen,
  isSuccess,
  okButtonClickedHandler
}) {
  return (
    <>
      {
        isOpen &&
        <div
          className="custom-modal-container"
        >
          <div className="custom-modal-root">
            <div className="custom-modal-header">
              <div className="custom-modal-title text-center">
                도전 결과
              </div>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-content">
                <div className="text-center">
                  { isSuccess ? `등록에 성공하였습니다!` : `등록에 실패했습니다. 더 좋은 아이템을 만들어보세요!` }
                </div>
              </div>
              <div className="custom-modal-button-container">
                <button
                  className="custom-modal-button custom-modal-ok-button"
                  onClick={okButtonClickedHandler}
                >
                  예
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default RecordChallengeResultModal;