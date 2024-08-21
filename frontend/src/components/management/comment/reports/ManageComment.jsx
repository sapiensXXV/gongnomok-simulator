import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../../../../global/uri";
import {isoDateToFormatStringOnlyDate} from "../../../../global/date";
import axiosInstance from "../../../../global/axiosInstance.js";

function ManageComment() {

  const [comments, setComments] = useState([]);
  const checkedList = useRef([]);

  useEffect(() => {
    axiosInstance
      .get(`${BASE_URL}/api/manage/report-comments`)
      .then((response) => {

        setComments(response.data.reports.comments);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  function handleCommentDeleteClicked() {
    console.log('handleCommentDeleteClicked')
    const ids = []
    checkedList.current.forEach((elem) => {
      ids.push(elem.commentId);
    })
    axiosInstance
      .delete(`${BASE_URL}/api/manage/report-comments`,
        {
          data: {
            comments: {
              ids: ids
            }
          }
        }
      )
      .then((response) => {
        const copy = [...comments]
        const result = []
        copy.forEach((comment) => {
          const id = comment.commentId;
          if (!ids.includes(id)) {
            result.push(comment);
          }
        })
        setComments(result);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleReportDeleteClicked() {
    console.log('handleReportDeleteClicked')
    const ids = []
    checkedList.current.forEach((elem) => {
      ids.push(elem.reportId);
    })

    axiosInstance
      .delete(
        `${BASE_URL}/api/manage/report-comments/list`,
        {
          data: {
            reports: {
              ids: ids
            }
          }
        }
      )
      .then((response) => {
        const copy = [...comments]
        const result = []
        copy.forEach((comment) => {
          const id = comment.reportId;
          if (!ids.includes(id)) {
            result.push(comment);
          }
        })
        setComments(result);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function commentCheckboxChanged(checked, commentId, reportId) {

    if (checked) {
      const info = {
        commentId: commentId,
        reportId: reportId
      }

      checkedList.current = [...checkedList.current, info]
    } else {
      checkedList.current = checkedList.current.filter((elem) => {
        return elem.reportId != reportId
      })
      console.log(checkedList.current);
    }
  }

  return (
    <>
      <main className="py-3 px-3">
        <h3 className="text-center">신고댓글 관리</h3>
        {/* 댓글 컨트롤 버튼 */}
        <section>
          <div className="my-2">
            <div>
              <button type="button" className="btn btn-danger btn-sm me-2" onClick={handleCommentDeleteClicked}>댓글 삭제
              </button>
              <button type="button" className="btn btn-success btn-sm" onClick={handleReportDeleteClicked}>신고 삭제
              </button>
            </div>
          </div>

        </section>
        {/* 신고댓글 정보 */}
        <section className="table-responsive">
          <table className="table table-striped">
            <thead className="table-light">
            <tr>
              <th className="text-center text-nowrap">선택</th>
              <th className="text-nowrap text-center">신고ID</th>
              <th className="text-nowrap text-center">댓글ID</th>
              <th className="text-nowrap">이름</th>
              <th className="text-nowrap">내용</th>
              <th className="text-nowrap">작성일</th>
              <th className="text-nowrap text-center">신고횟수</th>
            </tr>
            </thead>

            <tbody>

            {
              comments?.map((comment) => {
                return (
                  <tr key={`${comment.reportId}_${comment.commentId}`}>
                    <td className="text-center text-nowrap">
                      <input className="form-check-input checkbox-lg" type="checkbox" aria-label="..."
                             defaultChecked={false}
                             onChange={(e) => commentCheckboxChanged(e.target.checked, comment.commentId, comment.reportId)}
                      />
                    </td>
                    <td className="text-nowrap text-center">{comment.reportId}</td>
                    <td className="text-nowrap text-center">{comment.commentId}</td>
                    <td className="text-nowrap">{comment.name}</td>
                    <td>{comment.content}</td>
                    <td className="text-nowrap">{isoDateToFormatStringOnlyDate(comment.createdDate)}</td>
                    <td className="text-nowrap text-center text-danger"><b>{comment.count}</b></td>

                  </tr>
                )
              })
            }

            </tbody>
          </table>

        </section>
      </main>
    </>
  )
}

export default ManageComment;