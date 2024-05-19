package site.gongnomok.management.service;


import org.springframework.data.domain.Pageable;
import site.gongnomok.management.dto.request.CommentIdList;
import site.gongnomok.management.dto.request.CommentReportIdList;
import site.gongnomok.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.management.dto.response.ReportCommentResponse;

/**
 * 1. pageable을 이용해서 댓글을 조회해오는 기능
 * 2. 특정 댓글을 삭제하는 기능
 * 3. 댓글을 신고 리스트에서 삭제하는 기능, 실제 댓글의 삭제는 이루어지지 않음.
 */
public interface ManagementService {

    /**
     * 신고된 댓글 목록을 조회한다.
     * @param pageable 조회할 페이징 정보
     * @return 조회된 신고댓글목록
     */
    public ReportCommentResponse reportCommentList(Pageable pageable);

    /**
     * 리스트로 전달받은 댓글 ID에 해당하는 댓글을 삭제한다.
     * @param commentIdList 삭제한 댓글의 ID를 담은 일급 컬렉션
     * @return 댓글 삭제결과 인스턴스
     */
    public ReportCommentDeleteResponse deleteReportComment(CommentIdList commentIdList);

    /**
     * 리스트로 전달받은 댓글 ID에 해당하는 댓글을 신고리스트에서 삭제한다. 실제 댓글의 삭제가 이루어지지는 않는다.
     * @param reportIdList  삭제할 신고 댓글의 신고 ID
     * @return 댓글 삭제결과 인스턴스
     */
    public ReportCommentDeleteResponse deleteReportCommentFromList(CommentReportIdList reportIdList);

    /**
     * @param commentId 삭제할 댓글 ID
     * @return 삭제된 댓글의 ID
     */
    public Long deleteReportComment(Long commentId);

    /**
     * @param commentId 신고리스트에서 삭제할 댓글 신고ID
     * @return 리스트에서 삭제한 댓글 ID
     */
    public Long deleteReportCommentFromList(Long reportId);

}
