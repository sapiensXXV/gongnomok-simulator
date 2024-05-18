package site.gongnomok.management.domain.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.management.domain.ReportComment;
import site.gongnomok.management.dto.response.ReportCommentDto;

import java.util.List;

public interface ReportCommentJpaRepository extends JpaRepository<ReportComment, Long>, ReportCommentQueryRepository {

    public List<ReportCommentDto> findReportList(Pageable pageable);
}
