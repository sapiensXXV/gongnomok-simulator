package site.gongnomok.data.management.record.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.gongnomok.data.management.record.domain.EnhanceRecord;

import java.util.Optional;

@Repository
public interface RecordLogRepository extends JpaRepository<EnhanceRecord, Long>, RecordLogQueryRepository {

    @Modifying(clearAutomatically = true)
    @Query("delete from EnhanceRecord er where er.challengerName = :name")
    public void deleteByName(String name);

    @Query("select er1 from EnhanceRecord er1 where er1.score = (select max(er2.score) from EnhanceRecord er2 where er2.item.id = :itemId) order by er1.id desc limit 1")
    public Optional<EnhanceRecord> findBestRecordOf(Long itemId);
}
