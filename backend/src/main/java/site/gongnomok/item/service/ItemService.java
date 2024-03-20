package site.gongnomok.item.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.global.exception.ItemException;
import site.gongnomok.item.domain.ItemFactory;
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
import site.gongnomok.item.dto.response.ItemDetailsResponse;

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
        Item newItem = ItemFactory.from(dto);
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
    public ItemDetailsResponse findItemById(Long id) throws JsonProcessingException {
        Optional<Item> findItem = itemRepository.findById(id);
        Item item = findItem.orElseThrow(() -> new ItemException(NOT_FOUND_ITEM_ID));
        item.addViewCount(); // 조회수 증가

        return ItemDetailsResponse.from(item);
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
