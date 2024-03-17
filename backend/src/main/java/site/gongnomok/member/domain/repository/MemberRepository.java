package site.gongnomok.member.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberQueryRepository {
}
