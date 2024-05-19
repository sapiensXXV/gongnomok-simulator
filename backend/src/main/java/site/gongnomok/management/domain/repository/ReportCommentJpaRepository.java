package site.gongnomok.management.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.management.domain.ReportComment;

public interface ReportCommentJpaRepository extends JpaRepository<ReportComment, Long>, ReportCommentQueryRepository {


}
