package site.gongnomok.data.item.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.item.domain.Item;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemQueryRepository{
}
