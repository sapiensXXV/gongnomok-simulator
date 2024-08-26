package site.gongnomok.data.block.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.data.block.domain.BlockedIp;

public interface BlockedIpRepository extends JpaRepository<BlockedIp, Long> {
}
