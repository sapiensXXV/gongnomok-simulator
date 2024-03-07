import { useRef, useState } from "react"
import { DEFAULT_COMMENT_FETCH_SIZE, INIT_COMMENT_FORM } from "../../../global/comment";
import axios from "axios";
import { BASE_URI } from "../../../global/uri";
import SingleComment from "./SingleComment";

export default function Comment({ itemId }) {

  const [commentList, setCommentList] = useState([]);

  const [commentForm, setCommentForm] = useState(INIT_COMMENT_FORM);
  const [isContentValid, setIsContentValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const lastLookUpCommentId = useRef(-1); // 마지막으로 조회한 댓글 ID
  const hasMoreComment = useRef(true);

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  function fetchComment() {

    if (!hasMoreComment) return;
    console.log('출력됨')
    axios
      .get(
        `${BASE_URI}/api/item/${itemId}/comment?lastId=${lastLookUpCommentId.current}&size=${DEFAULT_COMMENT_FETCH_SIZE}`, 
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        const newComments = res.data
        const newCommentList = [...commentList, ...newComments];
        setCommentList(newCommentList)
        
        if (newCommentList.length > 0) {
          lastLookUpCommentId.current = newCommentList[newComments.length - 1].commentId;
        }
        
        if (newComments.length < DEFAULT_COMMENT_FETCH_SIZE) hasMoreComment.current = false;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function validateContent() {
    if (commentForm.content.length == 0 || commentForm.content.length > 200) {
      setIsContentValid(false);
      return false;
    }
    setIsContentValid(true);
    return true;
  }

  function validateName() {
    if (commentForm.name.length == 0) {
      setIsNameValid(false);
      return false;
    }
    setIsNameValid(true);
    return true;
  }

  function validatePassword() {
    if (commentForm.password.length == 0) {
      setIsPasswordValid(false);
      return false;
    }
    setIsPasswordValid(true);
    return true;
  }

  function validateForm() {

    const isContentValid = validateContent()
    const isNameValid = validateName();
    const isPasswordValid = validatePassword();

    if (!isContentValid || !isNameValid || !isPasswordValid) {
      return false;
    }

    return true;
  }

  function submitCommentForm(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    //댓글 제출
    axios
      .post(`${BASE_URI}/api/item/${itemId}/comment`, commentForm, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      })

    const copy = { ...commentForm };
    copy.content = "";
    setCommentForm(copy);

    //제출 시 댓글정보를 다시 로드하는 작업도 필요
  }

  function handleChangeContent(e) {
    const copy = { ...commentForm };
    copy.content = e.target.value;
    setCommentForm(copy)
  }

  function handleChangeName(e) {
    const copy = { ...commentForm };
    copy.name = e.target.value;
    setCommentForm(copy)
  }

  function handleChangePassword(e) {
    const copy = { ...commentForm }
    copy.password = e.target.value;
    setCommentForm(copy);
  }

  function handleReport() {
    console.log('신고버튼 클릭')
  }

  function handleDelete() {
    // 모달창을 띄우고 패스워드를 입력받는다.
    console.log('삭제버튼 클릭')
    setModalOpen(true);
  }

  function handleModalBackgroundClicked(e) {
    if (e.target === modalBackground.current) {
      setModalOpen(false);
    }
  }

  function handleModalCloseButtonClicked(e) {
    setModalOpen(false);
  }

  return (
    <>
      <section className="comment-container bg-light mx-3 mb-3 px-3 py-3">
        <span className="comment-area-title" >댓글(???)</span>
        <div className="comment-content-root">
          <form onSubmit={submitCommentForm}>
            <textarea
              className="comment-content-area"
              placeholder="내용을 입력하세요. (최대 200자)"
              spellCheck="false"
              defaultValue={commentForm.content}
              value={commentForm.content}
              onChange={handleChangeContent}
            />
            <div className="comment-user-info-input">
              <div className="comment-user-info">
                <input
                  type="text"
                  placeholder="닉네임"
                  defaultValue={commentForm.name}
                  value={commentForm.name}
                  onChange={handleChangeName}
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  defaultValue={commentForm.password}
                  value={commentForm.password}
                  onChange={handleChangePassword}
                />
              </div>
              <button type="submit">작성하기</button>
            </div>
          </form>
        </div>
        <div className="comment-error-container">
          {!isNameValid && <div><span className="red">이름을 입력해주세요.</span></div>}
          {!isPasswordValid && <div><span className="red">패스워드를 입력해주세요.</span></div>}
          {!isContentValid && <div><span className="red">댓글은 1~200자를 입력해야합니다.</span></div>}
        </div>
        <section className="single-comment-container mt-2">
          {
            commentList.map((comment) => {
              return (
                <SingleComment 
                  key={`comment_${itemId}_${comment.commentId}`} 
                  info={comment}
                  handleReport={handleReport}
                  handleDelete={handleDelete}
                />
              )
            })
          }
        </section>

      </section>

      <button onClick={fetchComment}>댓글 가져오기</button>
      {
        modalOpen &&
        <div 
          className="delete-modal-container"
          ref={modalBackground}
          onClick={handleModalBackgroundClicked}
        >
          <div className="delete-modal-root">
            <div className="delete-modal-header">
              <div className="delete-modal-title">댓글 삭제하기</div>
            </div>
            <div className="delete-modal-body">
              <div className="delete-modal-content">
                <div className="delete-modal-dialog">
                  <article className="modal-title">비밀번호</article>
                  <input 
                    className="modal-input" 
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                  ></input>
                </div>
              </div>
              <div className="delete-modal-button-container">
                <button className="delete-modal-button delete-modal-delete-button">
                  확인
                </button>
                <button className="delete-modal-button delete-modal-cancel-button">
                  취소
                </button>
              </div>
            </div>
          </div>
          
          
        </div>
      }
    </>
  )
}