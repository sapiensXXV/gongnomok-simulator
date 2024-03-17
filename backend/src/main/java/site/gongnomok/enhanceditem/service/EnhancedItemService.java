package site.gongnomok.enhanceditem.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.enhanceditem.ValidationCategory;
import site.gongnomok.enhanceditem.domain.EnhancedItem;
import site.gongnomok.enhanceditem.domain.repository.EnhancedItemRepository;
import site.gongnomok.enhanceditem.dto.EnhanceResult;
import site.gongnomok.enhanceditem.dto.UpdateEnhancementResponse;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.repository.ItemRepository;
import site.gongnomok.item.dto.ItemEnhanceResponse;
import site.gongnomok.item.dto.service.ItemEnhanceServiceRequest;
import site.gongnomok.item.exception.CannotFindEnhancedItemException;
import site.gongnomok.item.exception.CannotFindItemException;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnhancedItemService {


    private final ItemRepository itemRepository;
    private final EnhancedItemRepository enhancedItemRepository;

    /**
     * @param itemId 특정 아이템의 기록을 읽어온다.
     * @return 아이템의 최고기록 정보를 담은 ItemEnhanceResponse 객체
     */
    public ItemEnhanceResponse findEnhanceItem(Long itemId) {
        Item findItem = itemRepository
            .findById(itemId)
            .orElseThrow(() -> new CannotFindItemException("아이템을 찾을 수 없습니다."));

        Optional<EnhancedItem> enhanceItem = itemRepository.findEnhanceItem(itemId);
        if (enhanceItem.isEmpty()) {
            // item_id에 해당하는 아이템의 기록정보가 테이블에 없다면 기본정보를 만들어서 반환한다.
            return ItemEnhanceResponse.getBasicEnhanceData();
        } else {
            EnhancedItem enhancedItem = enhanceItem.orElseThrow(() -> new CannotFindEnhancedItemException("아이템 기록을 찾을 수 없습니다."));
            enhancedItem.changeItem(findItem);
            return ItemEnhanceResponse.convertEntityToResponse(enhancedItem);
        }
    }

    /**
     * @param itemId 새로운 기록을 등록할 아이템 ID
     * @param enhanceDto 기록 정보
     */
    @Transactional
    public UpdateEnhancementResponse updateEnhanceItem(
        final Long itemId,
        final ItemEnhanceServiceRequest enhanceDto
    ) {

        if (!validateEnhanceRequest(enhanceDto)) {
            return new UpdateEnhancementResponse(EnhanceResult.FAIL);
        }

        Optional<EnhancedItem> enhancedItemOptional = itemRepository.findEnhanceItem(itemId);
        if (enhancedItemOptional.isEmpty()) {
            return createEnhancedRecord(itemId, enhanceDto);
        }

        EnhancedItem enhancedItem = enhancedItemOptional
            .orElseThrow(() -> new CannotFindEnhancedItemException("기록을 찾을 수 없습니다."));

        if (enhancedItem.getIev() < enhanceDto.getIev()) {
            // 기록이 기존의 것보다 높을 경우
            return updateEnhancedRecord(enhancedItem, enhanceDto);
        }

        // 기록이 기존의 것보다 낮을 경우
        return new UpdateEnhancementResponse(EnhanceResult.FAIL);
    }

    private boolean validateEnhanceRequest(ItemEnhanceServiceRequest request) {

        ValidationCategory findCategory = ValidationCategory.findWithName(request.getCategory());

        log.info("------------------- [검증 시작] ----------------------");
        log.info("request.getIev() = {}", request.getIev());
        log.info("findCategory.getMaximumUpgradableValue()={}", findCategory.getMaximumUpgradableValue());

        if (request.getIev() > findCategory.getMaximumUpgradableValue()) {
            return false;
        }

        log.info("request.getSuccessCount()={}", request.getSuccessCount());
        log.info("findCategory.getUpgradableCount()={}", findCategory.getUpgradableCount());

        if (request.getSuccessCount() > findCategory.getUpgradableCount()) {
            return false;
        }
        return true;
    }

    private UpdateEnhancementResponse createEnhancedRecord(
        final Long itemId,
        final ItemEnhanceServiceRequest enhanceDto
    ) {
        Item item = itemRepository
            .findById(itemId)
            .orElseThrow(() -> new CannotFindItemException("아이템을 찾을 수 없습니다."));
        EnhancedItem enhancedItem = ItemEnhanceServiceRequest.createEntity(enhanceDto);
        enhancedItem.changeItem(item);
        enhancedItemRepository.save(enhancedItem);

        return new UpdateEnhancementResponse(EnhanceResult.SUCCESS);
    }

    private UpdateEnhancementResponse updateEnhancedRecord(
        final EnhancedItem enhancedItem,
        final ItemEnhanceServiceRequest enhanceDto
    ) {
        enhancedItem.changeStatus(enhanceDto);

        return new UpdateEnhancementResponse(EnhanceResult.SUCCESS);
    }
}
