package site.gongnomok.management.presentation;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.gongnomok.auth.AdminAuth;
import site.gongnomok.auth.AdminOnly;
import site.gongnomok.auth.domain.Accessor;
import site.gongnomok.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.management.dto.response.ReportCommentResponse;
import site.gongnomok.management.service.ManagementService;

import java.awt.print.Pageable;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
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
        return null;
    }

    /**
     * 신고된 댓글 삭제 요청
     */
    @DeleteMapping("/manage/report-comments")
    @AdminOnly
    public ResponseEntity<ReportCommentDeleteResponse> deleteReportComment(
        @AdminAuth Accessor accessor
    ) {
        return ResponseEntity.ok(ReportCommentDeleteResponse.comment());
    }

    /**
     * 신고된 댓글을 리스트에서 제거 요청
     */
    @DeleteMapping("/manage/report-comments/list")
    @AdminOnly
    public ResponseEntity<ReportCommentDeleteResponse> deleteReportCommentFromList(
        @AdminAuth Accessor accessor
    ) {

        return ResponseEntity.ok(ReportCommentDeleteResponse.fromList());
    }

}
