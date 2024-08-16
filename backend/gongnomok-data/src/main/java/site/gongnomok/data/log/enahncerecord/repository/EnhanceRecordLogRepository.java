package site.gongnomok.data.log.enahncerecord.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.gongnomok.data.log.enahncerecord.domain.EnhanceRecord;

@Repository
public interface EnhanceRecordLogRepository extends JpaRepository<EnhanceRecord, Long> {
}
