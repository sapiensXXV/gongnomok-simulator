package site.gongnomok.item.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.item.domain.Item;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemQueryRepository{
}
