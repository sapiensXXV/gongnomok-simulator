package site.gongnomok.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.global.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
