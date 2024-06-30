package site.gongnomok.data.comment.domain.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import site.gongnomok.common.comment.dto.response.CommentDto;

import java.util.List;

import static site.gongnomok.data.comment.domain.QComment.comment;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CommentQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<CommentDto> paginationNoOffsetComment(
        final Long commentId,
        final Long itemId,
        final int pageSize
    ) {
        return queryFactory
            .select(
                Projections.fields(
                    CommentDto.class,
                    comment.id.as("commentId"),
                    comment.name,
                    comment.content,
                    comment.createdDate
                )
            )
            .from(comment)
            .where(
                ltCommentId(commentId),
                comment.item.id.eq(itemId)
            )
            .orderBy(comment.id.desc())
            .limit(pageSize)
            .fetch();
    }

    public Long commentCount(Long itemId) {
        return queryFactory
            .select(comment.count())
            .from(comment)
            .where(comment.item.id.eq(itemId))
            .fetchOne();
    }

    private BooleanExpression ltCommentId(Long commentId) {
        if (commentId == null) {
            return null;
        }
        return comment.id.lt(commentId);
    }

}
