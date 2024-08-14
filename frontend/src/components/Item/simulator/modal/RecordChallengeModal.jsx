function RecordChallengeModal({
  isOpen,
  name,
  nameInputChangeHandler,
  isNameInputEmpty,
  acceptButtonClickedHandler,
  cancelButtonClickedHandler
  
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
              <div className="custom-modal-title text-center">기록 도전</div>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-content">
                <div className="custom-modal-dialog">
                  <article className="custom-modal-menu-title">이름<span className="primary-red"> (※ 부적절한 이름 입력 시 삭제처리 됩니다.)</span></article>
                  <article className="custom-modal-menu-title"><span className="primary-red">이름은 10자 이내로 입력해주세요.</span></article>
                  <input
                    className="custom-modal-input-element"
                    type="text"
                    placeholder="이름을 입력하세요."
                    // defaultValue=""
                    value={name}
                    onChange={nameInputChangeHandler}
                  ></input>
                  {
                    isNameInputEmpty &&
                    <span className="red">이름을 입력해주세요</span>
                  }
                </div>
              </div>
              <div className="custom-modal-button-container">
                <button
                  className="custom-modal-button custom-modal-ok-button"
                  onClick={acceptButtonClickedHandler}
                >
                  예
                </button>
                <button
                  className="custom-modal-button custom-modal-cancel-button"
                  onClick={cancelButtonClickedHandler}
                >
                  아니오
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default RecordChallengeModal;