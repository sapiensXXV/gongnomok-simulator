package site.gongnomok.data.enhanceditem.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;

public interface EnhancedItemRepository extends JpaRepository<EnhancedItem, Long> {
}
