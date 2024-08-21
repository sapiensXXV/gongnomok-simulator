package site.gongnomok.data.enhanceditem.domain.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.gongnomok.common.management.dto.record.request.RecordReplaceRequest;

import static site.gongnomok.data.enhanceditem.domain.QEnhancedItem.enhancedItem;


@Repository
@RequiredArgsConstructor
public class EnhanceItemQueryRepositoryImpl implements EnhanceItemQueryRepository{
    
    private final JPAQueryFactory queryFactory;

    @Override
    public void replaceEnhanceItem(
        final RecordReplaceRequest request
        ) {
        queryFactory
            .update(enhancedItem)
            .set()
            .where(enhancedItem.id.eq(request.getItemId()))
            .execute();
            
    }
}
