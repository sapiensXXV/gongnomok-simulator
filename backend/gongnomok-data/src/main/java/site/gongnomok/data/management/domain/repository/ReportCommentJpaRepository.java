package site.gongnomok.data.management.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import site.gongnomok.data.management.domain.ReportComment;

import java.util.List;
import java.util.Optional;

public interface ReportCommentJpaRepository extends JpaRepository<ReportComment, Long>, ReportCommentQueryRepository {

    public Optional<ReportComment> findReportCommentByCommentId(Long comment_id);

    @Modifying(clearAutomatically = true)
    @Query("delete from ReportComment rc where rc.id in :ids")
    void deleteAllByReportId(List<Long> ids);
}
