package site.gongnomok.data.enhanceditem.domain.repository;

import site.gongnomok.common.management.dto.record.request.RecordReplaceRequest;

public interface EnhanceItemQueryRepository {
    
    public void replaceEnhanceItem(RecordReplaceRequest request);
    
}
