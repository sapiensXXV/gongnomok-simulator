package site.gongnomok.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.global.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberQueryRepository {
}
