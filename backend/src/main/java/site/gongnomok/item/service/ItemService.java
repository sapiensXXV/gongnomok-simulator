package site.gongnomok.item.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.global.exception.ItemException;
import site.gongnomok.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.item.dto.ItemRankingResponse;
import site.gongnomok.item.dto.api.*;
import site.gongnomok.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.item.domain.repository.ItemRepository;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.AttackSpeed;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.dto.request.ItemStatusRangeRequest;
import site.gongnomok.item.dto.request.ItemStatusRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static site.gongnomok.global.exception.ExceptionCode.NOT_FOUND_ITEM_ID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ObjectMapper mapper;

    public void saveItem(ItemCreateDto dto) {
        // TODO: 3/20/24 Item 객체 생성을 다른 객체에 위임한다.
        Long itemId = dto.getId();
        String itemName = dto.getName();
        ItemRequiredJob requiredJob = dto.getRequiredJob();
        ItemRequiredDto required = dto.getRequired();
        Category category = Category.stringToCategory(dto.getCategory());
        ItemStatusRequest status = dto.getStatus();
        int upgradableCount = dto.getUpgradableCount();
        AttackSpeed attackSpeed = AttackSpeed.stringToAttackSpeed(dto.getAttackSpeed());
        int knockBackPercent = dto.getKnockBackPercent();

        Item newItem = Item.builder()
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
            .status(status.toEntity())
            .upgradable(upgradableCount)
            .knockBackPercent(knockBackPercent)
            .build();


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
        Item item = findItem.orElseThrow(() -> new ItemException(NOT_FOUND_ITEM_ID));
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

        ItemStatusRequest status = convertItemToStatusDto(item);
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

    private ItemStatusRequest convertItemToStatusDto(Item item) throws JsonProcessingException {
        return ItemStatusRequest.builder()
            .str(mapper.readValue(item.getStr(), ItemStatusRangeRequest.class))
            .dex(mapper.readValue(item.getDex(), ItemStatusRangeRequest.class))
            .intel(mapper.readValue(item.getIntel(), ItemStatusRangeRequest.class))
            .luk(mapper.readValue(item.getLuk(), ItemStatusRangeRequest.class))
            .phyAtk(mapper.readValue(item.getPhyAtk(), ItemStatusRangeRequest.class))
            .mgAtk(mapper.readValue(item.getMgAtk(), ItemStatusRangeRequest.class))
            .phyDef(mapper.readValue(item.getPhyDef(), ItemStatusRangeRequest.class))
            .mgDef(mapper.readValue(item.getMgDef(), ItemStatusRangeRequest.class))
            .hp(mapper.readValue(item.getHp(), ItemStatusRangeRequest.class))
            .mp(mapper.readValue(item.getMp(), ItemStatusRangeRequest.class))
            .acc(mapper.readValue(item.getAcc(), ItemStatusRangeRequest.class))
            .avo(mapper.readValue(item.getAvo(), ItemStatusRangeRequest.class))
            .move(mapper.readValue(item.getMove(), ItemStatusRangeRequest.class))
            .jump(mapper.readValue(item.getJump(), ItemStatusRangeRequest.class))
            .build();
    }
}
