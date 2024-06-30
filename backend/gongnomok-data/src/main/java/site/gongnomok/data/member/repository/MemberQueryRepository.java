package site.gongnomok.data.member.repository;

import site.gongnomok.data.member.Member;

import java.util.Optional;

public interface MemberQueryRepository {

    public Optional<Member> findMember(final String id, final String encryptedPassword);
}
