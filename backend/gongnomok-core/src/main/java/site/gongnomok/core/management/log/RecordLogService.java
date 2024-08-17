package site.gongnomok.core.management.log;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;
import site.gongnomok.data.item.domain.Item;
import site.gongnomok.data.log.enahncerecord.domain.EnhanceRecord;
import site.gongnomok.data.log.enahncerecord.repository.RecordLogRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class RecordLogService {
    
    private final RecordLogRepository logRepository; 
    private final RecordEntityConverter entityConverter;
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Async
    public void logEnhanceItem(Item item, EnhancedItem enhancedItem) {
        EnhanceRecord record = EnhanceRecord.builder()
            .item(item)
            .challengerName(enhancedItem.getName())
            .tries(enhancedItem.getTries())
            .score(enhancedItem.getScore())
            .iev(enhancedItem.getIev())
            .scroll(enhancedItem.getScroll().name())
            .success(entityConverter.fromEntitySuccess(enhancedItem.getSuccess()))
            .status(entityConverter.fromEntityStatus(enhancedItem.getStatus()))
            .build();

        logRepository.save(record);
    }
    
}
