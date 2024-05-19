package site.gongnomok.management.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.management.domain.ReportComment;

import java.util.List;
import java.util.Optional;

public interface ReportCommentJpaRepository extends JpaRepository<ReportComment, Long>, ReportCommentQueryRepository {

    public Optional<ReportComment> findReportCommentByCommentId(Long comment_id);

    void deleteByIdIn(List<Long> ids);
}
