package site.gongnomok.item.domain.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import site.gongnomok.enhanceditem.domain.QEnhancedItem;
import site.gongnomok.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.enhanceditem.domain.EnhancedItem;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.domain.Job;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static site.gongnomok.enhanceditem.domain.QEnhancedItem.enhancedItem;
import static site.gongnomok.item.domain.QItem.item;


@Repository
public class ItemQueryRepositoryImpl extends QuerydslRepositorySupport implements ItemQueryRepository {

    private final JPAQueryFactory queryFactory;

    public ItemQueryRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Item.class);
        this.queryFactory = queryFactory;
    }

    @Override
    public List<ItemResponseDto> findItems(ItemListRequestServiceDto condition) {

        String name = condition.getName();
        Job job = condition.getJob();
        Category category = condition.getCategory();
        int minLevel = condition.getMinLevel();

        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponseDto.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .where(
                        nameContains(name),
                        jobContain(job),
                        categoryEqual(category),
                        levelGoe(minLevel)
                )
                .fetch();
    }

    @Override
    public List<ItemResponseDto> findAllOrderById() {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponseDto.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .orderBy(item.id.asc())
                .fetch();
    }


    @Override
    public List<ItemResponseDto> paginationFindItems(
            final Pageable pageable
    ) {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponseDto.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .orderBy(item.id.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }

    @Override
    public List<ItemResponseDto> paginationFindItemsWithCondition(
        final ItemListRequestServiceDto condition,
        final Pageable pageable
    ) {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponseDto.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .where(
                        nameContains(condition.getName()),
                        jobContain(condition.getJob()),
                        levelGoe(condition.getMinLevel()),
                        categoryEqual(condition.getCategory())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(item.id.asc())
                .fetch();
    }

    @Override
    public List<ItemRankingRepositoryDto> findItemByViewCount(long findCount) {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemRankingRepositoryDto.class,
                                item.id.as("itemId"),
                                item.name,
                                item.viewCount
                        )
                )
                .from(item)
                .orderBy(item.viewCount.desc())
                .limit(findCount)
                .fetch();
    }

    @Override
    public List<ItemRankingRepositoryDto> findItemByViewCountPagination(Pageable pageable) {
        return queryFactory
            .select(
                Projections.fields(
                    ItemRankingRepositoryDto.class,
                    item.id.as("itemId"),
                    item.name,
                    item.viewCount
                )
            )
            .from(item)
            .orderBy(item.viewCount.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

    }

    @Override
    public Optional<EnhancedItem> findEnhanceItem(Long itemId) {
        EnhancedItem result = queryFactory
            .select(enhancedItem)
            .from(enhancedItem)
            .where(enhancedItem.item.id.eq(itemId))
            .fetchOne();

        if (result == null) {
            return Optional.empty();
        }
        return Optional.of(result);
    }

    private Pageable exchangePageRequest(Pageable pageable, long totalCount) {
        /**
         * 요청한 페이지 번호가 기존의 사이즈를 초과할 경우 마지막 페이지의 데이터를 반환한다.
         */
        int pageNo = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        long requestCount = (pageNo - 1) * pageSize;

        if (totalCount > requestCount) {
            return pageable;
        }

        int requestPageNo = (int) Math.ceil((double) totalCount / pageNo);
        return PageRequest.of(requestPageNo, pageSize);
    }

    private BooleanExpression nameContains(String name) {
        if (name.equals("")) {
            return Expressions.asBoolean(true).isTrue();
        }

        return item.name.contains(name);
    }

    private BooleanExpression jobContain(Job job) {

        if (job == null) return null;

        String name = Job.jobToString(job);
        if (name.equals("common")) {
            return item.common.isTrue();
        } else if (name.equals("warrior")) {
            return item.warrior.isTrue();
        } else if (name.equals("bowman")) {
            return item.bowman.isTrue();
        } else if (name.equals("magician")) {
            return item.magician.isTrue();
        } else if (name.equals("thief")) {
            return item.thief.isTrue();
        }

        return null;
    }

    private BooleanExpression categoryEqual(Category category) {
        return category == null ? null : item.category.eq(category);
    }

    private BooleanExpression levelGoe(int minLevel) {
        return item.requiredLevel.goe(minLevel);
    }

    private Querydsl querydsl() {
        return Objects.requireNonNull(getQuerydsl());
    }
}
