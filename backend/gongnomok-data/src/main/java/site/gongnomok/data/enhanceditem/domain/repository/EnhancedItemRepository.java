package site.gongnomok.data.enhanceditem.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;

import java.util.List;

public interface EnhancedItemRepository extends JpaRepository<EnhancedItem, Long>, EnhanceItemQueryRepository {
    
    @Query("select e from EnhancedItem e order by e.score desc limit 15")
    public List<EnhancedItem> recordRankingItems();
    
}
