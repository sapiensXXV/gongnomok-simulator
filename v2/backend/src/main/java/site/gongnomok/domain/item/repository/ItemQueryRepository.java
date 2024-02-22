package site.gongnomok.domain.item.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.gongnomok.domain.item.dto.api.ItemListPageDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;

import java.util.List;

public interface ItemQueryRepository {

    public List<ItemResponseDto> findItems(ItemListRequestServiceDto condition);

    public List<ItemResponseDto> findAllOrderById();

    public List<ItemResponseDto> paginationFindItems(Pageable pageable);

    public List<ItemResponseDto> paginationFindItemsWithCondition(ItemListRequestServiceDto condition, Pageable pageable);

}
