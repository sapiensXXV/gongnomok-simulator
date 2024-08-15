package site.gongnomok.core.item;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.common.exception.ExceptionCode;
import site.gongnomok.common.exception.ItemException;
import site.gongnomok.common.item.dto.ItemDto;
import site.gongnomok.common.item.dto.ItemViewRankingRepositoryDto;
import site.gongnomok.common.item.dto.ItemViewRankingResponse;
import site.gongnomok.common.item.dto.api.itemlist.ItemListResponse;
import site.gongnomok.common.item.dto.api.itemlist.ItemResponse;
import site.gongnomok.common.item.dto.request.ItemCreateRequest;
import site.gongnomok.common.item.dto.request.itemlist.ItemListServiceRequest;
import site.gongnomok.common.item.dto.response.recordranking.ItemRecordRankingResponse;
import site.gongnomok.common.item.dto.response.recordranking.RecordRankingSuccess;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;
import site.gongnomok.data.enhanceditem.domain.repository.EnhancedItemRepository;
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
    private final EnhancedItemRepository enhancedItemRepository;

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
    public List<ItemViewRankingResponse> itemRankingPagination(
        final Pageable pageable
    ) {
        final List<ItemViewRankingRepositoryDto> items = itemRepository.findItemByViewCountPagination(pageable);
        return convertItemListRankingResponse(items);
    }
    
    @Transactional(readOnly = true)
    public List<ItemRecordRankingResponse> itemRecordRanking() {
        List<EnhancedItem> enhancedItems = enhancedItemRepository.recordRankingItems();
        List<ItemRecordRankingResponse> result = new ArrayList<>();
        for (EnhancedItem enhancedItem : enhancedItems) {
            Long itemId = enhancedItem.getItem().getId();
            RecordRankingSuccess success = RecordRankingSuccess.builder()
                .ten(enhancedItem.getSuccess().getTenSuccessCount())
                .sixty(enhancedItem.getSuccess().getSixtySuccessCount())
                .hundred(enhancedItem.getSuccess().getHundredSuccessCount())
                .build();

            ItemRecordRankingResponse rankData = new ItemRecordRankingResponse(itemId, enhancedItem.getName(), success);
            result.add(rankData);
        }
        return result;
    }
    

    private List<ItemViewRankingResponse> convertItemListRankingResponse(
        final List<ItemViewRankingRepositoryDto> items
    ) {
        
        final List<ItemViewRankingResponse> ranking = new ArrayList<>();
        for (int i = 1; i <= items.size(); i++) {
            final ItemViewRankingRepositoryDto item = items.get(i - 1);
            ranking.add(ItemViewRankingResponse.of(item.getItemId(), item.getName(), item.getViewCount(), i));
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
