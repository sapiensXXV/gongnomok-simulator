package site.gongnomok.global.locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
public class LocaleResolverConfiguration {

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver localeRessolver = new SessionLocaleResolver();
        localeRessolver.setDefaultLocale(Locale.KOREA);
        return localeRessolver;
    }
}
