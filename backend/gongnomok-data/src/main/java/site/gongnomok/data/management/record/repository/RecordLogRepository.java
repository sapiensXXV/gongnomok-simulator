package site.gongnomok.data.management.record.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.gongnomok.data.management.record.domain.EnhanceRecord;

@Repository
public interface RecordLogRepository extends JpaRepository<EnhanceRecord, Long>, RecordLogQueryRepository {
}
