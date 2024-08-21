package site.gongnomok.data.management.record.repository;

import site.gongnomok.data.management.record.dto.response.RecordResponse;

import java.util.List;

public interface RecordLogQueryRepository {

    public List<RecordResponse> readRecords(Long startId, Long size, String itemName);
    
}
