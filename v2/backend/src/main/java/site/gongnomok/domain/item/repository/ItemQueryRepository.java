package site.gongnomok.domain.item.repository;

import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;

import java.util.List;

public interface ItemQueryRepository {

    public List<ItemResponseDto> findItems(ItemListRequestServiceDto condition);

    public List<ItemResponseDto> findAllOrderById();

}
