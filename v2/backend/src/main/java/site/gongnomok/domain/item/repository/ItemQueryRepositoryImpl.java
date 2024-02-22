package site.gongnomok.domain.item.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import site.gongnomok.domain.item.dto.api.ItemListPageDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.entity.QItem;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;

import java.util.List;
import java.util.Objects;

import static site.gongnomok.global.entity.QItem.item;


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
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(item.id.asc())
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

//    private BooleanExpression checkItemConditions(ItemListRequestServiceDto condition) {
//        if (condition == null) return null;
//        String conditionName = condition.getName();
//        Job conditionJob = condition.getJob();
//        Category conditionCategory = condition.getCategory();
//        int conditionMinLevel = condition.getMinLevel();
//
//        return nameContains(conditionName)
//
//    }

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
