package site.gongnomok.core.management.log;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;
import site.gongnomok.data.enhanceditem.domain.repository.EnhancedItemRepository;
import site.gongnomok.data.item.domain.Item;
import site.gongnomok.data.item.domain.repository.ItemRepository;
import site.gongnomok.data.management.record.domain.EnhanceRecord;
import site.gongnomok.data.management.record.dto.response.RecordResponse;
import site.gongnomok.data.management.record.repository.RecordLogRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecordLogService {
    
    private final RecordEntityConverter entityConverter;
    private final ItemRepository itemRepository;
    private final RecordLogRepository recordLogRepository; 
    private final EnhancedItemRepository enhancedItemRepository;
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @Async
    public void logEnhanceItem(
        final Item item, 
        final EnhancedItem enhancedItem, 
        final String address
    ) {
        EnhanceRecord record = EnhanceRecord.builder()
            .item(item)
            .challengerName(enhancedItem.getName())
            .tries(enhancedItem.getTries())
            .score(enhancedItem.getScore())
            .iev(enhancedItem.getIev())
            .scroll(enhancedItem.getScroll().name())
            .success(entityConverter.fromEntitySuccess(enhancedItem.getSuccess()))
            .status(entityConverter.fromEntityStatus(enhancedItem.getStatus()))
            .ip(address)
            .build();

        recordLogRepository.save(record);
    }
    
    @Transactional(readOnly = true)
    public List<RecordResponse> readRecordLog(
        final long lastId,
        final long size,
        final String itemName
    ) {
        return recordLogRepository.readRecords(lastId == -1 ? null: lastId, size, itemName);
    }
    
    /**
     * 사용자 이름을 기반으로 기록 로그를 삭제한다.
     * 
     * @param name 삭제할 로그의 사용자 이름
     */
    public void deleteRecord(final String name) {
        recordLogRepository.deleteByName(name);
        
    }
    
    public void clean() {
        List<Item> allItems = itemRepository.findAll();
        for (Item item: allItems) {
            Long itemId = item.getId();
            Optional<EnhanceRecord> findItem = recordLogRepository.findBestRecordOf(itemId);
            Optional<EnhancedItem> findRecord = enhancedItemRepository.findByItemId(itemId);
            if (findItem.isEmpty()) { continue; }
            if (findRecord.isEmpty()) { continue; }

            EnhanceRecord log = findItem.orElseThrow(IllegalStateException::new);
            EnhancedItem record = findRecord.orElseThrow(IllegalStateException::new);
            
            record.changeInfo(log);
        }
    }
}
