package site.gongnomok.data.management.record.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import site.gongnomok.data.management.record.dto.response.RecordResponse;
import site.gongnomok.data.management.record.dto.response.RecordStatus;
import site.gongnomok.data.management.record.dto.response.RecordSuccess;

import java.util.List;

import static site.gongnomok.data.item.domain.QItem.item;
import static site.gongnomok.data.management.record.domain.QEnhanceRecord.enhanceRecord;


@Repository
@RequiredArgsConstructor
@Slf4j
public class RecordLogQueryRepositoryImpl implements RecordLogQueryRepository {

    private final JPAQueryFactory queryFactory;    
    
    @Override
    public List<RecordResponse> readRecords(Long lastId, Long size, String itemName) {
        log.info("lastId={}, size={}, itemName={}", lastId, size, itemName);

        BooleanBuilder builder = makeRecordBooleanBuilder(lastId, itemName);

        return queryFactory
            .select(Projections.fields(RecordResponse.class,
                item.id.as("itemId"),
                item.name.as("itemName"),
                enhanceRecord.id.as("recordId"),
                Projections.fields(RecordStatus.class,
                    enhanceRecord.status.str,
                    enhanceRecord.status.dex,
                    enhanceRecord.status.intel,
                    enhanceRecord.status.luk,
                    enhanceRecord.status.phyAtk,
                    enhanceRecord.status.phyDef,
                    enhanceRecord.status.mgAtk,
                    enhanceRecord.status.mgDef,
                    enhanceRecord.status.acc,
                    enhanceRecord.status.avo,
                    enhanceRecord.status.move,
                    enhanceRecord.status.jump,
                    enhanceRecord.status.hp,
                    enhanceRecord.status.mp
                ).as("status"),
                Projections.fields(RecordSuccess.class,
                    enhanceRecord.success.ten,
                    enhanceRecord.success.sixty,
                    enhanceRecord.success.hundred
                ).as("success"),
                enhanceRecord.iev,
                enhanceRecord.score,
                enhanceRecord.tries,
                enhanceRecord.scroll
            ))
            .from(enhanceRecord)
            .innerJoin(enhanceRecord.item, item)
            .where(builder)
            .orderBy(enhanceRecord.id.desc())
            .limit(size)
            .fetch();
    }

    private BooleanBuilder makeRecordBooleanBuilder(Long lastId, String itemName) {
        BooleanBuilder builder = new BooleanBuilder();
    
        if (itemName == null || itemName.isEmpty() || itemName.isBlank()) {
//            log.info("itemName={} 인데 결과는 StringUtils.hasText(itemName)={} 조건이 포함되었습니다.", itemName, StringUtils.hasText(itemName));
            builder.and(enhanceRecord.item.name.eq(itemName));
        }
        
        if (lastId != null) {
            builder.and(enhanceRecord.id.lt(lastId));
        }
        return builder;
    }
}
