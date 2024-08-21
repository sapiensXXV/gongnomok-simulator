package site.gongnomok.data.enhanceditem.domain.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.gongnomok.common.management.dto.record.request.RecordReplaceRequest;
import site.gongnomok.common.management.dto.record.request.ReplaceStatus;
import site.gongnomok.common.management.dto.record.request.ReplaceSuccess;

import static site.gongnomok.data.enhanceditem.domain.QEnhancedItem.enhancedItem;

@Repository
@RequiredArgsConstructor
public class EnhanceItemQueryRepositoryImpl implements EnhanceItemQueryRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public void replaceEnhanceItem(
        final RecordReplaceRequest request
    ) {
        ReplaceStatus status = request.getStatus();
        ReplaceSuccess success = request.getSuccess();

        queryFactory
            .update(enhancedItem)
            .set(enhancedItem.name, request.getName())
            .set(enhancedItem.iev, request.getIev())
            .set(enhancedItem.score, request.getScore())
            .set(enhancedItem.tries, request.getTries())
            .set(enhancedItem.success.successCount, success.getTotal())
            .set(enhancedItem.success.tenSuccessCount, success.getTen())
            .set(enhancedItem.success.sixtySuccessCount, success.getSixty())
            .set(enhancedItem.success.hundredSuccessCount, success.getHundred())
            .set(enhancedItem.status.str, status.getStr())
            .set(enhancedItem.status.dex, status.getDex())
            .set(enhancedItem.status.intel, status.getIntel())
            .set(enhancedItem.status.luk, status.getLuk())
            .set(enhancedItem.status.phyAtk, status.getPhyAtk())
            .set(enhancedItem.status.phyDef, status.getPhyDef())
            .set(enhancedItem.status.mgAtk, status.getMgAtk())
            .set(enhancedItem.status.mgDef, status.getMgDef())
            .set(enhancedItem.status.acc, status.getAcc())
            .set(enhancedItem.status.avo, status.getAvo())
            .set(enhancedItem.status.move, status.getMove())
            .set(enhancedItem.status.jump, status.getJump())
            .set(enhancedItem.status.hp, status.getHp())
            .set(enhancedItem.status.mp, status.getMp())
            .where(enhancedItem.item.id.eq(request.getItemId()))
            .execute();

    }
}
