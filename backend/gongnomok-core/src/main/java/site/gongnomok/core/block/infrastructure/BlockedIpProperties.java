package site.gongnomok.core.block.infrastructure;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.blocked-ip")
public record BlockedIpProperties(Schedule schedule) {
    public record Schedule(Long polling){
    }
}
