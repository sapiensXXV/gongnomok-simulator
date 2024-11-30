package site.gongnomok.api.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:80",
                        "http://localhost:8080",
                        "http://34.64.91.129",
                        "http://34.64.91.129:80",
                        "http://gongnomok.site",
                        "http://www.gongnomok.site",
                        "https://gongnomok.site",
                        "https://www.gongnomok.site",
                        "https://dev.gongnomok.site",
                        "https://gongnomok.com"
                )
                .allowCredentials(true)
                .maxAge(3000);
    }
}
