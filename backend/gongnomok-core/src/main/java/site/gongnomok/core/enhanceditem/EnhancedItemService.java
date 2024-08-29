package site.gongnomok.core.enhanceditem;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.common.enhanceditem.dto.EnhancedItemDto;
import site.gongnomok.common.enhanceditem.dto.ScrollProbability;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;
import site.gongnomok.common.enhanceditem.dto.request.ItemEnhanceServiceRequest;
import site.gongnomok.common.enhanceditem.dto.response.EnhanceResult;
import site.gongnomok.common.enhanceditem.dto.response.ItemEnhanceResponse;
import site.gongnomok.common.enhanceditem.dto.response.UpdateEnhancementResponse;
import site.gongnomok.common.exception.EnhancedItemException;
import site.gongnomok.common.exception.ExceptionCode;
import site.gongnomok.common.exception.ItemException;
import site.gongnomok.common.management.dto.record.request.RecordReplaceRequest;
import site.gongnomok.core.management.log.RecordLogService;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;
import site.gongnomok.data.enhanceditem.domain.repository.EnhancedItemRepository;
import site.gongnomok.data.item.domain.Item;
import site.gongnomok.data.item.domain.repository.ItemRepository;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EnhancedItemService {
    
    private final ItemRepository itemRepository;
    private final EnhancedItemRepository enhancedItemRepository;
    private final BaseEnhancedItemValidator validator;
    private final RecordLogService recordLogService;

    /**
     * @param itemId 특정 아이템의 기록을 읽어온다.
     * @return 아이템의 최고기록 정보를 담은 ItemEnhanceResponse 객체
     */
    public ItemEnhanceResponse findEnhanceItem(Long itemId) {
        Optional<EnhancedItem> enhanceItem = itemRepository.findEnhanceItem(itemId);
        if (enhanceItem.isEmpty()) {
            // item_id에 해당하는 아이템의 기록정보가 테이블에 없다면 기본정보를 만들어서 반환한다.
            return ItemEnhanceResponse.getBasicEnhanceData();
        } else {
            EnhancedItem enhancedItem = enhanceItem.orElseThrow(() -> new EnhancedItemException(ExceptionCode.NOT_FOUND_ENHANCED_ID));
            EnhancedItemDto enhancedItemDto = enhancedItem.toDto();
            return ItemEnhanceResponse.from(enhancedItemDto);
        }
    }

    /**
     * @param itemId 새로운 기록을 등록할 아이템 ID
     * @param request 기록 정보
     */
    @Transactional
    public UpdateEnhancementResponse updateEnhanceItem(
        final Long itemId,
        final ItemEnhanceServiceRequest request,
        final String ipAddress
    ) {
        validator.validateRequest(itemId, request);

        Optional<EnhancedItem> enhancedItemOptional = itemRepository.findEnhanceItem(itemId);
        if (enhancedItemOptional.isEmpty()) {
            return createEnhancedRecord(itemId, request, ipAddress);
        }

        EnhancedItem enhancedItem = enhancedItemOptional
            .orElseThrow(() -> new EnhancedItemException(ExceptionCode.NOT_FOUND_ENHANCED_ID));
        EnhanceSuccessDto success = request.getSuccess();
        int score = ScrollProbability.calculateScore(success.getTen(), success.getSixty(), success.getHundred());
        if (enhancedItem.getScore() <= score) {
            // 기록이 기존의 것과 같거나 높을 경우
            return updateEnhancedRecord(enhancedItem, request, score, ipAddress);
        }

        // 기록이 기존의 것보다 낮을 경우
        return new UpdateEnhancementResponse(EnhanceResult.FAIL);
    }

    private UpdateEnhancementResponse createEnhancedRecord(
        final Long itemId,
        final ItemEnhanceServiceRequest enhanceDto,
        final String ipAddress
    ) {
        Item item = itemRepository
            .findById(itemId)
            .orElseThrow(() -> new ItemException(ExceptionCode.NOT_FOUND_ITEM_ID));
        EnhanceSuccessDto success = enhanceDto.getSuccess();
        int score = ScrollProbability.calculateScore(success.getTen(), success.getSixty(), success.getHundred());
        EnhancedItem enhancedItem = EnhancedItem.from(enhanceDto, score, ipAddress);
        enhancedItem.changeItem(item);
        enhancedItemRepository.save(enhancedItem);
        
        recordLogService.logEnhanceItem(item, enhancedItem, ipAddress);
        return new UpdateEnhancementResponse(EnhanceResult.SUCCESS);
    }

    private UpdateEnhancementResponse updateEnhancedRecord(
        final EnhancedItem enhancedItem,
        final ItemEnhanceServiceRequest request,
        final int score,
        final String address
    ) {
        enhancedItem.changeInfo(request, score);
        recordLogService.logEnhanceItem(enhancedItem.getItem(), enhancedItem, address);
        return new UpdateEnhancementResponse(EnhanceResult.SUCCESS);
    }
    
    @Transactional
    public void replaceRecord(final RecordReplaceRequest request) {
        enhancedItemRepository.replaceEnhanceItem(request);
    }
}
