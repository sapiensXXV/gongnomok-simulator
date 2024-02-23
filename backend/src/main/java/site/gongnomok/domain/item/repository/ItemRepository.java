package site.gongnomok.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.global.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemQueryRepository{
}
