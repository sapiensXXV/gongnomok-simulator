package site.gongnomok.api.management;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.common.banword.dto.request.BanWordAddRequest;
import site.gongnomok.common.banword.dto.response.PaginatedBanWordResponse;
import site.gongnomok.common.management.dto.request.comment.CommentDeleteRequest;
import site.gongnomok.common.management.dto.request.comment.CommentReportListDeleteRequest;
import site.gongnomok.common.management.dto.response.comment.ReportCommentDeleteResponse;
import site.gongnomok.common.management.dto.response.comment.ReportCommentResponse;
import site.gongnomok.core.auth.AdminAuth;
import site.gongnomok.core.auth.AdminOnly;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.management.ManagementService;

import java.net.URI;


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

    // 금칙어 관리

    @GetMapping("/manage/banword")
    public ResponseEntity<PaginatedBanWordResponse> banwordList(
        @AdminAuth Accessor accessor,
        final Pageable pageable
    ) {


        return ResponseEntity.ok(null);
    }

    @PostMapping("/manage/banword")
    public ResponseEntity<Void> addBanWord(
        @AdminAuth Accessor accessor,
        final BanWordAddRequest request
    ) {
        Long id = 0L;

        return ResponseEntity
            .created(URI.create("/manage/banword/" + id))
            .build();
    }
    

}
