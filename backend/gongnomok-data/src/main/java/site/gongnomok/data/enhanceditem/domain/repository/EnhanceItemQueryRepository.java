package site.gongnomok.data.enhanceditem.domain.repository;

import site.gongnomok.common.management.dto.record.request.RecordReplaceRequest;
import site.gongnomok.data.management.record.domain.EnhanceRecord;

public interface EnhanceItemQueryRepository {
    
    public void replaceEnhanceItem(RecordReplaceRequest request);

    public void replaceEnhanceItem(EnhanceRecord record, Long itemId);
    
}
