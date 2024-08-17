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
import site.gongnomok.core.banword.BanWordService;
import site.gongnomok.core.banword.BaseBanWordService;
import site.gongnomok.core.management.ManagementService;
import site.gongnomok.core.management.log.RecordLogService;

import java.net.URI;

/**
 * 관리자 기능을 위한 REST API 컨트롤러입니다.
 * 이 컨트롤러는 신고된 댓글 관리와 금칙어 관리 기능을 제공합니다.
 * 모든 엔드포인트는 "/api" 경로 아래에 매핑되어 있습니다.
 *
 * <p>주요 기능:</p>
 * <ul>
 *   <li>신고된 댓글 목록 조회</li>
 *   <li>신고된 댓글 삭제</li>
 *   <li>신고 목록에서 댓글 제거</li>
 *   <li>금칙어 목록 조회</li>
 *   <li>금칙어 추가</li>
 *   <li>금칙어 삭제</li>
 * </ul>
 *
 * <p>이 컨트롤러의 대부분의 메서드는 {@code @AdminOnly} 어노테이션이 적용되어 있어,
 * 관리자 권한이 필요합니다.</p>
 *
 * @see ManagementService
 * @see BaseBanWordService
 *
 * @author Jaehoon So
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ManagementController {

    private final ManagementService managementService;
    private final RecordLogService recordLogService;
    private final BanWordService banWordService;

    /**
     * 신고된 댓글 목록을 페이징하여 조회합니다.
     *
     * @param accessor 관리자 인증 정보
     * @param pageable 페이징 정보
     * @return 신고된 댓글 목록과 페이징 정보를 포함한 ResponseEntity
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
     * 신고된 댓글을 삭제합니다.
     *
     * @param accessor 관리자 인증 정보
     * @param request 삭제할 댓글 정보를 포함한 요청 객체
     * @return 댓글 삭제 결과를 포함한 ResponseEntity
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
     * 신고된 댓글을 신고 목록에서 제거합니다. 실제 댓글은 삭제되지 않습니다.
     *
     * @param accessor 관리자 인증 정보
     * @param request 목록에서 제거할 신고 정보를 포함한 요청 객체
     * @return 신고 목록에서의 제거 결과를 포함한 ResponseEntity
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

    /**
     * 금칙어 목록을 페이징하여 조회합니다.
     *
     * @param accessor 관리자 인증 정보
     * @param pageable 페이징 정보
     * @return 금칙어 목록과 페이징 정보를 포함한 ResponseEntity
     */
    @GetMapping("/manage/banword")
    @AdminOnly
    public ResponseEntity<PaginatedBanWordResponse> banwordList(
        @AdminAuth Accessor accessor,
        final Pageable pageable
    ) {
        PaginatedBanWordResponse result = banWordService.fetchBanWordList(pageable);
        return ResponseEntity.ok(result);
    }

    /**
     * 새로운 금칙어를 추가합니다.
     *
     * @param accessor 관리자 인증 정보
     * @param request 추가할 금칙어 정보를 포함한 요청 객체
     * @return 생성된 금칙어의 URI를 포함한 ResponseEntity
     */
    @PostMapping("/manage/banword")
    @AdminOnly
    public ResponseEntity<Void> addBanWord(
        @AdminAuth Accessor accessor,
        @RequestBody final BanWordAddRequest request
    ) {
        Long createdId = banWordService.addBanWord(request.getWord());
        return ResponseEntity
            .created(URI.create("/manage/banword/" + createdId))
            .build();
    }

    /**
     * 지정된 ID의 금칙어를 삭제합니다.
     *
     * @param accessor 관리자 인증 정보
     * @param id 삭제할 금칙어의 ID
     * @return 삭제 결과를 나타내는 ResponseEntity
     */
    @DeleteMapping("/manage/banword/{word_id}")
    @AdminOnly
    public ResponseEntity<Void> deleteBanWord(
        @AdminAuth Accessor accessor,
        @RequestParam("word_id") Long id
    ) {
        banWordService.deleteBanWord(id);
        return ResponseEntity
            .noContent()
            .build();
    }
    
    /* 강화 기록관리 API */
    
    @GetMapping("/manage/record/logs")
    @AdminOnly
    public ResponseEntity<Void> itemRecords(
        final Accessor accessor
    ) {
        return null;
    }
    
    @PatchMapping("/manage/record/logs")
    @AdminOnly
    public ResponseEntity<Void> replaceRecords(
        final Accessor accessor
    ) {
        return null;
    }
    
    @PostMapping("/manage/record/refresh")
    @AdminOnly
    public ResponseEntity<Void> restoreRecordsWithLog(
        final Accessor accessor
    ) {
        return null;
    }


}
