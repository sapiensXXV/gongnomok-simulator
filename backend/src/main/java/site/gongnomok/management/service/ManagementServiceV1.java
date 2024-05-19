package site.gongnomok.management.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.comment.domain.repository.CommentJpaRepository;
import site.gongnomok.management.domain.repository.ReportCommentJpaRepository;
import site.gongnomok.management.dto.request.CommentIdList;
import site.gongnomok.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.management.dto.response.ReportCommentDto;
import site.gongnomok.management.dto.response.ReportCommentList;
import site.gongnomok.management.dto.response.ReportCommentResponse;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ManagementServiceV1 implements ManagementService {

    private final CommentJpaRepository commentJpaRepository;
    private final ReportCommentJpaRepository reportCommentJpaRepository;

    @Override
    public ReportCommentResponse reportCommentList(Pageable pageable) {
        List<ReportCommentDto> reportList = reportCommentJpaRepository.findReportListRecentDesc(pageable);
        ReportCommentList reportCommentList = ReportCommentList.of(reportList);
        return ReportCommentResponse.of(reportCommentList);
    }

    @Override
    @Transactional(readOnly = false)
    public ReportCommentDeleteResponse deleteReportComment(CommentIdList commentIdList) {
        List<Long> idList = commentIdList.getIds();
        commentJpaRepository.deleteByIdIn(idList);

        return ReportCommentDeleteResponse.comment();
    }

    @Override
    @Transactional(readOnly = false)
    public ReportCommentDeleteResponse deleteReportCommentFromList(CommentIdList reportIdList) {
        return null;
    }

    @Override
    @Transactional(readOnly = false)
    public Long deleteReportComment(Long commentId) {
        commentJpaRepository.deleteById(commentId);
        return commentId;
    }

    @Override
    @Transactional(readOnly = false)
    public Long deleteReportCommentFromList(Long reportId) {
        reportCommentJpaRepository.deleteById(reportId);
        return 0L;
    }
}
