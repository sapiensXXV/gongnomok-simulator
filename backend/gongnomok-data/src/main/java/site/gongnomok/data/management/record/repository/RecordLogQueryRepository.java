package site.gongnomok.data.management.record.repository;

import org.springframework.data.jpa.repository.Modifying;
import site.gongnomok.data.management.record.dto.response.RecordResponse;

import java.util.List;

public interface RecordLogQueryRepository {

    @Modifying
    public List<RecordResponse> readRecords(Long startId, Long size, String itemName);
    
}
