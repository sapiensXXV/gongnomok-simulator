export default function Comment() {
  return (
    <>
      <section className="comment-container bg-light mx-3 mb-3 px-3 py-3">
        <span className="comment-area-title" >댓글(???)</span>
        <div className="comment-content-root">
          <textarea 
            className="comment-content-area"
            placeholder="내용을 입력하세요. (최대 200자)"
            spellCheck="false"
          />

          <div className="comment-user-info-input">
            <div className="comment-user-info">
              <input
                type="text"
                placeholder="닉네임"
              />
              <input
                type="password"
                placeholder="비밀번호"
              />
            </div>
            <button>작성하기</button>
          </div>
        </div>
      </section>
    </>
  )
}