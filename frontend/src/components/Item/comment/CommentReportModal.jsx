function CommentReportModal({
  isOpen,
  okBtnHandler,
  cancelBtnHandler
}) {
  return (
    <>
      {
        isOpen &&
        <section className="custom-modal-container">
          <div className="custom-modal-root">
            <div className="custom-modal-header">
              <div className="custom-modal-title text-center">댓글 신고</div>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-content">
                <div className="custom-modal-dialog text-center">
                  <article className="custom-modal-menu-title text-center">댓글을 신고하시겠습니까?</article>
                </div>
              </div>
              <div className="custom-modal-button-container">
                  <button
                    className="custom-modal-button custom-modal-ok-button"
                    onClick={okBtnHandler}
                  >
                    확인
                  </button>
                  <button
                    className="custom-modal-button custom-modal-cancel-button"
                    onClick={cancelBtnHandler}
                  >
                    취소
                  </button>
                </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default CommentReportModal;