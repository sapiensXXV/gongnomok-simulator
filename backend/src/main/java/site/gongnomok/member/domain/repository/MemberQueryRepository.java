package site.gongnomok.member.domain.repository;

import site.gongnomok.member.domain.Member;

import java.util.Optional;

public interface MemberQueryRepository {

    public Optional<Member> findMember(final String id, final String encryptedPassword);
}
