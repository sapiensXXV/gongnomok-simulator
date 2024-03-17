package site.gongnomok.enhanceditem.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.enhanceditem.domain.EnhancedItem;

public interface EnhancedItemRepository extends JpaRepository<EnhancedItem, Long> {
}
