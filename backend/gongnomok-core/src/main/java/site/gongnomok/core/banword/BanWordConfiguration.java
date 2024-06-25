package site.gongnomok.core.banword;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BanWordConfiguration {

    @Bean
    public BanWordStorage banWordStorage() {
        return new ListBanWordStorage();
    }

    @Bean
    public BanWordFilter banWordFilter() {
        return new StringContainsBanWordFilter(banWordStorage());
    }
}
