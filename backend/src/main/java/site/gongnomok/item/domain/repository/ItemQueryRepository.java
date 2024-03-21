package site.gongnomok.item.domain.repository;

import org.springframework.data.domain.Pageable;
import site.gongnomok.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.item.dto.request.itemlist.ItemListServiceRequest;
import site.gongnomok.item.dto.api.itemlist.ItemResponse;
import site.gongnomok.enhanceditem.domain.EnhancedItem;

import java.util.List;
import java.util.Optional;

public interface ItemQueryRepository {

    public List<ItemResponse> findItems(ItemListServiceRequest condition);

    public List<ItemResponse> findAllOrderById();

    public List<ItemResponse> paginationFindItems(Pageable pageable);

    public List<ItemResponse> paginationFindItemsWithCondition(ItemListServiceRequest condition, Pageable pageable);

    public List<ItemRankingRepositoryDto> findItemByViewCount(long findCount);

    public List<ItemRankingRepositoryDto> findItemByViewCountPagination(Pageable pageable);

    public Optional<EnhancedItem> findEnhanceItem(Long itemId);

}
