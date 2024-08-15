package site.gongnomok.data.item.domain.repository;

import org.springframework.data.domain.Pageable;
import site.gongnomok.common.item.dto.ItemViewRankingRepositoryDto;
import site.gongnomok.common.item.dto.api.itemlist.ItemResponse;
import site.gongnomok.common.item.dto.request.itemlist.ItemListServiceRequest;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;

import java.util.List;
import java.util.Optional;

public interface ItemQueryRepository {

    public List<ItemResponse> findItems(ItemListServiceRequest condition);

    public List<ItemResponse> findAllOrderById();

    public List<ItemResponse> paginationFindItems(Pageable pageable);

    public List<ItemResponse> paginationFindItemsWithCondition(ItemListServiceRequest condition, Pageable pageable);

    public List<ItemViewRankingRepositoryDto> findItemByViewCount(long findCount);

    public List<ItemViewRankingRepositoryDto> findItemByViewCountPagination(Pageable pageable);

    public Optional<EnhancedItem> findEnhanceItem(Long itemId);

}
