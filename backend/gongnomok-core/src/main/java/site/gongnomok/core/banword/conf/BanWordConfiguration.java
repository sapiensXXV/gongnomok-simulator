package site.gongnomok.core.banword.conf;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import site.gongnomok.core.banword.BanWordFilter;
import site.gongnomok.core.banword.BanWordStorage;
import site.gongnomok.core.banword.BruteForceBanWordFilter;
import site.gongnomok.core.banword.ListBanWordStorage;
import site.gongnomok.core.banword.provider.BanWordProvider;
import site.gongnomok.core.banword.provider.ListBanWordProvider;

@Configuration
public class BanWordConfiguration {

    @Bean
    public BanWordStorage banWordStorage() {
        return new ListBanWordStorage(banWordProvider());
    }

    @Bean
    public BanWordFilter banWordFilter() {
        return new BruteForceBanWordFilter(banWordStorage());
    }

    @Bean
    public BanWordProvider banWordProvider() {
        return new ListBanWordProvider();
    }
}
