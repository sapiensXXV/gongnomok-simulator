package site.gongnomok.domain.item.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.enhanceditem.dto.EnhanceResult;
import site.gongnomok.domain.enhanceditem.dto.UpdateEnhancementResponse;
import site.gongnomok.domain.enhanceditem.repository.EnhancedItemRepository;
import site.gongnomok.domain.item.dto.ItemEnhanceResponse;
import site.gongnomok.domain.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.domain.item.dto.ItemRankingResponse;
import site.gongnomok.domain.item.dto.api.*;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.domain.item.dto.service.*;
import site.gongnomok.domain.item.exception.CannotFindEnhancedItemException;
import site.gongnomok.domain.item.exception.CannotFindItemException;
import site.gongnomok.domain.item.repository.ItemRepository;
import site.gongnomok.global.entity.EnhancedItem;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.entity.enumerate.AttackSpeed;
import site.gongnomok.global.entity.enumerate.Category;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final EnhancedItemRepository enhancedItemRepository;
    private final ObjectMapper mapper;

    public void saveItem(ItemCreateServiceDto dto) {
        Long itemId = dto.getId();
        String itemName = dto.getName();
        ItemRequiredJobServiceDto requiredJob = dto.getRequiredJob();
        ItemRequiredServiceDto required = dto.getRequired();
        Category category = dto.getCategory();
        ItemStatusServiceDto status = dto.getStatus();
        int upgradableCount = dto.getUpgradableCount();
        AttackSpeed attackSpeed = dto.getAttackSpeed();
        int knockBackPercent = dto.getKnockBackPercent();

        Item newItem = null;
        try {
            newItem = Item.builder()
                    .id(itemId)
                    .name(itemName)
                    .requiredLevel(required.getLevel())
                    .requiredStr(required.getStr())
                    .requiredDex(required.getDex())
                    .requiredInt(required.getIntel())
                    .requiredLuk(required.getLuk())
                    .requiredPop(required.getPop())
                    .common(requiredJob.isCommon())
                    .warrior(requiredJob.isWarrior())
                    .bowman(requiredJob.isBowman())
                    .magician(requiredJob.isMagician())
                    .thief(requiredJob.isThief())
                    .category(category)
                    .attackSpeed(attackSpeed)
                    .str(mapper.writeValueAsString(status.getStr()))
                    .dex(mapper.writeValueAsString(status.getDex()))
                    .intel(mapper.writeValueAsString(status.getIntel()))
                    .luk(mapper.writeValueAsString(status.getLuk()))
                    .phyAtk(mapper.writeValueAsString(status.getPhyAtk()))
                    .mgAtk(mapper.writeValueAsString(status.getMgAtk()))
                    .phyDef(mapper.writeValueAsString(status.getPhyDef()))
                    .mgDef(mapper.writeValueAsString(status.getMgDef()))
                    .acc(mapper.writeValueAsString(status.getAcc()))
                    .avo(mapper.writeValueAsString(status.getAvo()))
                    .move(mapper.writeValueAsString(status.getMove()))
                    .jump(mapper.writeValueAsString(status.getJump()))
                    .hp(mapper.writeValueAsString(status.getHp()))
                    .mp(mapper.writeValueAsString(status.getMp()))
                    .upgradable(upgradableCount)
                    .knockBackPercent(knockBackPercent)
                    .build();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("아이템 정보를 JSON으로 매핑할 수 없습니다.", e);
        }

        itemRepository.save(newItem);
    }

    @Transactional(readOnly = true)
    public ItemListResponseDto findItemsWithCondition(ItemListRequestServiceDto dto, Pageable pageable) {
        List<ItemResponseDto> items = itemRepository.paginationFindItemsWithCondition(dto, pageable);
        return ItemListResponseDto.of(items);
    }

    @Transactional(readOnly = true)
    public ItemListResponseDto findPaginationItems(Pageable pageable) {
        List<ItemResponseDto> items = itemRepository.paginationFindItems(pageable);
        return ItemListResponseDto.of(items);
    }

    @Transactional(readOnly = true)
    public List<ItemRankingResponse> itemRankingPagination(Pageable pageable) {
        List<ItemRankingRepositoryDto> items = itemRepository.findItemByViewCountPagination(pageable);
        return convertItemListRankingResponse(items);
    }

    private List<ItemRankingResponse> convertItemListRankingResponse(List<ItemRankingRepositoryDto> items) {
        List<ItemRankingResponse> ranking = new ArrayList<>();
        for (int i = 1; i <= items.size(); i++) {
            ItemRankingRepositoryDto item = items.get(i - 1);
            ranking.add(ItemRankingResponse.of(item.getItemId(), item.getName(), item.getViewCount(), i));
        }

        return ranking;
    }

    @Transactional
    public ItemDetailResponseDto findItemById(Long id) throws JsonProcessingException {
        Optional<Item> findItem = itemRepository.findById(id);
        Item item = findItem.orElseThrow(CannotFindItemException::new);
        item.addViewCount(); // 조회수 증가

        String name = item.getName();
        ItemRequiredDto requiredDto = ItemRequiredDto.builder()
                .level(item.getRequiredLevel())
                .str(item.getRequiredStr())
                .dex(item.getRequiredDex())
                .intel(item.getRequiredInt())
                .luk(item.getRequiredLuk())
                .pop(item.getRequiredPop())
                .build();

        ItemRequiredJob job = ItemRequiredJob.builder()
                .common(item.isCommon())
                .warrior(item.isWarrior())
                .bowman(item.isBowman())
                .magician(item.isMagician())
                .thief(item.isThief())
                .build();

        String category = item.getCategory().name();
        int knockBackPercent = item.getKnockBackPercent();

        ItemStatusDto status = convertItemToStatusDto(item);
        int viewCount = item.getViewCount();
        String attackSpeed = item.getAttackSpeed() == null ? null : item.getAttackSpeed().name();
        int upgradableCount = item.getUpgradable();

        return ItemDetailResponseDto.builder()
                .name(name)
                .job(job)
                .required(requiredDto)
                .category(category)
                .status(status)
                .viewCount(viewCount)
                .attackSpeed(attackSpeed)
                .upgradableCount(upgradableCount)
                .knockBackPercent(knockBackPercent)
                .build();
    }

    private ItemStatusDto convertItemToStatusDto(Item item) throws JsonProcessingException {
        return ItemStatusDto.builder()
            .str(mapper.readValue(item.getStr(), ItemStatusInfoDto.class))
            .dex(mapper.readValue(item.getDex(), ItemStatusInfoDto.class))
            .intel(mapper.readValue(item.getIntel(), ItemStatusInfoDto.class))
            .luk(mapper.readValue(item.getLuk(), ItemStatusInfoDto.class))
            .phyAtk(mapper.readValue(item.getPhyAtk(), ItemStatusInfoDto.class))
            .mgAtk(mapper.readValue(item.getMgAtk(), ItemStatusInfoDto.class))
            .phyDef(mapper.readValue(item.getPhyDef(), ItemStatusInfoDto.class))
            .mgDef(mapper.readValue(item.getMgDef(), ItemStatusInfoDto.class))
            .hp(mapper.readValue(item.getHp(), ItemStatusInfoDto.class))
            .mp(mapper.readValue(item.getMp(), ItemStatusInfoDto.class))
            .acc(mapper.readValue(item.getAcc(), ItemStatusInfoDto.class))
            .avo(mapper.readValue(item.getAvo(), ItemStatusInfoDto.class))
            .move(mapper.readValue(item.getMove(), ItemStatusInfoDto.class))
            .jump(mapper.readValue(item.getJump(), ItemStatusInfoDto.class))
            .build();
    }

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
            return ItemEnhanceResponse.getBasicEnhanceData(itemId);
        } else {
            EnhancedItem enhancedItem = enhanceItem.orElseThrow(() -> new CannotFindEnhancedItemException("아이템 기록을 찾을 수 없습니다."));

            enhancedItem.changeItem(findItem);

            return ItemEnhanceResponse.builder()
                .iev(enhancedItem.getIev())
                .successCount(enhancedItem.getSuccessCount())
                .str(enhancedItem.getStr())
                .dex(enhancedItem.getDex())
                .intel(enhancedItem.getIntel())
                .luk(enhancedItem.getLuk())
                .phyAtk(enhancedItem.getPhyAtk())
                .mgAtk(enhancedItem.getMgAtk())
                .phyDef(enhancedItem.getPhyDef())
                .mgDef(enhancedItem.getMgDef())
                .acc(enhancedItem.getAcc())
                .avo(enhancedItem.getAvo())
                .move(enhancedItem.getMove())
                .jump(enhancedItem.getJump())
                .hp(enhancedItem.getHp())
                .mp(enhancedItem.getMp())
                .build();
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

        Optional<EnhancedItem> enhancedItemOptional = itemRepository.findEnhanceItem(itemId);
        if (enhancedItemOptional.isEmpty()) {
            return createEnhancedRecord(itemId, enhanceDto);
        }

        EnhancedItem enhancedItem = enhancedItemOptional
            .orElseThrow(() -> new CannotFindEnhancedItemException("기록을 찾을 수 없습니다."));

        log.info("이전 IEV={}", enhancedItem.getIev());
        log.info("새로운 IEV= {}", enhanceDto.getIev());

        if (enhancedItem.getIev() < enhanceDto.getIev()) {
            // 기록이 기존의 것보다 높을 경우
            return updateEnhancedRecord(enhancedItem, enhanceDto);
        }

        // 기록이 기존의 것보다 낮을 경우
        return new UpdateEnhancementResponse(EnhanceResult.FAIL);
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
