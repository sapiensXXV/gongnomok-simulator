package site.gongnomok.management.domain.repository;

import org.springframework.data.domain.Pageable;
import site.gongnomok.management.dto.response.ReportCommentDto;

import java.util.List;

public interface ReportCommentQueryRepository {

    /**
     * @param pageable 페이징 정보
     * @return 최근에 생성된 순으로 신고댓글 정보를 담은 리스트
     */
    public List<ReportCommentDto> findReportListRecentDesc(Pageable pageable);

    /**
     * @param pageable 페이징 정보
     * @return 많이 신고된 순으로 신고댓글 정보를 담은 리스트
     */
    public List<ReportCommentDto> findReportListCountDesc(Pageable pageable);

}
