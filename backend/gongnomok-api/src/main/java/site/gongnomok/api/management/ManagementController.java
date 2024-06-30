package site.gongnomok.api.management;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.common.management.dto.request.CommentDeleteRequest;
import site.gongnomok.common.management.dto.request.CommentReportListDeleteRequest;
import site.gongnomok.common.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.common.management.dto.response.ReportCommentResponse;
import site.gongnomok.core.auth.AdminAuth;
import site.gongnomok.core.auth.AdminOnly;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.management.ManagementService;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ManagementController {

    private final ManagementService managementService;

    /**
     * 신고된 댓글 리스트 요청
     */
    @GetMapping("/manage/report-comments")
    @AdminOnly
    public ResponseEntity<ReportCommentResponse> reportCommentList(
        @AdminAuth Accessor accessor,
        final Pageable pageable
    ) {
        ReportCommentResponse result = managementService.reportCommentList(pageable);
        return ResponseEntity.ok(result);
    }

    /**
     * 신고된 댓글 삭제 요청
     */
    @DeleteMapping("/manage/report-comments")
    @AdminOnly
    public ResponseEntity<ReportCommentDeleteResponse> deleteReportComment(
        @AdminAuth Accessor accessor,
        @RequestBody final CommentDeleteRequest request
    ) {
        managementService.deleteReportComment(request.getComments());
        return ResponseEntity.ok(ReportCommentDeleteResponse.comment());
    }

    /**
     * 신고된 댓글을 리스트에서 제거 요청
     */
    @DeleteMapping("/manage/report-comments/list")
    @AdminOnly
    public ResponseEntity<ReportCommentDeleteResponse> deleteReportCommentFromList(
        @AdminAuth Accessor accessor,
        @RequestBody final CommentReportListDeleteRequest request
    ) {
        managementService.deleteReportCommentFromList(request.getReports());
        return ResponseEntity.ok(ReportCommentDeleteResponse.fromList());
    }

}
