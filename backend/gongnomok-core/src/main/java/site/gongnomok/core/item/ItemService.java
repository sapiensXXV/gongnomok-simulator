package site.gongnomok.core.item;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.common.exception.ExceptionCode;
import site.gongnomok.common.exception.ItemException;
import site.gongnomok.common.item.dto.ItemDto;
import site.gongnomok.common.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.common.item.dto.ItemRankingResponse;
import site.gongnomok.common.item.dto.api.itemlist.ItemListResponse;
import site.gongnomok.common.item.dto.api.itemlist.ItemResponse;
import site.gongnomok.common.item.dto.request.ItemCreateRequest;
import site.gongnomok.common.item.dto.request.itemlist.ItemListServiceRequest;
import site.gongnomok.data.item.domain.Item;
import site.gongnomok.data.item.domain.repository.ItemRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public void createItem(
        final ItemCreateRequest request
    ) {
        ItemDto entityDto = request.toEntityDto();
        Item newItem = Item.from(entityDto, request.getId());
        itemRepository.save(newItem);
    }

    @Transactional(readOnly = true)
    public ItemListResponse findItemsWithCondition(
        final ItemListServiceRequest condition,
        final Pageable pageable
    ) {
        final List<ItemResponse> items = itemRepository.paginationFindItemsWithCondition(condition, pageable);
        return ItemListResponse.of(items);
    }

    @Transactional(readOnly = true)
    public ItemListResponse findPaginationItems(
        final Pageable pageable
    ) {
        final List<ItemResponse> items = itemRepository.paginationFindItems(pageable);
        return ItemListResponse.of(items);
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
    public ItemDto findItemById(
        final Long id
    ) {
        final Optional<Item> findItem = itemRepository.findById(id);
        final Item item = findItem.orElseThrow(() -> new ItemException(ExceptionCode.NOT_FOUND_ITEM_ID));
        item.addViewCount(); // 조회수 증가

        return item.toDto();
    }

}
