package site.gongnomok.core.management;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.common.management.dto.request.CommentIdList;
import site.gongnomok.common.management.dto.request.CommentReportIdList;
import site.gongnomok.common.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.common.management.dto.response.ReportCommentDto;
import site.gongnomok.common.management.dto.response.ReportCommentList;
import site.gongnomok.common.management.dto.response.ReportCommentResponse;
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
    public ReportCommentDeleteResponse deleteReportComment(CommentIdList commentIdList) {
        List<Long> idList = commentIdList.getIds();
        commentJpaRepository.deleteByIdIn(idList);

        return ReportCommentDeleteResponse.comment();
    }

    @Override
    public ReportCommentDeleteResponse deleteReportCommentFromList(CommentReportIdList reportIdList) {
        reportCommentJpaRepository.deleteByIdIn(reportIdList.getIds());
        return ReportCommentDeleteResponse.fromList();
    }

    @Override
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
