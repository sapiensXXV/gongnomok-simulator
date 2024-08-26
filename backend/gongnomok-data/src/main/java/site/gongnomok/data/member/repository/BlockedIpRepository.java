package site.gongnomok.data.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.member.BlockedIp;

public interface BlockedIpRepository extends JpaRepository<BlockedIp, Long> {
}
