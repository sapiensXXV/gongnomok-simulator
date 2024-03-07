package site.gongnomok.domain.comment.repository;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.gongnomok.domain.comment.dto.CommentCreateDto;
import site.gongnomok.domain.comment.dto.CommentResponse;
import site.gongnomok.global.entity.Comment;
import site.gongnomok.global.entity.QComment;

import java.util.List;

import static site.gongnomok.global.entity.QComment.comment;

@Repository
@RequiredArgsConstructor
public class CommentQueryRepository {

    private final JPAQueryFactory queryFactory;

    public List<CommentResponse> paginationNoOffsetComment(
        final Long commentId,
        final Long itemId,
        final int pageSize
    ) {
        return queryFactory
            .select(
                Projections.fields(
                    CommentResponse.class,
                    comment.id,
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

    private BooleanExpression ltCommentId(Long commentId) {
        if (commentId == null) {
            return null;
        }
        return comment.id.lt(commentId);
    }

}
