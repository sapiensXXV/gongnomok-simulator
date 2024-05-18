package site.gongnomok.management.service;


import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.gongnomok.management.dto.request.CommentIdList;
import site.gongnomok.management.dto.response.ReportCommentDeleteResponse;
import site.gongnomok.management.dto.response.ReportCommentResponse;

@Service
public class ManagementServiceV1 implements ManagementService {

    @Override
    public ReportCommentResponse reportCommentList(Pageable pageable) {
        return null;
    }

    @Override
    public ReportCommentDeleteResponse deleteReportComment(CommentIdList commentIdList) {
        return null;
    }

    @Override
    public ReportCommentDeleteResponse deleteReportCommentFromList(CommentIdList commentIdList) {
        return null;
    }

    @Override
    public Long deleteReportComment(Long commentId) {
        return 0L;
    }

    @Override
    public Long deleteReportCommentFromList(Long commentId) {
        return 0L;
    }
}
