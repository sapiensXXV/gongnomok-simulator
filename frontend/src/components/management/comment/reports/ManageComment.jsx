import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../../../global/uri";
import { isoDateToFormatStringOnlyDate } from "../../../../global/date";

function ManageComment() {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log('신고댓글 관리 페이지 진입')
    axios
      .get(`${BASE_URI}/api/manage/report-comments`)
      .then((response) => {
        console.log(response.data.reports.comments)
        setComments(response.data.reports.comments);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <main className="py-3 px-3">
        <h3 className="text-center">신고댓글 관리</h3>
        {/* 댓글 컨트롤 버튼 */}
        <section>
          <span>버튼이 위치하는 장소</span>
        </section>
        {/* 신고댓글 정보 */}
        <section>
          <table className="table table-striped">
            <thead className="table-light">
              <tr >
                <th className="text-center">선택</th>
                <th>신고ID</th>
                <th>댓글ID</th>
                <th>이름</th>
                <th>내용</th>
                <th>작성일</th>
                <th>신고횟수</th>
              </tr>
            </thead>

            <tbody>

              {
                comments?.map((comment) => {
                  return (
                    <tr key={`${comment.reportId}_${comment.commentId}`}>
                      <td className="text-center">
                        <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                      </td>
                      <td>{comment.reportId}</td>
                      <td>{comment.commentId}</td>
                      <td>{comment.name}</td>
                      <td>{comment.content}</td>
                      <td>{isoDateToFormatStringOnlyDate(comment.createdDate)}</td>
                      <td>{comment.count}</td>

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