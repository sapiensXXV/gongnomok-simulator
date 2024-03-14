package site.gongnomok.domain.enhanceditem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.global.entity.EnhancedItem;

public interface EnhancedItemRepository extends JpaRepository<EnhancedItem, Long> {
}
