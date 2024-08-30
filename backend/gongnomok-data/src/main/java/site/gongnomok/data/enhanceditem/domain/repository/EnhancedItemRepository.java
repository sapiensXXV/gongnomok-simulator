package site.gongnomok.data.enhanceditem.domain.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;

import java.util.List;
import java.util.Optional;

public interface EnhancedItemRepository extends JpaRepository<EnhancedItem, Long>, EnhanceItemQueryRepository {
    
    @Query("select e from EnhancedItem e order by e.score desc limit 15")
    public List<EnhancedItem> recordRankingItems();
    
    @Query("select e from EnhancedItem e where e.item.id = :itemId")
    public Optional<EnhancedItem> findByItemId(Long itemId);

    public void deleteByIp(String ip);
    
}
