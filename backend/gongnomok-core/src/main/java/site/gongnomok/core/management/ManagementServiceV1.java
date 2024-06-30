package site.gongnomok.core.management;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.common.management.dto.request.comment.CommentIdList;
import site.gongnomok.common.management.dto.request.comment.CommentReportIdList;
import site.gongnomok.common.management.dto.response.comment.ReportCommentDeleteResponse;
import site.gongnomok.common.management.dto.response.comment.ReportCommentDto;
import site.gongnomok.common.management.dto.response.comment.ReportCommentList;
import site.gongnomok.common.management.dto.response.comment.ReportCommentResponse;
import site.gongnomok.data.comment.domain.repository.CommentJpaRepository;
import site.gongnomok.data.management.domain.repository.ReportCommentJpaRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ManagementServiceV1 implements ManagementService {

    private final CommentJpaRepository commentJpaRepository;
    private final ReportCommentJpaRepository reportCommentJpaRepository;

    @Override
    @Transactional
    public ReportCommentResponse reportCommentList(Pageable pageable) {
        List<ReportCommentDto> reportList = reportCommentJpaRepository.findReportListRecentDesc(pageable);
        ReportCommentList reportCommentList = ReportCommentList.of(reportList);
        return ReportCommentResponse.of(reportCommentList);
    }

    @Override
    @Transactional
    public ReportCommentDeleteResponse deleteReportComment(CommentIdList commentIdList) {
        List<Long> idList = commentIdList.getIds();
        commentJpaRepository.deleteByIdIn(idList);

        return ReportCommentDeleteResponse.comment();
    }

    @Override
    @Transactional
    public ReportCommentDeleteResponse deleteReportCommentFromList(CommentReportIdList reportIdList) {
        reportCommentJpaRepository.deleteAllByReportId(reportIdList.getIds());
        return ReportCommentDeleteResponse.fromList();
    }

    @Override
    @Transactional
    public Long deleteReportComment(Long commentId) {
        commentJpaRepository.deleteById(commentId);
        return commentId;
    }

    @Override
    public Long deleteReportCommentFromList(Long reportId) {
        reportCommentJpaRepository.deleteById(reportId);
        return 0L;
    }
}
