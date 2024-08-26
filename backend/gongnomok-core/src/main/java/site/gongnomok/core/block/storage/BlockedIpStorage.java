package site.gongnomok.core.block.storage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import site.gongnomok.core.block.infrastructure.BlockedIpProperties;
import site.gongnomok.data.block.domain.BlockedIp;
import site.gongnomok.data.block.domain.repository.BlockedIpRepository;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
@EnableConfigurationProperties(BlockedIpProperties.class)
@RequiredArgsConstructor
@Slf4j
public class BlockedIpStorage {
    
    private final BlockedIpRepository blockedIpRepository;
    
    private Set<String> blockedIp = new HashSet<>();
    
    @Scheduled(
        fixedDelayString = "${security.blocked-ip.schedule.polling}",
        timeUnit = TimeUnit.MINUTES)
    public void fetchBlockedIp() {
        //todo: 차단된 아이피 목록을 특정 시간마다 페치해온다.
        log.info("차단 IP 페치");
        
        List<String> blockedIpList = blockedIpRepository.findAll().stream()
            .map(BlockedIp::getIp)
            .toList();

        blockedIp = Set.copyOf(blockedIpList);
    }
    
    public Set<String> blockedIp() {
        return Collections.unmodifiableSet(blockedIp);
    }
    
    public boolean contains(String ip) {
        return blockedIp.contains(ip);
    }
}
