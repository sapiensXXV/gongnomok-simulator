package site.gongnomok.data.item.domain.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import site.gongnomok.common.item.dto.ItemRankingRepositoryDto;
import site.gongnomok.common.item.dto.api.itemlist.ItemResponse;
import site.gongnomok.common.item.dto.request.itemlist.ItemListServiceRequest;
import site.gongnomok.common.item.dto.request.itemlist.JobSearchDto;
import site.gongnomok.data.enhanceditem.domain.EnhancedItem;
import site.gongnomok.data.item.domain.Category;
import site.gongnomok.data.item.domain.Item;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static site.gongnomok.data.enhanceditem.domain.QEnhancedItem.enhancedItem;
import static site.gongnomok.data.item.domain.QItem.item;


@Repository
public class ItemQueryRepositoryImpl extends QuerydslRepositorySupport implements ItemQueryRepository {

    private final JPAQueryFactory queryFactory;

    public ItemQueryRepositoryImpl(JPAQueryFactory queryFactory) {
        super(Item.class);
        this.queryFactory = queryFactory;
    }

    @Override
    public List<ItemResponse> findItems(ItemListServiceRequest condition) {

        String name = condition.getName();
        JobSearchDto jobs = condition.getJobs();
        String category = condition.getCategory();
        int minLevel = condition.getMinLevel();

        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponse.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .where(
                        nameContains(name),
                        jobContain(jobs),
                        categoryEqual(Category.from(category)),
                        levelGoe(minLevel)
                )
                .fetch();
    }

    @Override
    public List<ItemResponse> findAllOrderById() {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponse.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .orderBy(item.id.asc())
                .fetch();
    }


    @Override
    public List<ItemResponse> paginationFindItems(
            final Pageable pageable
    ) {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponse.class,
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
    public List<ItemResponse> paginationFindItemsWithCondition(
        final ItemListServiceRequest condition,
        final Pageable pageable
    ) {
        return queryFactory
                .select(
                        Projections.fields(
                                ItemResponse.class,
                                item.id.as("itemId"),
                                item.name
                        )
                )
                .from(item)
                .where(
                        nameContains(condition.getName()),
                        jobContain(condition.getJobs()),
                        levelGoe(condition.getMinLevel()),
                        categoryEqual(Category.from(condition.getCategory()))
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

    private BooleanBuilder jobContain(JobSearchDto jobs) {

        if (jobs.isAll()) return null;

        BooleanBuilder builder = new BooleanBuilder();

        if (jobs.isWarrior()) {
            builder.or(item.availableJob.warrior.isTrue());
        }

        if (jobs.isBowman()) {
            builder.or(item.availableJob.bowman.isTrue());
        }

        if (jobs.isMagician()) {
            builder.or(item.availableJob.magician.isTrue());
        }

        if (jobs.isThief()) {
            builder.or(item.availableJob.thief.isTrue());
        }

        return builder;
    }

    private BooleanExpression categoryEqual(Category category) {
        return category == null ? null : item.category.eq(category);
    }

    private BooleanExpression levelGoe(int minLevel) {
        return item.requiredStatus.requiredLevel.goe(minLevel);
    }

    private Querydsl querydsl() {
        return Objects.requireNonNull(getQuerydsl());
    }
}
