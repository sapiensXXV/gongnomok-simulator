package site.gongnomok.domain.item.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;

import java.util.List;

import static site.gongnomok.global.entity.QItem.item;


@Repository
@RequiredArgsConstructor
public class ItemQueryRepositoryImpl implements ItemQueryRepository {

    private final JPAQueryFactory queryFactory;

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
                        jobEqual(job),
                        categoryEqual(category),
                        levelGoe(minLevel)
                )
                .fetch();
    }

    public BooleanExpression nameContains(String name) {
        if (name.equals("")) {
            return Expressions.asBoolean(true).isTrue();
        }

        return item.name.contains(name);
    }

    public BooleanExpression jobEqual(Job job) {
        return item.requiredJob.eq(job);
    }

    public BooleanExpression categoryEqual(Category category) {
        return item.category.eq(category);
    }

    public BooleanExpression levelGoe(int minLevel) {
        return item.requiredLevel.goe(minLevel);
    }
}
