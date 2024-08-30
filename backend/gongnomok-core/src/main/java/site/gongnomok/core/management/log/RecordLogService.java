package site.gongnomok.core.management.log;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.data.enhanceditem.domain.EnhanceScroll;
import site.gongnomok.data.enhanceditem.domain.EnhanceStatus;
import site.gongnomok.data.enhanceditem.domain.EnhanceSuccess;
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
@Slf4j
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
     * @param ip 삭제할 로그를 만든 IP주소
     */
    public void deleteRecord(final String ip) {
        List<EnhanceRecord> findLogs = recordLogRepository.findByIp(ip); // 지정된 IP로 저장된 로그 조회
        recordLogRepository.deleteByIp(ip); // 지정된 IP로 저장된 로그 삭제
        findLogs.stream()
                .forEach((log) -> {
                    Item item = itemRepository.findById(log.getItem().getId())
                        .orElseThrow(() -> new IllegalArgumentException(String.format("item_id=[%d]인 아이템을 찾을 수 없습니다.", log.getItem().getId())));
                    restoreSingleRecord(item.getId());
                });
    }
    
    public void clean() {
        List<Item> allItems = itemRepository.findAll();
        log.info("찾아온 아이템 [{}]개", allItems.size());
        
        for (Item item: allItems) {
            Long itemId = item.getId();
            restoreSingleRecord(itemId);
        }
    }

    private void restoreSingleRecord(Long itemId) {
        log.info("item_id={} 복구", itemId);
        Optional<EnhanceRecord> recordLog = recordLogRepository.findBestRecordOf(itemId);
        Optional<EnhancedItem> record = enhancedItemRepository.findByItemId(itemId);

        boolean isRecordExist = record.isPresent();
        boolean isLogExist = recordLog.isPresent();

        if (!isRecordExist && !isLogExist) {
            // 둘 다 존재하지 않은 경우 pass
            return;
        } else if (isRecordExist && !isLogExist) {
            // 기록만 존재하고 로그가 존재하지 않는 경우 delete
            enhancedItemRepository.delete(record.get());
        } else if (!isRecordExist && isLogExist) {
            // 기록은 존재하지 않고 로그만 존재하는 경우 새로운 로그를 바탕으로 EnhancedItem 엔티티 만들어 저장
            EnhancedItem newRecord = createEnhancedItemBy(recordLog.get(), itemId);
            enhancedItemRepository.save(newRecord);
        } else {
            // 둘다 존재하는 경우 로그로 기존 기록을 대체
            enhancedItemRepository.replaceEnhanceItem(recordLog.get(), itemId);
        }
    }

    private EnhancedItem createEnhancedItemBy(final EnhanceRecord record, final Long itemId) {

        Item findItem = itemRepository.findById(itemId)
            .orElseThrow(() -> new IllegalArgumentException(String.format("item_id=[%d]에 해당하는 아이템을 찾을 수 없습니다.", itemId)));

        EnhancedItem newItem = EnhancedItem.builder()
            .name(record.getChallengerName())
            .iev(record.getIev())
            .score(record.getScore())
            .tries(record.getTries())
            .ip(record.getIp())
            .success(EnhanceSuccess.from(record.getSuccess()))
            .status(EnhanceStatus.from(record.getStatus()))
            .scroll(EnhanceScroll.from(record.getScroll()))
            .build();

        newItem.changeItem(findItem);
        return newItem;
    }
}
