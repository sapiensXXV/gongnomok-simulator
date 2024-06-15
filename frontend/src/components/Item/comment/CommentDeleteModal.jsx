function CommentDeleteModal({
  isOpen,
  passwordInputHandler,
  okBtnHandler,
  cancelBtnHandler,
  isDeleteRequestValid,
  errorMsg,
  deleteForm
}) {
  return (
    <>
      {
        isOpen &&
        <section className="custom-modal-container">
          <div className="custom-modal-root">
            <div className="custom-modal-header">
              <div className="custom-modal-title">댓글 삭제하기</div>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-content">
                <div className="custom-modal-dialog">
                  <article className="custom-modal-menu-title">비밀번호</article>
                  <input
                    className="custom-modal-input-element"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    defaultValue=""
                    value={deleteForm.password}
                    onChange={passwordInputHandler}
                  />
                  { 
                    !isDeleteRequestValid &&
                    <span className="red">{errorMsg}</span>
                  }
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

export default CommentDeleteModal;