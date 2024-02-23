package site.gongnomok.domain.member.repository;

import site.gongnomok.global.entity.Member;

import java.util.Optional;

public interface MemberQueryRepository {

    public Optional<Member> findMember(final String id, final String encryptedPassword);
}
