package site.gongnomok.item.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.global.exception.ItemException;
import site.gongnomok.item.domain.ItemFactory;
import site.gongnomok.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.item.dto.ItemRankingResponse;
import site.gongnomok.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.item.domain.repository.ItemRepository;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.dto.request.ItemCreateRequest;
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

    public void saveItem(
        final ItemCreateRequest dto
    ) {
        Item newItem = ItemFactory.from(dto);
        itemRepository.save(newItem);
    }

    @Transactional(readOnly = true)
    public ItemListResponseDto findItemsWithCondition(
        final ItemListRequestServiceDto dto,
        final Pageable pageable
    ) {
        final List<ItemResponseDto> items = itemRepository.paginationFindItemsWithCondition(dto, pageable);
        return ItemListResponseDto.of(items);
    }

    @Transactional(readOnly = true)
    public ItemListResponseDto findPaginationItems(
        final Pageable pageable
    ) {
        final List<ItemResponseDto> items = itemRepository.paginationFindItems(pageable);
        return ItemListResponseDto.of(items);
    }

    @Transactional(readOnly = true)
    public List<ItemRankingResponse> itemRankingPagination(
        final Pageable pageable
    ) {
        final List<ItemRankingRepositoryDto> items = itemRepository.findItemByViewCountPagination(pageable);
        return convertItemListRankingResponse(items);
    }

    private List<ItemRankingResponse> convertItemListRankingResponse(
        final List<ItemRankingRepositoryDto> items
    ) {
        final List<ItemRankingResponse> ranking = new ArrayList<>();
        for (int i = 1; i <= items.size(); i++) {
            final ItemRankingRepositoryDto item = items.get(i - 1);
            ranking.add(ItemRankingResponse.of(item.getItemId(), item.getName(), item.getViewCount(), i));
        }

        return ranking;
    }

    @Transactional
    public ItemDetailsResponse findItemById(
        final Long id
    ) throws JsonProcessingException {
        final Optional<Item> findItem = itemRepository.findById(id);
        final Item item = findItem.orElseThrow(() -> new ItemException(NOT_FOUND_ITEM_ID));
        item.addViewCount(); // 조회수 증가

        return ItemDetailsResponse.from(item);
    }

}
