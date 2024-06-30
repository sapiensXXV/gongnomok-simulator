package site.gongnomok.data.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.member.Member;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberQueryRepository {
}
