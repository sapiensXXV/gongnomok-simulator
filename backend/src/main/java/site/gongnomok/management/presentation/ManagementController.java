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
import site.gongnomok.comment.service.CommentService;
import site.gongnomok.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.management.dto.response.ReportCommentResponse;

import java.awt.print.Pageable;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ManagementController {

    private final CommentService commentService;

    @GetMapping("/manage/report-comments")
    @AdminOnly
    public ResponseEntity<ReportCommentResponse> reportCommentList(
        @AdminAuth Accessor accessor,
        final Pageable pageable
    ) {
        return null;
    }

    @DeleteMapping("/manage/report-comments")
    @AdminOnly
    public ResponseEntity<ReportCommentDeleteResponse> deleteReportComment() {
        return ResponseEntity.ok(ReportCommentDeleteResponse.comment());
    }

    @DeleteMapping("/manage/report-comments/list")
    @AdminOnly
    public ResponseEntity<ReportCommentDeleteResponse> deleteReportCommentFromList() {
        return ResponseEntity.ok(ReportCommentDeleteResponse.fromList());
    }
}
