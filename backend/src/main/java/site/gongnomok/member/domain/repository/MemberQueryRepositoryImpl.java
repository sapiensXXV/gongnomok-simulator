package site.gongnomok.member.domain.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import site.gongnomok.member.domain.Member;

import java.util.Optional;

import static site.gongnomok.member.domain.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepositoryImpl implements MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Member> findMember(final String id, final String encryptedPassword) {
        Member result = queryFactory
            .selectFrom(member)
            .where(idEqual(id), passwordEqual(encryptedPassword))
            .fetchOne();

        return Optional.ofNullable(result);
    }

    public BooleanExpression idEqual(final String id) {
        return member.id.eq(id);
    }

    public BooleanExpression passwordEqual(final String encryptedPassword) {
        return member.password.eq(encryptedPassword);
    }

}
