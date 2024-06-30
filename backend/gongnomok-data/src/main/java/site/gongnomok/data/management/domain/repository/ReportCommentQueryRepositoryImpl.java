package site.gongnomok.data.management.domain.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import site.gongnomok.common.management.dto.response.ReportCommentDto;

import java.util.List;

import static site.gongnomok.data.comment.domain.QComment.comment;
import static site.gongnomok.data.management.domain.QReportComment.reportComment;

@Repository
@RequiredArgsConstructor
public class ReportCommentQueryRepositoryImpl implements ReportCommentQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<ReportCommentDto> findReportListRecentDesc(Pageable pageable) {
        return queryFactory.select(
                Projections.fields(
                    ReportCommentDto.class,
                    reportComment.id.as("reportId"),
                    comment.id.as("commentId"),
                    comment.name,
                    comment.createdDate,
                    comment.content,
                    reportComment.count
                )
            )
            .from(reportComment)
            .innerJoin(reportComment.comment, comment)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(reportComment.id.desc())
            .fetch();
    }

    @Override
    public List<ReportCommentDto> findReportListCountDesc(Pageable pageable) {
        return queryFactory.select(
                Projections.fields(
                    ReportCommentDto.class,
                    reportComment.id.as("reportId"),
                    comment.id.as("commentId"),
                    comment.name,
                    comment.createdDate,
                    comment.content,
                    reportComment.count
                )
            )
            .from(reportComment)
            .innerJoin(reportComment.comment, comment)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(reportComment.count.desc())
            .fetch();
    }
}
